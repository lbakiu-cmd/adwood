import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'consultations.json');

// Ensure data directory and file exist
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing consultations DB:', err);
  }
}

export async function getConsultations() {
  await initDb();
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading consultations:', error);
    return [];
  }
}

export async function saveConsultation(consultation) {
  await initDb();
  const consultations = await getConsultations();
  const newEntry = {
    id: 'ADV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'received',
    ...consultation
  };
  consultations.unshift(newEntry);
  await fs.writeFile(DB_FILE, JSON.stringify(consultations, null, 2), 'utf-8');
  return newEntry;
}
