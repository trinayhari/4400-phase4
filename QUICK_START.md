# Quick Start Guide

## Step 1: Set Up Database

You need to run the database setup script. Choose one option:

### Option A: If you know your MySQL password
```bash
mysql -u root -p < setup_erms.sql
```
(It will prompt for your password)

### Option B: If you don't have a password (empty password)
```bash
mysql -u root < setup_erms.sql
```

### Option C: Use the automated startup script
```bash
./start_app.sh
```
(This will prompt for your MySQL password if needed)

## Step 2: Start the Application

### Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Automated Start (One Command)
```bash
./start_app.sh
```

## Access the Application

- **Frontend**: http://localhost:30001
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Troubleshooting

If you get "Access denied" for MySQL:
1. Check your password in `backend/.env`
2. Try resetting MySQL password (see `DATABASE_SETUP_INSTRUCTIONS.md`)
3. Or use: `mysql -u root -p` to test your connection

If backend fails to connect:
- Make sure database `er_hospital_management` exists
- Check `backend/.env` has correct MySQL credentials
- Verify MySQL is running: `mysql -u root -e "SELECT 1;"`

