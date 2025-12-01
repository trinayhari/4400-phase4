#!/usr/bin/env python3
"""
Helper script to set up MySQL database and run SQL file.
This script will guide you through the process.
"""

import subprocess
import sys
import getpass
import os

def run_command(cmd, check=True):
    """Run a shell command"""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error: {result.stderr}")
        return False
    return True

def main():
    print("=== MySQL Database Setup Helper ===\n")
    
    print("This script will help you:")
    print("1. Reset MySQL root password")
    print("2. Create er_hospital_management database")
    print("3. Run Phase 3 SQL file")
    print("\nNOTE: You'll need sudo access for some steps.\n")
    
    # Check if MySQL is running
    result = subprocess.run("pgrep -x mysqld", shell=True, capture_output=True)
    mysql_running = result.returncode == 0
    
    if mysql_running:
        print("MySQL is currently running.")
        print("\nTo reset password, you need to:")
        print("1. Stop MySQL: sudo /usr/local/mysql/support-files/mysql.server stop")
        print("2. Start in safe mode: sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &")
        print("3. Reset password: /usr/local/mysql/bin/mysql -u root")
        print("   Then run: ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password'; FLUSH PRIVILEGES;")
        print("4. Restart MySQL: sudo pkill mysqld && sudo /usr/local/mysql/support-files/mysql.server start")
    else:
        print("MySQL is not running.")
    
    print("\n" + "="*50)
    print("After resetting password, run this script again to set up the database.")
    print("="*50 + "\n")
    
    # Try to connect and set up database
    print("\nAttempting to connect to MySQL...")
    password = getpass.getpass("Enter MySQL root password (or press Enter if empty): ")
    
    if password:
        mysql_cmd = f"mysql -u root -p{password}"
    else:
        mysql_cmd = "mysql -u root"
    
    # Create database
    print("\nCreating database...")
    create_db_cmd = f"{mysql_cmd} -e 'CREATE DATABASE IF NOT EXISTS er_hospital_management;'"
    if not run_command(create_db_cmd, check=False):
        print("\nCould not connect to MySQL. Please reset password first.")
        return
    
    # Run SQL file
    sql_file = "/Users/trinayhari/4400-phase4/Phase_III_SP_Views_Template5finale.sql"
    if os.path.exists(sql_file):
        print(f"\nRunning SQL file: {sql_file}")
        if password:
            run_cmd = f"{mysql_cmd} er_hospital_management < {sql_file}"
        else:
            run_cmd = f"mysql -u root er_hospital_management < {sql_file}"
        
        if run_command(run_cmd, check=False):
            print("✓ SQL file executed successfully!")
        else:
            print("⚠ Some errors occurred. Check the output above.")
    else:
        print(f"SQL file not found: {sql_file}")
    
    # Update .env file
    env_file = "/Users/trinayhari/4400-phase4/backend/.env"
    print(f"\nUpdating .env file: {env_file}")
    
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            content = f.read()
        
        # Update MYSQL_PASSWORD
        lines = content.split('\n')
        updated = False
        for i, line in enumerate(lines):
            if line.startswith('MYSQL_PASSWORD='):
                lines[i] = f'MYSQL_PASSWORD={password}'
                updated = True
                break
        
        if not updated:
            lines.append(f'MYSQL_PASSWORD={password}')
        
        with open(env_file, 'w') as f:
            f.write('\n'.join(lines))
        
        print(f"✓ Updated .env file with password")
    else:
        print(f"⚠ .env file not found. Please create it manually.")
        print(f"   Add: MYSQL_PASSWORD={password}")
    
    print("\n=== Setup Complete ===")
    print("\nNext steps:")
    print("1. Restart your backend server")
    print("2. Test the connection at http://localhost:30001")

if __name__ == "__main__":
    main()

