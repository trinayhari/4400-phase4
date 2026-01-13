#!/bin/bash

echo "=== MySQL Database Setup Script ==="
echo ""
echo "This script will:"
echo "1. Reset MySQL root password (you'll be prompted)"
echo "2. Create/use er_hospital_management database"
echo "3. Run the Phase 3 SQL file"
echo ""

# Step 1: Stop MySQL
echo "Step 1: Stopping MySQL server..."
sudo /usr/local/mysql/support-files/mysql.server stop
sleep 2

# Step 2: Start MySQL in safe mode
echo "Step 2: Starting MySQL in safe mode..."
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &
MYSQL_SAFE_PID=$!
sleep 5

# Step 3: Get new password
echo ""
echo "Step 3: Setting MySQL root password..."
echo "Enter your NEW MySQL root password (or press Enter for empty password):"
read -s NEW_PASSWORD

if [ -z "$NEW_PASSWORD" ]; then
    NEW_PASSWORD=""
    echo "Setting empty password..."
else
    echo "Setting password..."
fi

# Step 4: Reset password
/usr/local/mysql/bin/mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
FLUSH PRIVILEGES;
EOF

echo ""
echo "Step 4: Stopping safe mode MySQL..."
sudo kill $MYSQL_SAFE_PID 2>/dev/null
sleep 3

echo "Step 5: Starting MySQL normally..."
sudo /usr/local/mysql/support-files/mysql.server start
sleep 3

# Step 6: Create database and run SQL file
echo ""
echo "Step 6: Setting up database..."

if [ -z "$NEW_PASSWORD" ]; then
    mysql -u root <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS er_hospital_management;
USE er_hospital_management;
SOURCE /Users/trinayhari/4400-phase4/Phase_III_SP_Views_Template5finale.sql;
SHOW TABLES;
MYSQL_SCRIPT
else
    mysql -u root -p"$NEW_PASSWORD" <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS er_hospital_management;
USE er_hospital_management;
SOURCE /Users/trinayhari/4400-phase4/Phase_III_SP_Views_Template5finale.sql;
SHOW TABLES;
MYSQL_SCRIPT
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Please update your .env file at: backend/.env"
echo "Set: MYSQL_PASSWORD=$NEW_PASSWORD"
echo ""
echo "If you set an empty password, use: MYSQL_PASSWORD="


