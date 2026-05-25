const mysql = require('mysql2/promise');
const { seedProducts } = require('../data/catalog');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'wellness',
  password: process.env.MYSQL_PASSWORD || 'wellness',
  database: process.env.MYSQL_DATABASE || 'wellness_resort',
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
  charset: 'utf8mb4'
});

let ready = false;
let lastError = null;
let initializing = null;

async function createSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS shop_products (
      id INT PRIMARY KEY,
      name_de VARCHAR(160) NOT NULL,
      name_en VARCHAR(160) NOT NULL,
      cat_de VARCHAR(80) NOT NULL,
      cat_en VARCHAR(80) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      desc_de TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      color VARCHAR(24) NOT NULL,
      object_name VARCHAR(255) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS shop_orders (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      reference VARCHAR(40) NOT NULL UNIQUE,
      customer_name VARCHAR(160) NOT NULL,
      customer_email VARCHAR(180) NOT NULL,
      customer_address VARCHAR(255) NOT NULL,
      customer_city VARCHAR(120) NOT NULL,
      lang VARCHAR(5) NOT NULL DEFAULT 'de',
      status VARCHAR(32) NOT NULL DEFAULT 'received',
      total_amount DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS shop_order_items (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      order_id BIGINT NOT NULL,
      product_id INT NOT NULL,
      product_name VARCHAR(160) NOT NULL,
      quantity INT NOT NULL,
      unit_price DECIMAL(10,2) NOT NULL,
      line_total DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES shop_orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES shop_products(id)
    )
  `);
}

async function seedCatalog() {
  const sql = `
    INSERT INTO shop_products (
      id, name_de, name_en, cat_de, cat_en, price, desc_de, desc_en, color, object_name, active
    ) VALUES ?
    ON DUPLICATE KEY UPDATE
      name_de = VALUES(name_de),
      name_en = VALUES(name_en),
      cat_de = VALUES(cat_de),
      cat_en = VALUES(cat_en),
      price = VALUES(price),
      desc_de = VALUES(desc_de),
      desc_en = VALUES(desc_en),
      color = VALUES(color),
      object_name = VALUES(object_name),
      active = VALUES(active)
  `;

  const values = seedProducts.map((product) => [
    product.id,
    product.name_de,
    product.name_en,
    product.cat_de,
    product.cat_en,
    product.price,
    product.desc_de,
    product.desc_en,
    product.color,
    product.object_name,
    true
  ]);

  await pool.query(sql, [values]);
}

async function ensureDatabase() {
  if (ready) return true;
  if (initializing) return initializing;

  initializing = (async () => {
    try {
      await createSchema();
      await seedCatalog();
      ready = true;
      lastError = null;
      return true;
    } catch (err) {
      ready = false;
      lastError = err;
      return false;
    } finally {
      initializing = null;
    }
  })();

  return initializing;
}

async function getProducts() {
  await ensureDatabase();
  const [rows] = await pool.query(`
    SELECT id, name_de, name_en, cat_de, cat_en, price, desc_de, desc_en, color, object_name
    FROM shop_products
    WHERE active = TRUE
    ORDER BY id ASC
  `);

  return rows.map((row) => ({
    ...row,
    price: Number(row.price)
  }));
}

async function createOrder({ customer, lang, items }) {
  await ensureDatabase();

  const ids = items.map((item) => Number(item.id));
  const [products] = await pool.query(
    `SELECT id, name_de, name_en, price FROM shop_products WHERE active = TRUE AND id IN (?)`,
    [ids]
  );

  const productById = new Map(products.map((product) => [Number(product.id), product]));
  const lines = items.map((item) => {
    const product = productById.get(Number(item.id));
    if (!product) {
      throw Object.assign(new Error(`Unknown product id ${item.id}`), { statusCode: 400 });
    }

    const quantity = Math.max(1, Math.min(99, Number(item.qty || item.quantity || 1)));
    const unitPrice = Number(product.price);
    const lineTotal = Number((quantity * unitPrice).toFixed(2));

    return {
      productId: Number(product.id),
      productName: lang === 'en' ? product.name_en : product.name_de,
      quantity,
      unitPrice,
      lineTotal
    };
  });

  const total = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
  const reference = `OR-${Date.now().toString(36).toUpperCase()}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const [orderResult] = await connection.query(
      `
        INSERT INTO shop_orders (
          reference, customer_name, customer_email, customer_address, customer_city, lang, total_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [reference, customer.name, customer.email, customer.address, customer.city, lang, total]
    );

    const orderId = orderResult.insertId;
    await connection.query(
      `
        INSERT INTO shop_order_items (
          order_id, product_id, product_name, quantity, unit_price, line_total
        ) VALUES ?
      `,
      [lines.map((line) => [
        orderId,
        line.productId,
        line.productName,
        line.quantity,
        line.unitPrice,
        line.lineTotal
      ])]
    );

    await connection.commit();
    return { reference, total, status: 'received', items: lines };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function pingDatabase() {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (err) {
    lastError = err;
    return false;
  }
}

function getDatabaseStatus() {
  return {
    ready,
    error: lastError ? lastError.message : null
  };
}

module.exports = {
  createOrder,
  ensureDatabase,
  getDatabaseStatus,
  getProducts,
  pingDatabase
};
