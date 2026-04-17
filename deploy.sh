#!/bin/bash

echo "🚀 Starting Deployment to Hostinger..."

# Server details
USER="u263673950"
HOST="212.85.30.245"
PORT="65002"
REMOTE_DIR="/home/u263673950/domains/campaignsquat.com/public_html"
NVM_PATH="\$HOME/.nvm/nvm.sh"
NODE_PATH="\$HOME/node-v20.12.2-linux-x64/bin"

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

# 2. Upload Frontend (dist folder) - preserve server-side files
echo "🌐 Uploading Frontend Files..."
rsync -az -e "ssh -p $PORT -o StrictHostKeyChecking=no" \
  --exclude '.htaccess' \
  --exclude 'proxy.php' \
  --exclude 'uploads' \
  --exclude 'server' \
  dist/ $USER@$HOST:$REMOTE_DIR/

# 3. Upload Backend (server folder) - exclude uploads to preserve images
echo "⚙️ Uploading Backend Files..."
rsync -az -e "ssh -p $PORT -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.env' \
  --exclude 'uploads' \
  server/ $USER@$HOST:$REMOTE_DIR/server/

# 4. Install dependencies & restart server via PM2
echo "🔄 Restarting Backend Server..."
ssh -p $PORT -o StrictHostKeyChecking=no $USER@$HOST << 'ENDSSH'
  export PATH=$HOME/node-v20.12.2-linux-x64/bin:$PATH
  cd /home/u263673950/domains/campaignsquat.com/public_html/server
  npm install --production --silent
  if PM2_HOME=$HOME/.pm2 pm2 list | grep -q "campaignsquat"; then
    PM2_HOME=$HOME/.pm2 pm2 restart campaignsquat
    echo "🔄 PM2 process restarted."
  else
    PM2_HOME=$HOME/.pm2 pm2 start index.js --name "campaignsquat"
    PM2_HOME=$HOME/.pm2 pm2 save
    echo "🆕 PM2 process started fresh."
  fi
ENDSSH

echo ""
echo "✅ ============================="
echo "✅  Deployment Successful! 🎉"
echo "✅  Live at: https://campaignsquat.com"
echo "✅ ============================="
