# Emergency Room Management System (ERMS) - Phase 4

A full-stack web application for managing emergency room operations, built with FastAPI (backend) and Next.js (frontend).

## Technologies Used

- **Backend**: Python FastAPI with MySQL connector
- **Frontend**: Next.js 14 with React and Tailwind CSS
- **Database**: MySQL 8.0+
- **API Documentation**: Auto-generated Swagger UI at `/docs`

## Project Structure

```
4400-phase4/
├── backend/
│   ├── main.py             # FastAPI application with all API routes
│   ├── database.py         # MySQL connection helper
│   ├── models.py           # Pydantic models for request validation
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable React components
│   │   └── lib/           # API utility functions
│   ├── package.json
│   └── tailwind.config.js
├── Phase_III_SP_Views_Template5finale.sql  # Database schema and stored procedures
└── README.md
```

## Prerequisites

- Python 3.8+ installed
- Node.js 18+ and npm installed
- MySQL 8.0+ installed and running
- MySQL database `er_hospital_management` created with all tables, views, and stored procedures from Phase 3

## Setup Instructions

### 1. Database Setup

First, ensure your MySQL database is set up:

```bash
# Connect to MySQL
mysql -u root -p

# Create database (if not already created)
CREATE DATABASE er_hospital_management;

# Use the database
USE er_hospital_management;

# Run the Phase 3 SQL file to create tables, views, and stored procedures
SOURCE Phase_III_SP_Views_Template5finale.sql;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure MySQL connection
# Copy the example config file and update with your MySQL password
cp config_example.env .env
# Edit .env file and set your MYSQL_PASSWORD
# Or set environment variable: export MYSQL_PASSWORD=your_password
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
# From the backend directory
cd backend

# Activate virtual environment if not already activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

The backend will be running at `http://localhost:8000`
- API endpoints: `http://localhost:8000/api/...`
- API documentation: `http://localhost:8000/docs` (Swagger UI)
- Alternative docs: `http://localhost:8000/redoc`

### 2. Start the Frontend Server

Open a new terminal window:

```bash
# From the frontend directory
cd frontend

# Start Next.js development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

## Application Features

### Views (Read-Only)
- **Room Wise View**: Patient room assignments with doctors and nurses
- **Symptoms Overview**: Patient appointments with recorded symptoms
- **Medical Staff View**: Information about doctors and nurses
- **Department View**: Department statistics and staff counts
- **Outstanding Charges View**: Patient financial information

### Patient Management
- Add new patients
- Add funds to patient accounts
- Remove patients (with constraints)

### Appointment Management
- Book new appointments
- Assign doctors to appointments
- Complete appointments

### Order Management
- Place orders (lab work or prescriptions)
- Complete orders by priority

### Staff Management
- Add staff members to departments
- Remove staff from departments
- Assign department managers

### Room Management
- Assign nurses to rooms
- Assign rooms to patients
- Release rooms

### Symptom Management
- Record patient symptoms for appointments

## API Endpoints

### Views (GET)
- `GET /api/views/room-wise`
- `GET /api/views/symptoms-overview`
- `GET /api/views/medical-staff`
- `GET /api/views/departments`
- `GET /api/views/outstanding-charges`

### Patient Operations (POST)
- `POST /api/patients/add`
- `POST /api/patients/add-funds`
- `POST /api/patients/remove`

### Appointment Operations (POST)
- `POST /api/appointments/book`
- `POST /api/appointments/assign-doctor`
- `POST /api/appointments/complete`

### Order Operations (POST)
- `POST /api/orders/place`
- `POST /api/orders/complete`

### Staff Operations (POST)
- `POST /api/staff/add-to-dept`
- `POST /api/staff/remove-from-dept`
- `POST /api/staff/manage-department`

### Room Operations (POST)
- `POST /api/rooms/assign-nurse`
- `POST /api/rooms/assign-patient`
- `POST /api/rooms/release`

### Symptom Operations (POST)
- `POST /api/symptoms/record`

## Troubleshooting

### Backend Issues

1. **MySQL Connection Error**: 
   - Check that MySQL is running: `mysql -u root -p`
   - Update `backend/database.py` with correct MySQL credentials
   - Ensure database `er_hospital_management` exists

2. **Import Errors**:
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

3. **Stored Procedure Errors**:
   - Verify Phase 3 SQL file has been executed successfully
   - Check MySQL error logs for specific procedure issues

### Frontend Issues

1. **API Connection Error**:
   - Ensure backend is running on port 8000
   - Check CORS settings in `backend/main.py`
   - Verify API_BASE_URL in `frontend/src/lib/api.ts`

2. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version: `node --version` (should be 18+)

## Work Distribution

[To be filled in by team members]

## Notes

- The application uses stored procedures from Phase 3, so all business logic is handled in the database
- FastAPI automatically validates all inputs using Pydantic models
- The frontend provides a user-friendly interface for all database operations
- All forms include client-side validation before submission
- Error messages are displayed to users when operations fail

## Demo Preparation

Before the demo, ensure:
1. All test cases from Phase 3 pass
2. Database is populated with test data
3. Both backend and frontend servers are running
4. You can access Swagger docs at `http://localhost:8000/docs`
5. All pages are accessible and functional

