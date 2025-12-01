# ERMS Database Setup Instructions

## Quick Setup Guide

Follow these steps to set up your ERMS database:

### Step 1: Ensure MySQL is Running

Check if MySQL is running:
```bash
mysql -u root -e "SELECT 1;" 2>/dev/null && echo "MySQL is running" || echo "MySQL is not running"
```

If MySQL is not running, start it:
```bash
# For macOS with MySQL installed via DMG:
sudo /usr/local/mysql/support-files/mysql.server start

# For macOS with MySQL installed via Homebrew:
brew services start mysql
```

### Step 2: Update MySQL Password in `.env` File

Edit `backend/.env` and set your MySQL root password:

```bash
# If you have a password:
MYSQL_PASSWORD=your_password_here

# If you don't have a password (empty):
MYSQL_PASSWORD=
```

**To find or reset your MySQL password:**
- If you installed MySQL via Homebrew, the default is usually **no password** (empty)
- If you installed via MySQL DMG installer, check if you set a password during installation
- If you forgot your password, see `DATABASE_SETUP_INSTRUCTIONS.md` for password reset instructions

### Step 3: Run the Database Setup Script

Execute the combined SQL setup script:

```bash
# If you have a MySQL password:
mysql -u root -p < setup_erms.sql

# If you don't have a password (empty):
mysql -u root < setup_erms.sql
```

This will:
- Drop and recreate the `er_hospital_management` database
- Create all 13 tables
- Insert sample data (22 persons, 10 patients, 15 staff, etc.)
- Create 5 views and 15 stored procedures

### Step 4: Verify the Setup

Test the database connection:

```bash
mysql -u root -p -e "USE er_hospital_management; SHOW TABLES;"
```

You should see all 13 tables listed.

### Step 5: Test the Backend Connection

Start your FastAPI backend:

```bash
cd backend
python -m uvicorn main:app --reload
```

The backend should connect to the database automatically using the credentials from `backend/.env`.

## Troubleshooting

### "Access denied" Error
- Check your MySQL password in `backend/.env`
- Try connecting manually: `mysql -u root -p`
- If that fails, you may need to reset your MySQL password (see `DATABASE_SETUP_INSTRUCTIONS.md`)

### "Can't connect to MySQL server" Error
- Make sure MySQL is running (see Step 1)
- Check if MySQL is listening on the default port (3306)

### "Database doesn't exist" Error
- Make sure you ran `setup_erms.sql` successfully
- Check for any errors in the SQL script output

## What's Included

The `setup_erms.sql` script combines:
1. **Phase II Create Tables** - Creates all database tables with proper relationships
2. **Phase II Insert Data** - Inserts sample data for testing
3. **Phase III Views & Procedures** - Creates 5 views and 15 stored procedures

## Files Created

- `setup_erms.sql` - Combined database setup script
- `backend/.env` - MySQL connection configuration (you need to set the password)

