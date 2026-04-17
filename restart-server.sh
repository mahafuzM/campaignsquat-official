#!/bin/bash

# Configuration
USER="u263673950"
HOST="212.85.30.245"
PORT="65002"
BACKEND_DIR="/home/u263673950/domains/campaignsquat.com/nodejs/server"

echo "🔄 Connecting to server to restart Node..."

ssh -p $PORT -o StrictHostKeyChecking=no $USER@$HOST << 'ENDSSH'
  export PATH=$HOME/node-v20.12.2-linux-x64/bin:$PATH

  # ১. লিগ্যাসি প্রসেস ক্লিন করা (LiteSpeed node processes)
  echo "🧹 Cleaning up existing node processes..."
  pkill -u u263673950 node || echo "No active processes found."

  if [ -d "/home/u263673950/domains/campaignsquat.com/nodejs/server" ]; then
    cd /home/u263673950/domains/campaignsquat.com/nodejs/server
    
    # ২. এনভায়রনমেন্ট চেক ও ডিপেন্ডেন্সি ইনস্টল
    if [ ! -f ".env" ]; then
       echo "⚠️  .env missing in nodejs/server!"
       # Backup copy if exists in old path
       cp /home/u263673950/domains/campaignsquat.com/public_html/server/.env . || echo "Failed to copy .env"
    fi
    
    npm install --production --silent
    
    # ৩. PM2 দিয়ে রিভার্ট/রিস্টার্ট করা
    PM2_HOME=$HOME/.pm2 pm2 delete campaignsquat 2>/dev/null
    PM2_HOME=$HOME/.pm2 pm2 start index.js --name "campaignsquat"
    PM2_HOME=$HOME/.pm2 pm2 save
    
    echo "✅ Backend updated and LiteSpeed signal sent!"
  else
    echo "❌ Error: nodejs/server directory not found!"
  fi

  sleep 1
  PM2_HOME=$HOME/.pm2 pm2 list
ENDSSH

echo "✅ Restart Sequence Complete!"
