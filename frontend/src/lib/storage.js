/**
 * Skardu Spring — Local JSON File Persistence
 * Stores orders, contacts, and newsletter subs in /data/*.json
 * Used by Next.js API routes as a lightweight DB alternative.
 */

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Ensures the /data directory exists.
 */
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Read a JSON file from /data. Returns an empty array if file doesn't exist.
 * @param {string} filename - e.g. 'orders.json'
 * @returns {Promise<Array>}
 */
export async function readData(filename) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Write an array of records to a JSON file in /data.
 * @param {string} filename
 * @param {Array} data
 */
export async function writeData(filename, data) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Append a single record to a JSON file in /data.
 * @param {string} filename
 * @param {object} record
 * @returns {Promise<object>} the appended record
 */
export async function appendData(filename, record) {
  const data = await readData(filename);
  data.push(record);
  await writeData(filename, data);
  return record;
}
