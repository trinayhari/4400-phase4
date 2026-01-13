# Database Setup Instructions

## Quick Setup Steps

Run these commands **one at a time** in your terminal:

### Step 1: Stop MySQL
```bash
sudo /usr/local/mysql/support-files/mysql.server stop
```

### Step 2: Start MySQL in Safe Mode (in a NEW terminal window)
```bash
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &
```

### Step 3: Reset Password (in the same terminal as Step 2)
```bash
/usr/local/mysql/bin/mysql -u root
```

Then in MySQL prompt, run:
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Stop Safe Mode and Restart MySQL
```bash
sudo pkill mysqld
sudo /usr/local/mysql/support-files/mysql.server start
```

### Step 5: Create Database and Run SQL File
```bash
mysql -u root -p < /Users/trinayhari/4400-phase4/Phase_III_SP_Views_Template5finale.sql
```

Or if you want to set an empty password:
```bash
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS er_hospital_management;
USE er_hospital_management;
SOURCE /Users/trinayhari/4400-phase4/Phase_III_SP_Views_Template5finale.sql;
EOF
```

### Step 6: Update .env File
Edit `backend/.env` and set:
```
MYSQL_PASSWORD=your_new_password
```

Or if empty password:
```
MYSQL_PASSWORD=
```

## Alternative: Use Empty Password

If you want to use an empty password (simpler for development):

1. Stop MySQL: `sudo /usr/local/mysql/support-files/mysql.server stop`
2. Start safe mode: `sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &`
3. Connect: `/usr/local/mysql/bin/mysql -u root`
4. Run: `ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES; EXIT;`
5. Restart: `sudo pkill mysqld && sudo /usr/local/mysql/support-files/mysql.server start`
6. Run SQL: `mysql -u root er_hospital_management < Phase_III_SP_Views_Template5finale.sql`
7. Set `.env`: `MYSQL_PASSWORD=` (empty)


