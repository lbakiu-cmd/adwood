import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getConsultations, saveConsultation } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../client/dist');

const PORT = process.env.PORT || 5000;

// MIME type map for serving static production assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webp': 'image/webp'
};

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // Health check endpoint
  if (req.method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'ADWOOD Realization API',
      environment: fs.existsSync(DIST_DIR) ? 'production' : 'development'
    }));
    return;
  }

  // GET /api/consultations
  if (req.method === 'GET' && url.pathname === '/api/consultations') {
    try {
      const records = await getConsultations();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        count: records.length,
        data: records
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Failed to retrieve consultations', error: err.message }));
    }
    return;
  }

  // POST /api/consultations
  if (req.method === 'POST' && url.pathname === '/api/consultations') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { fullName, email, phone, projectType, budgetRange, timeline, location, notes } = payload;

        // Validation
        if (!fullName || !fullName.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Full name is required.' }));
          return;
        }

        if (!email || !email.trim() || !email.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'A valid email address is required.' }));
          return;
        }

        if (!projectType) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Please select a project type.' }));
          return;
        }

        const newRecord = await saveConsultation({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : '',
          projectType,
          budgetRange: budgetRange || '€250k - €500k',
          timeline: timeline || 'Immediate (1-3 mos)',
          location: location ? location.trim() : 'Unspecified',
          notes: notes ? notes.trim() : ''
        });

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Design consultation request successfully received. Our principal architect will contact you within 24 hours.',
          data: newRecord
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload or server error', error: err.message }));
      }
    });
    return;
  }

  // -------------------------------------------------------------
  // STATIC PRODUCTION ASSET SERVING (client/dist)
  // -------------------------------------------------------------
  if (req.method === 'GET' && fs.existsSync(DIST_DIR)) {
    let safePath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
    if (safePath === '/' || safePath === '\\') safePath = '/index.html';

    let filePath = path.join(DIST_DIR, safePath);

    // Fallback to index.html for Single-Page Application (SPA) routing
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
      });

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
      return;
    }
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`[ADWOOD Server] High-End Realization API listening on http://localhost:${PORT}`);
});
