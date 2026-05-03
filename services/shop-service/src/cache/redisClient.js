const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`;
const client = createClient({ url: redisUrl });

let ready = false;
let lastError = null;
let connecting = null;

client.on('error', (err) => {
  ready = false;
  lastError = err;
});

client.on('ready', () => {
  ready = true;
  lastError = null;
});

async function connectRedis() {
  if (ready && client.isOpen) return true;
  if (connecting) return connecting;

  connecting = (async () => {
    try {
      if (!client.isOpen) {
        await client.connect();
      }
      ready = true;
      lastError = null;
      return true;
    } catch (err) {
      ready = false;
      lastError = err;
      return false;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}

async function getJson(key) {
  if (!(await connectRedis())) return null;

  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    lastError = err;
    return null;
  }
}

async function setJson(key, value, ttlSeconds = 60) {
  if (!(await connectRedis())) return false;

  try {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
    return true;
  } catch (err) {
    lastError = err;
    return false;
  }
}

async function deleteKey(key) {
  if (!(await connectRedis())) return false;

  try {
    await client.del(key);
    return true;
  } catch (err) {
    lastError = err;
    return false;
  }
}

async function pingRedis() {
  if (!(await connectRedis())) return false;

  try {
    await client.ping();
    return true;
  } catch (err) {
    lastError = err;
    return false;
  }
}

function getRedisStatus() {
  return {
    ready,
    error: lastError ? lastError.message : null
  };
}

module.exports = {
  deleteKey,
  getJson,
  getRedisStatus,
  pingRedis,
  setJson
};
