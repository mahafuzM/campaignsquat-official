# Campaignsquat Official - Production Guide & Documentation

This repository contains the complete source code for the **Campaignsquat** official website, including the React/Vite frontend and Node.js backend.

---

## 🛠 Problem Statement & Fixes (Stability Audit)

Before the recent audit, the application faced several critical issues that affected production stability:

### 1. API Inconsistency & UI Crashes
- **Problem:** Components were assuming API responses would always be raw arrays (`[]`). When the backend returned objects (`{success, data: []}`) or empty states, the UI crashed with `TypeError: .filter is not a function`.
- **Fix:** Implemented a global `safeArray` helper and defensive `Array.isArray()` guards in all key components (Projects, Blogs, Industries, Brands, etc.).

### 2. Image Serving & Hostinger CDN Block
- **Problem:** Images uploaded to `server/uploads` were blocked by Hostinger's LiteSpeed CDN/Security layers, resulting in 403 or 404 errors.
- **Fix:** Moved the `uploadDir` to the root `public_html/uploads` folder. The backend now saves images directly to the public web root, allowing them to be served efficiently via the CDN.

### 3. Server Reliability (PM2)
- **Problem:** The backend process would occasionally stop, and tracking its state manually via SSH was tedious.
- **Fix:** Configured PM2 with the name `campaignsquat`. Created a monitoring and auto-restart logic that ensures the server is always online.

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

**Developed & Stabilized by:** Antigravity AI
**Live Website:** [https://campaignsquat.com](https://campaignsquat.com)
