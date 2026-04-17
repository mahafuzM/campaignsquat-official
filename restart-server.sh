#!/bin/bash

USER="u263673950"
HOST="212.85.30.245"
PORT="65002"
REMOTE_DIR="/home/u263673950/domains/campaignsquat.com/nodejs/server"

echo "🔄 Connecting to server..."

ssh -p $PORT -o StrictHostKeyChecking=no $USER@$HOST << 'ENDSSH'
  export PATH=$HOME/node-v20.12.2-linux-x64/bin:$PATH

  # ১. লিগ্যাসি প্রসেস ক্লিন করা (LiteSpeed node processes)
  echo "🧹 Cleaning up existing node processes..."
  pkill -u u263673950 node || echo "No processes running"

  if [ -d "/home/u263673950/domains/campaignsquat.com/nodejs/server" ]; then
    cd /home/u263673950/domains/campaignsquat.com/nodejs/server
    
    # ২. এনভায়রনমেন্ট চেক ও ডিপেন্ডেন্সি ইনস্টল
    if [ ! -f ".env" ]; then
       echo "⚠️  .env missing in nodejs/server, copying from public_html if exists..."
       cp /home/u263673950/domains/campaignsquat.com/public_html/server/.env . || echo "Failed to copy .env"
    fi
    
    npm install --production --silent
    
    # ৩. PM2 দিয়েও ব্যাকআপ হিসেবে শুরু করা (যদি Hostinger সাপোর্ট করে)
    if PM2_HOME=$HOME/.pm2 pm2 list | grep -q "campaignsquat"; then
      PM2_HOME=$HOME/.pm2 pm2 restart campaignsquat
    else
      PM2_HOME=$HOME/.pm2 pm2 start index.js --name "campaignsquat"
    fi
    
    echo "✅ Server updated and restart signal sent!"
  else
    echo "❌ Error: nodejs/server directory not found!"
  fi

  sleep 2
  PM2_HOME=$HOME/.pm2 pm2 list
ENDSSH
