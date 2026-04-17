#!/bin/bash

USER="u263673950"
HOST="212.85.30.245"
PORT="65002"
REMOTE_DIR="/home/u263673950/domains/campaignsquat.com/public_html/server"

echo "🔄 Connecting to server..."

ssh -p $PORT -o StrictHostKeyChecking=no $USER@$HOST << 'ENDSSH'
  export PATH=$HOME/node-v20.12.2-linux-x64/bin:$PATH

  if PM2_HOME=$HOME/.pm2 pm2 list | grep -q "campaignsquat"; then
    PM2_HOME=$HOME/.pm2 pm2 restart campaignsquat
    echo "✅ Server restarted successfully!"
  else
    cd /home/u263673950/domains/campaignsquat.com/public_html/server
    npm install --production --silent
    PM2_HOME=$HOME/.pm2 pm2 start index.js --name "campaignsquat"
    PM2_HOME=$HOME/.pm2 pm2 save
    echo "🆕 Server started fresh!"
  fi

  sleep 2
  PM2_HOME=$HOME/.pm2 pm2 list
ENDSSH
