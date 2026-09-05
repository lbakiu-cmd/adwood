#!/bin/bash
# ==============================================================================
# ADWOOD Interior Architecture & Realization - Automated Deployment Script
# Target: Hostinger VPS (Ubuntu 22.04 / 24.04 LTS or Debian 11/12)
# ==============================================================================

set -e

APP_DIR="/var/www/adwood"
APP_PORT=5000
NODE_VERSION=20

echo ">>> [1/6] Updating system packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git ufw nginx rsync

echo ">>> [2/6] Installing Node.js v${NODE_VERSION} & PM2..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
fi

npm install -g pm2

echo ">>> Node version: $(node -v)"
echo ">>> NPM version: $(npm -v)"

echo ">>> [3/6] Setting up application directory at ${APP_DIR}..."
mkdir -p ${APP_DIR}
mkdir -p ${APP_DIR}/server/data

# Ensure proper permissions
chown -R www-data:www-data ${APP_DIR} 2>/dev/null || true

echo ">>> [4/6] Configuring PM2 process manager..."
cd ${APP_DIR}
pm2 delete adwood 2>/dev/null || true
pm2 start server/server.js --name "adwood" -i 1 --time
pm2 startup systemd -u root --hp /root || true
pm2 save

echo ">>> [5/6] Configuring Nginx Reverse Proxy..."
cat << 'EOF' > /etc/nginx/sites-available/adwood
server {
    listen 80;
    listen [::]:80;
    server_name _;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;
    gzip_disable "MSIE [1-6]\.";

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/adwood /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo ">>> [6/6] Configuring Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "=============================================================================="
echo " ADWOOD Realization Platform successfully deployed and running on port ${APP_PORT}!"
echo " Check status with: pm2 status"
echo " View logs with:    pm2 logs adwood"
echo "=============================================================================="
