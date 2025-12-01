#!/bin/bash

# ERMS Application Startup Script

set -e

echo "=== ERMS Application Startup ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MySQL is accessible
echo "Checking MySQL connection..."
if mysql -u root -e "SELECT 1;" 2>/dev/null; then
    echo -e "${GREEN}✓ MySQL connection successful (no password)${NC}"
    MYSQL_CMD="mysql -u root"
elif mysql -u root -p"$(grep MYSQL_PASSWORD backend/.env 2>/dev/null | cut -d'=' -f2)" -e "SELECT 1;" 2>/dev/null; then
    echo -e "${GREEN}✓ MySQL connection successful (using .env password)${NC}"
    MYSQL_PASSWORD=$(grep MYSQL_PASSWORD backend/.env | cut -d'=' -f2)
    MYSQL_CMD="mysql -u root -p${MYSQL_PASSWORD}"
else
    echo -e "${YELLOW}⚠ MySQL requires password. Please enter your MySQL root password:${NC}"
    read -s MYSQL_PASSWORD
    export MYSQL_PWD="$MYSQL_PASSWORD"
    MYSQL_CMD="mysql -u root -p${MYSQL_PASSWORD}"
    
    # Test connection
    if ! $MYSQL_CMD -e "SELECT 1;" 2>/dev/null; then
        echo -e "${RED}✗ MySQL connection failed. Please check your password.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ MySQL connection successful${NC}"
fi

# Check if database exists
echo ""
echo "Checking if database exists..."
if $MYSQL_CMD -e "USE er_hospital_management;" 2>/dev/null; then
    echo -e "${GREEN}✓ Database 'er_hospital_management' exists${NC}"
else
    echo -e "${YELLOW}⚠ Database does not exist. Setting up database...${NC}"
    echo "Running setup_erms.sql..."
    
    if [ -z "$MYSQL_PASSWORD" ]; then
        mysql -u root < setup_erms.sql
    else
        mysql -u root -p"$MYSQL_PASSWORD" < setup_erms.sql
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database setup complete!${NC}"
    else
        echo -e "${RED}✗ Database setup failed. Please check the error above.${NC}"
        exit 1
    fi
fi

# Check Python virtual environment
echo ""
echo "Checking Python environment..."
if [ ! -d "backend/venv" ]; then
    echo -e "${YELLOW}⚠ Python virtual environment not found. Creating one...${NC}"
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
    echo -e "${GREEN}✓ Virtual environment created and dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Python virtual environment exists${NC}"
fi

# Check Node modules
echo ""
echo "Checking Node.js dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠ Node modules not found. Installing...${NC}"
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✓ Node modules installed${NC}"
else
    echo -e "${GREEN}✓ Node modules exist${NC}"
fi

# Start backend
echo ""
echo -e "${GREEN}Starting backend server...${NC}"
cd backend
source venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Backend server started (PID: $BACKEND_PID)${NC}"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
else
    echo -e "${RED}✗ Backend server failed to start${NC}"
    exit 1
fi

# Start frontend
echo ""
echo -e "${GREEN}Starting frontend server...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 3

# Check if frontend started successfully
if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Frontend server started (PID: $FRONTEND_PID)${NC}"
    echo "   Frontend: http://localhost:30001"
else
    echo -e "${RED}✗ Frontend server failed to start${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo -e "${GREEN}=== Application Started Successfully ===${NC}"
echo ""
echo "Backend API: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo "Frontend: http://localhost:30001"
echo ""
echo "To stop the servers, run:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or press Ctrl+C to stop this script (servers will continue running)"

# Wait for user interrupt
wait

