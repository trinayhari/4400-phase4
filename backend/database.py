import mysql.connector
from mysql.connector import Error
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
        # Get password from environment variable or use empty string
        mysql_password = os.getenv('MYSQL_PASSWORD', '')
        self.config = {
            'host': os.getenv('MYSQL_HOST', 'localhost'),
            'database': os.getenv('MYSQL_DATABASE', 'er_hospital_management'),
            'user': os.getenv('MYSQL_USER', 'root'),
            'password': mysql_password,
            'autocommit': False
        }
    
    def connect(self):
        """Establish connection to MySQL database"""
        try:
            self.connection = mysql.connector.connect(**self.config)
            if self.connection.is_connected():
                return True
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
    
    def execute_procedure(self, procedure_name: str, params: tuple = None):
        """Execute a stored procedure and return results"""
        cursor = None
        try:
            if not self.connection or not self.connection.is_connected():
                if not self.connect():
                    raise Error("Failed to connect to database")
            
            cursor = self.connection.cursor(dictionary=True)
            
            if params:
                cursor.callproc(procedure_name, params)
            else:
                cursor.callproc(procedure_name)
            
            # Get results from all result sets (if any)
            results = []
            for result in cursor.stored_results():
                results.extend(result.fetchall())
            
            self.connection.commit()
            return results
        except Error as e:
            if self.connection:
                self.connection.rollback()
            raise e
        finally:
            if cursor:
                cursor.close()
    
    def execute_view(self, view_name: str):
        """Execute a SELECT query on a view"""
        cursor = None
        try:
            if not self.connection or not self.connection.is_connected():
                if not self.connect():
                    raise Error("Failed to connect to database")
            
            cursor = self.connection.cursor(dictionary=True)
            # Using parameterized query for safety (though view_name is controlled)
            cursor.execute(f"SELECT * FROM `{view_name}`")
            results = cursor.fetchall()
            return results
        except Error as e:
            raise e
        finally:
            if cursor:
                cursor.close()
    
    def get_connection(self):
        """Get the database connection (for direct queries if needed)"""
        if not self.connection or not self.connection.is_connected():
            self.connect()
        return self.connection

# Global database instance
db = Database()

