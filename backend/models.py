from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, time

# Patient Models
class AddPatientRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=40)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    birthdate: date
    address: str = Field(..., min_length=1, max_length=200)
    funds: int = Field(..., ge=0)
    contact: str = Field(..., min_length=1, max_length=12)

class AddFundsRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=11)
    funds: int = Field(..., gt=0)

class RemovePatientRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=11)

# Symptom Models
class RecordSymptomRequest(BaseModel):
    patientId: str = Field(..., min_length=1, max_length=40)
    numDays: int = Field(..., ge=0)
    apptDate: date
    apptTime: time
    symptomType: str = Field(..., min_length=1, max_length=100)

# Appointment Models
class BookAppointmentRequest(BaseModel):
    patientid: str = Field(..., min_length=1, max_length=11)
    apptdate: date
    appttime: time
    apptcost: int = Field(..., ge=0)

class CompleteAppointmentRequest(BaseModel):
    patientId: str = Field(..., min_length=1, max_length=11)
    apptDate: date
    apptTime: time

class AssignDoctorToAppointmentRequest(BaseModel):
    patientId: str = Field(..., min_length=1, max_length=11)
    apptDate: date
    apptTime: time
    doctorId: str = Field(..., min_length=1, max_length=11)

# Order Models
class PlaceOrderRequest(BaseModel):
    ordernumber: int = Field(..., gt=0)
    priority: int = Field(..., ge=1, le=5)
    patientid: str = Field(..., min_length=1, max_length=11)
    doctorid: str = Field(..., min_length=1, max_length=11)
    cost: int = Field(..., ge=0)
    labtype: Optional[str] = Field(None, max_length=100)
    drug: Optional[str] = Field(None, max_length=100)
    dosage: Optional[int] = Field(None, gt=0)

class CompleteOrdersRequest(BaseModel):
    num_orders: int = Field(..., gt=0)

# Staff Models
class AddStaffToDeptRequest(BaseModel):
    deptId: int
    ssn: str = Field(..., min_length=1, max_length=11)
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    birthdate: date
    startdate: date
    address: str = Field(..., min_length=1, max_length=200)
    staffId: int
    salary: int = Field(..., ge=0)

class RemoveStaffFromDeptRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=11)
    deptId: int

class ManageDepartmentRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=11)
    deptId: int

# Room Models
class AssignNurseToRoomRequest(BaseModel):
    nurseId: str = Field(..., min_length=1, max_length=11)
    roomNumber: int

class AssignRoomToPatientRequest(BaseModel):
    ssn: str = Field(..., min_length=1, max_length=11)
    roomNumber: int
    roomType: str = Field(..., min_length=1, max_length=100)

class ReleaseRoomRequest(BaseModel):
    roomNumber: int

