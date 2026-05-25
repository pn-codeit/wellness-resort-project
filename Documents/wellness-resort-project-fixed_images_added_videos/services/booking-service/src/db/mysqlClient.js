const mysql = require('mysql2/promise');
const {
  seedDurations,
  seedExtras,
  seedRooms,
  seedTreatments
} = require('../data/options');

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
    CREATE TABLE IF NOT EXISTS booking_durations (
      id VARCHAR(40) PRIMARY KEY,
      label_de VARCHAR(160) NOT NULL,
      label_en VARCHAR(160) NOT NULL,
      nights INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_treatments (
      id VARCHAR(40) PRIMARY KEY,
      label_de VARCHAR(160) NOT NULL,
      label_en VARCHAR(160) NOT NULL,
      desc_de TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_rooms (
      id VARCHAR(40) PRIMARY KEY,
      label_de VARCHAR(160) NOT NULL,
      label_en VARCHAR(160) NOT NULL,
      desc_de TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      price_per_night DECIMAL(10,2) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_extras (
      id VARCHAR(40) PRIMARY KEY,
      label_de VARCHAR(160) NOT NULL,
      label_en VARCHAR(160) NOT NULL,
      desc_de TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      price_per_night DECIMAL(10,2) NOT NULL DEFAULT 0,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      reference VARCHAR(40) NOT NULL UNIQUE,
      customer_name VARCHAR(160) NOT NULL,
      customer_email VARCHAR(180) NOT NULL,
      customer_phone VARCHAR(80) NOT NULL,
      customer_address VARCHAR(255) NOT NULL,
      customer_city VARCHAR(120) NOT NULL,
      arrival_date DATE NOT NULL,
      lang VARCHAR(5) NOT NULL DEFAULT 'de',
      status VARCHAR(32) NOT NULL DEFAULT 'received',
      duration_id VARCHAR(40) NOT NULL,
      duration_label VARCHAR(160) NOT NULL,
      nights INT NOT NULL,
      room_id VARCHAR(40) NOT NULL,
      room_label VARCHAR(160) NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (duration_id) REFERENCES booking_durations(id),
      FOREIGN KEY (room_id) REFERENCES booking_rooms(id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_line_items (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      booking_id BIGINT NOT NULL,
      item_type VARCHAR(32) NOT NULL,
      item_id VARCHAR(40) NOT NULL,
      item_label VARCHAR(160) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      unit_price DECIMAL(10,2) NOT NULL,
      line_total DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )
  `);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function availabilityWindow() {
  const today = new Date();
  const start = addDays(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())), 1);
  const days = Number(process.env.BOOKING_AVAILABILITY_DAYS || 180);
  const end = addDays(start, Math.max(30, days) - 1);

  return {
    startDate: dateKey(start),
    endDate: dateKey(end),
    start,
    end
  };
}

async function seedOptions() {
  await pool.query(
    `
      INSERT INTO booking_durations (id, label_de, label_en, nights, price, active)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        label_de = VALUES(label_de),
        label_en = VALUES(label_en),
        nights = VALUES(nights),
        price = VALUES(price),
        active = VALUES(active)
    `,
    [seedDurations.map((item) => [item.id, item.label_de, item.label_en, item.nights, item.price, true])]
  );

  await pool.query(
    `
      INSERT INTO booking_treatments (id, label_de, label_en, desc_de, desc_en, price, active)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        label_de = VALUES(label_de),
        label_en = VALUES(label_en),
        desc_de = VALUES(desc_de),
        desc_en = VALUES(desc_en),
        price = VALUES(price),
        active = VALUES(active)
    `,
    [seedTreatments.map((item) => [
      item.id,
      item.label_de,
      item.label_en,
      item.desc_de,
      item.desc_en,
      item.price,
      true
    ])]
  );

  await pool.query(
    `
      INSERT INTO booking_rooms (id, label_de, label_en, desc_de, desc_en, price_per_night, active)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        label_de = VALUES(label_de),
        label_en = VALUES(label_en),
        desc_de = VALUES(desc_de),
        desc_en = VALUES(desc_en),
        price_per_night = VALUES(price_per_night),
        active = VALUES(active)
    `,
    [seedRooms.map((item) => [
      item.id,
      item.label_de,
      item.label_en,
      item.desc_de,
      item.desc_en,
      item.price_per_night,
      true
    ])]
  );

  await pool.query(
    `
      INSERT INTO booking_extras (id, label_de, label_en, desc_de, desc_en, price, price_per_night, active)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        label_de = VALUES(label_de),
        label_en = VALUES(label_en),
        desc_de = VALUES(desc_de),
        desc_en = VALUES(desc_en),
        price = VALUES(price),
        price_per_night = VALUES(price_per_night),
        active = VALUES(active)
    `,
    [seedExtras.map((item) => [
      item.id,
      item.label_de,
      item.label_en,
      item.desc_de,
      item.desc_en,
      item.price,
      item.price_per_night,
      true
    ])]
  );
}

async function ensureDatabase() {
  if (ready) return true;
  if (initializing) return initializing;

  initializing = (async () => {
    try {
      await createSchema();
      await seedOptions();
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

async function getOptions() {
  await ensureDatabase();

  const [durations] = await pool.query(`
    SELECT id, label_de, label_en, nights, price
    FROM booking_durations
    WHERE active = TRUE
    ORDER BY FIELD(id, 'weekend', 'midweek', 'week', 'twoweeks'), id
  `);

  const [treatments] = await pool.query(`
    SELECT id, label_de, label_en, desc_de, desc_en, price
    FROM booking_treatments
    WHERE active = TRUE
    ORDER BY FIELD(id, 'massage', 'ayurveda', 'fango', 'yoga', 'sauna', 'kneipp'), id
  `);

  const [rooms] = await pool.query(`
    SELECT id, label_de, label_en, desc_de, desc_en, price_per_night
    FROM booking_rooms
    WHERE active = TRUE
    ORDER BY FIELD(id, 'standard', 'superior', 'penthouse'), id
  `);

  const [extras] = await pool.query(`
    SELECT id, label_de, label_en, desc_de, desc_en, price, price_per_night
    FROM booking_extras
    WHERE active = TRUE
    ORDER BY FIELD(id, 'breakfast', 'dinner', 'transfer', 'flowers', 'wine', 'hiking'), id
  `);

  return {
    durations: durations.map(normalizeMoney),
    treatments: treatments.map(normalizeMoney),
    rooms: rooms.map(normalizeMoney),
    extras: extras.map(normalizeMoney)
  };
}

async function getAvailability() {
  await ensureDatabase();

  const window = availabilityWindow();
  const capacity = Number(process.env.BOOKING_DAILY_ARRIVAL_CAPACITY || 8);
  const [rows] = await pool.query(
    `
      SELECT arrival_date, COUNT(*) AS booking_count
      FROM bookings
      WHERE status <> 'cancelled'
        AND arrival_date BETWEEN ? AND ?
      GROUP BY arrival_date
    `,
    [window.startDate, window.endDate]
  );

  const countByDate = new Map(rows.map((row) => [
    dateKey(new Date(row.arrival_date)),
    Number(row.booking_count)
  ]));

  const availableDates = [];
  const unavailableDates = [];

  for (let cursor = new Date(window.start); cursor <= window.end; cursor = addDays(cursor, 1)) {
    const key = dateKey(cursor);
    const weekday = cursor.getUTCDay();
    const isClosedArrivalDay = weekday === 1;
    const isFull = (countByDate.get(key) || 0) >= capacity;

    if (isClosedArrivalDay || isFull) {
      unavailableDates.push(key);
    } else {
      availableDates.push(key);
    }
  }

  return {
    minArrivalDate: window.startDate,
    maxArrivalDate: window.endDate,
    availableDates,
    unavailableDates,
    closedWeekdays: [1],
    capacityPerArrivalDate: capacity
  };
}

function normalizeMoney(row) {
  return {
    ...row,
    price: row.price === undefined ? undefined : Number(row.price),
    price_per_night: row.price_per_night === undefined ? undefined : Number(row.price_per_night)
  };
}

function byId(rows) {
  return new Map(rows.map((row) => [row.id, row]));
}

async function createBooking({ customer, selection, lang }) {
  await ensureDatabase();

  const availability = await getAvailability();
  if (
    selection.arrive < availability.minArrivalDate ||
    selection.arrive > availability.maxArrivalDate ||
    availability.unavailableDates.includes(selection.arrive)
  ) {
    throw Object.assign(new Error('The selected arrival date is not available.'), { statusCode: 400 });
  }

  const options = await getOptions();
  const duration = byId(options.durations).get(selection.durationId);
  const room = byId(options.rooms).get(selection.roomId);
  const treatmentsById = byId(options.treatments);
  const extrasById = byId(options.extras);

  if (!duration) {
    throw Object.assign(new Error(`Unknown duration id ${selection.durationId}`), { statusCode: 400 });
  }

  if (!room) {
    throw Object.assign(new Error(`Unknown room id ${selection.roomId}`), { statusCode: 400 });
  }

  const lines = [];
  const durationLabel = lang === 'en' ? duration.label_en : duration.label_de;
  const roomLabel = lang === 'en' ? room.label_en : room.label_de;

  lines.push({
    type: 'duration',
    itemId: duration.id,
    label: durationLabel,
    quantity: 1,
    unitPrice: duration.price,
    lineTotal: duration.price
  });

  if (room.price_per_night > 0) {
    lines.push({
      type: 'room',
      itemId: room.id,
      label: roomLabel,
      quantity: duration.nights,
      unitPrice: room.price_per_night,
      lineTotal: Number((room.price_per_night * duration.nights).toFixed(2))
    });
  }

  for (const id of selection.treatmentIds) {
    const treatment = treatmentsById.get(id);
    if (!treatment) {
      throw Object.assign(new Error(`Unknown treatment id ${id}`), { statusCode: 400 });
    }

    const label = lang === 'en' ? treatment.label_en : treatment.label_de;
    lines.push({
      type: 'treatment',
      itemId: treatment.id,
      label,
      quantity: 1,
      unitPrice: treatment.price,
      lineTotal: treatment.price
    });
  }

  for (const id of selection.extraIds) {
    const extra = extrasById.get(id);
    if (!extra) {
      throw Object.assign(new Error(`Unknown extra id ${id}`), { statusCode: 400 });
    }

    const unitPrice = extra.price_per_night > 0 ? extra.price_per_night : extra.price;
    const quantity = extra.price_per_night > 0 ? duration.nights : 1;
    const label = lang === 'en' ? extra.label_en : extra.label_de;

    lines.push({
      type: 'extra',
      itemId: extra.id,
      label,
      quantity,
      unitPrice,
      lineTotal: Number((unitPrice * quantity).toFixed(2))
    });
  }

  const total = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
  const reference = `BK-${Date.now().toString(36).toUpperCase()}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const [bookingResult] = await connection.query(
      `
        INSERT INTO bookings (
          reference, customer_name, customer_email, customer_phone, customer_address, customer_city,
          arrival_date, lang, duration_id, duration_label, nights, room_id, room_label, total_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        reference,
        customer.name,
        customer.email,
        customer.phone,
        customer.address,
        customer.city,
        selection.arrive,
        lang,
        duration.id,
        durationLabel,
        duration.nights,
        room.id,
        roomLabel,
        total
      ]
    );

    await connection.query(
      `
        INSERT INTO booking_line_items (
          booking_id, item_type, item_id, item_label, quantity, unit_price, line_total
        ) VALUES ?
      `,
      [lines.map((line) => [
        bookingResult.insertId,
        line.type,
        line.itemId,
        line.label,
        line.quantity,
        line.unitPrice,
        line.lineTotal
      ])]
    );

    await connection.commit();
    return {
      reference,
      status: 'received',
      total,
      nights: duration.nights,
      arrivalDate: selection.arrive,
      items: lines
    };
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
  createBooking,
  ensureDatabase,
  getAvailability,
  getDatabaseStatus,
  getOptions,
  pingDatabase
};
