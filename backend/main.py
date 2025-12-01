from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import db
from models import (
    AddPatientRequest, AddFundsRequest, RemovePatientRequest,
    RecordSymptomRequest,
    BookAppointmentRequest, CompleteAppointmentRequest, AssignDoctorToAppointmentRequest,
    PlaceOrderRequest, CompleteOrdersRequest,
    AddStaffToDeptRequest, RemoveStaffFromDeptRequest, ManageDepartmentRequest,
    AssignNurseToRoomRequest, AssignRoomToPatientRequest, ReleaseRoomRequest
)

app = FastAPI(title="ERMS API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:30001", "http://localhost:3000", "http://localhost:3001"],  # Next.js ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Connect to database on startup"""
    db.connect()

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    db.disconnect()

# ==================== VIEWS (GET) ====================

@app.get("/api/views/room-wise")
async def get_room_wise_view():
    """Get room_wise_view data"""
    try:
        results = db.execute_view("room_wise_view")
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/views/symptoms-overview")
async def get_symptoms_overview_view():
    """Get symptoms_overview_view data"""
    try:
        results = db.execute_view("symptoms_overview_view")
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/views/medical-staff")
async def get_medical_staff_view():
    """Get medical_staff_view data"""
    try:
        results = db.execute_view("medical_staff_view")
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/views/departments")
async def get_department_view():
    """Get department_view data"""
    try:
        results = db.execute_view("department_view")
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/views/outstanding-charges")
async def get_outstanding_charges_view():
    """Get outstanding_charges_view data"""
    try:
        results = db.execute_view("outstanding_charges_view")
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== PATIENT PROCEDURES ====================

@app.post("/api/patients/add")
async def add_patient(request: AddPatientRequest):
    """Call add_patient stored procedure"""
    try:
        params = (
            request.ssn,
            request.first_name,
            request.last_name,
            request.birthdate,
            request.address,
            request.funds,
            request.contact
        )
        db.execute_procedure("add_patient", params)
        return {"success": True, "message": "Patient added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/patients/add-funds")
async def add_funds(request: AddFundsRequest):
    """Call add_funds stored procedure"""
    try:
        params = (request.ssn, request.funds)
        db.execute_procedure("add_funds", params)
        return {"success": True, "message": "Funds added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/patients/remove")
async def remove_patient(request: RemovePatientRequest):
    """Call remove_patient stored procedure"""
    try:
        params = (request.ssn,)
        db.execute_procedure("remove_patient", params)
        return {"success": True, "message": "Patient removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==================== SYMPTOM PROCEDURES ====================

@app.post("/api/symptoms/record")
async def record_symptom(request: RecordSymptomRequest):
    """Call record_symptom stored procedure"""
    try:
        params = (
            request.patientId,
            request.numDays,
            request.apptDate,
            request.apptTime,
            request.symptomType
        )
        db.execute_procedure("record_symptom", params)
        return {"success": True, "message": "Symptom recorded successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==================== APPOINTMENT PROCEDURES ====================

@app.post("/api/appointments/book")
async def book_appointment(request: BookAppointmentRequest):
    """Call book_appointment stored procedure"""
    try:
        params = (
            request.patientid,
            request.apptdate,
            request.appttime,
            request.apptcost
        )
        db.execute_procedure("book_appointment", params)
        return {"success": True, "message": "Appointment booked successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/appointments/complete")
async def complete_appointment(request: CompleteAppointmentRequest):
    """Call complete_appointment stored procedure"""
    try:
        params = (
            request.patientId,
            request.apptDate,
            request.apptTime
        )
        db.execute_procedure("complete_appointment", params)
        return {"success": True, "message": "Appointment completed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/appointments/assign-doctor")
async def assign_doctor_to_appointment(request: AssignDoctorToAppointmentRequest):
    """Call assign_doctor_to_appointment stored procedure"""
    try:
        params = (
            request.patientId,
            request.apptDate,
            request.apptTime,
            request.doctorId
        )
        db.execute_procedure("assign_doctor_to_appointment", params)
        return {"success": True, "message": "Doctor assigned successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==================== ORDER PROCEDURES ====================

@app.post("/api/orders/place")
async def place_order(request: PlaceOrderRequest):
    """Call place_order stored procedure"""
    try:
        # Handle optional labtype/drug/dosage
        labtype = request.labtype if request.labtype else None
        drug = request.drug if request.drug else None
        dosage = request.dosage if request.dosage else None
        
        params = (
            request.ordernumber,
            request.priority,
            request.patientid,
            request.doctorid,
            request.cost,
            labtype,
            drug,
            dosage
        )
        db.execute_procedure("place_order", params)
        return {"success": True, "message": "Order placed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/orders/complete")
async def complete_orders(request: CompleteOrdersRequest):
    """Call complete_orders stored procedure"""
    try:
        params = (request.num_orders,)
        db.execute_procedure("complete_orders", params)
        return {"success": True, "message": f"{request.num_orders} order(s) completed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==================== STAFF PROCEDURES ====================

@app.post("/api/staff/add-to-dept")
async def add_staff_to_dept(request: AddStaffToDeptRequest):
    """Call add_staff_to_dept stored procedure"""
    try:
        params = (
            request.deptId,
            request.ssn,
            request.firstName,
            request.lastName,
            request.birthdate,
            request.startdate,
            request.address,
            request.staffId,
            request.salary
        )
        db.execute_procedure("add_staff_to_dept", params)
        return {"success": True, "message": "Staff added to department successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/staff/remove-from-dept")
async def remove_staff_from_dept(request: RemoveStaffFromDeptRequest):
    """Call remove_staff_from_dept stored procedure"""
    try:
        params = (request.ssn, request.deptId)
        db.execute_procedure("remove_staff_from_dept", params)
        return {"success": True, "message": "Staff removed from department successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/staff/manage-department")
async def manage_department(request: ManageDepartmentRequest):
    """Call manage_department stored procedure"""
    try:
        params = (request.ssn, request.deptId)
        db.execute_procedure("manage_department", params)
        return {"success": True, "message": "Department manager assigned successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ==================== ROOM PROCEDURES ====================

@app.post("/api/rooms/assign-nurse")
async def assign_nurse_to_room(request: AssignNurseToRoomRequest):
    """Call assign_nurse_to_room stored procedure"""
    try:
        params = (request.nurseId, request.roomNumber)
        db.execute_procedure("assign_nurse_to_room", params)
        return {"success": True, "message": "Nurse assigned to room successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/rooms/assign-patient")
async def assign_room_to_patient(request: AssignRoomToPatientRequest):
    """Call assign_room_to_patient stored procedure"""
    try:
        params = (request.ssn, request.roomNumber, request.roomType)
        db.execute_procedure("assign_room_to_patient", params)
        return {"success": True, "message": "Room assigned to patient successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/rooms/release")
async def release_room(request: ReleaseRoomRequest):
    """Call release_room stored procedure"""
    try:
        params = (request.roomNumber,)
        db.execute_procedure("release_room", params)
        return {"success": True, "message": "Room released successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "ERMS API is running", "docs": "/docs"}

