# Campaignsquat Official - Production Guide & Documentation

This repository contains the complete source code for the **Campaignsquat** official website, including the React/Vite frontend and Node.js backend.

---

## 🚀 Automated Workflows

We have implemented two main scripts to simplify management from your local VS Code terminal.

### 1. Full Deployment
Run this when you make changes to the code (Frontend or Backend).
```bash
./deploy.sh
```
**What it does:**
- Builds the React frontend (`npm run build`).
- Syncs the production files (`dist/`) to the server.
- Syncs the backend files (`server/`) while protecting existing uploads.
- Restarts the PM2 process on the server.

### 2. Quick Server Restart
Run this if the website says "Server Error" or if the API is not responding.
```bash
./restart-server.sh
```
**What it does:**
- Quickly connects to the server.
- Restarts the `campaignsquat` process.
- Starts it fresh if it was accidentally deleted from PM2.
- Shows you the status (Uptime, Memory) in your terminal.

---

## 🔑 Security & Configuration Changes

### Updating SSH Information
If you ever change your Hostinger password or SSH configuration, you need to update the top section of these files:
- `deploy.sh`
- `restart-server.sh`

**Lines to change:**
```bash
USER="u263673950"
HOST="212.85.30.245"
PORT="65002"
REMOTE_DIR="/home/u263673950/domains/campaignsquat.com/public_html"
```

### Environment Variables
The backend configuration is stored in `server/.env`.
> [!IMPORTANT]
> Never share your `.env` file or SSH keys in public forums. Ensure your local `.env` matches the server's database credentials.

---

## 📁 Repository Structure
- `src/`: Frontend React components and logic.
- `server/`: Node.js/Express backend.
- `dist/`: Compiled production files (synced to server root).
- `public/`: Static assets (favicon, logos).
- `deploy.sh`: Primary deployment script.
- `restart-server.sh`: Emergency restart script.

---

**Live Website:** [https://campaignsquat.com](https://campaignsquat.com)
