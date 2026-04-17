#!/bin/bash

echo "🚀 Starting Deployment to Hostinger..."

# Server details
USER="u263673950"
HOST="212.85.30.245"
PORT="65002"

# Destination directories on server
FRONTEND_DIR="/home/u263673950/domains/campaignsquat.com/public_html"
BACKEND_DIR="/home/u263673950/domains/campaignsquat.com/nodejs/server"

# 1. Build the frontend
echo "📦 Building Frontend (React)..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed! Aborting deploy."
    exit 1
fi
echo "✅ Frontend built successfully."

# 2. Upload Frontend (dist/* to public_html/)
echo "🌐 Uploading Frontend Files to public_html..."
rsync -azP -e "ssh -p $PORT -o StrictHostKeyChecking=no" \
  --exclude '.htaccess' \
  --exclude 'uploads' \
  --exclude 'nodejs' \
  dist/ $USER@$HOST:$FRONTEND_DIR/

# 3. Upload Backend (server/* to nodejs/server/)
echo "⚙️ Uploading Backend Files to nodejs/server..."
rsync -azP -e "ssh -p $PORT -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude 'uploads' \
  server/ $USER@$HOST:$BACKEND_DIR/

# 4. Success message & calling restart script
echo ""
echo "✅ ============================="
echo "✅  Files Uploaded Successfully!"
echo "🔄  Triggering Server Restart..."
echo "✅ ============================="

./restart-server.sh

