<!-- ac0b2706-2dfe-4ad4-a066-8a14c634f6ee 9672fe6c-753e-41f7-93b8-2dcf1de13715 -->
# Emergency Room Management System - Phase 4 Implementation

## Architecture Overview

- **Backend**: Python FastAPI that calls MySQL stored procedures
- **Frontend**: Next.js with React components and Tailwind CSS
- **Database**: MySQL 8.0 (existing schema with stored procedures/views)

## Project Structure

```
/Users/trinayhari/4400-phase4/
├── backend/
│   ├── main.py             # FastAPI app with all API routes
│   ├── database.py         # MySQL connection helper
│   ├── models.py           # Pydantic models for request validation
│   └── requirements.txt    # fastapi, uvicorn, mysql-connector-python
├── frontend/
│   ├── src/app/            # Next.js app router pages
│   ├── src/components/     # Reusable React components
│   └── package.json
└── README.md
```

## FastAPI Benefits

- Auto-generated Swagger docs at `http://localhost:8000/docs` (great for demo!)
- Pydantic models validate all stored procedure inputs automatically
- Async support for better performance

## Backend API Endpoints

### Views (GET requests)

| Endpoint | View |

|----------|------|

| `/api/views/room-wise` | room_wise_view |

| `/api/views/symptoms-overview` | symptoms_overview_view |

| `/api/views/medical-staff` | medical_staff_view |

| `/api/views/departments` | department_view |

| `/api/views/outstanding-charges` | outstanding_charges_view |

### Stored Procedures (POST requests)

| Endpoint | Procedure |

|----------|-----------|

| `/api/patients/add` | add_patient |

| `/api/patients/add-funds` | add_funds |

| `/api/patients/remove` | remove_patient |

| `/api/symptoms/record` | record_symptom |

| `/api/appointments/book` | book_appointment |

| `/api/appointments/complete` | complete_appointment |

| `/api/appointments/assign-doctor` | assign_doctor_to_appointment |

| `/api/orders/place` | place_order |

| `/api/orders/complete` | complete_orders |

| `/api/staff/add-to-dept` | add_staff_to_dept |

| `/api/staff/remove-from-dept` | remove_staff_from_dept |

| `/api/staff/manage-department` | manage_department |

| `/api/rooms/assign-nurse` | assign_nurse_to_room |

| `/api/rooms/assign-patient` | assign_room_to_patient |

| `/api/rooms/release` | release_room |

## Frontend Pages

1. **Dashboard** - Navigation hub with links to all sections
2. **Views Page** - Display all 5 database views in tables
3. **Patients** - Add patient, add funds, remove patient forms
4. **Appointments** - Book, assign doctor, complete appointment
5. **Orders** - Place order (lab/prescription), complete orders
6. **Staff** - Add to dept, remove from dept, manage department
7. **Rooms** - Assign nurse, assign patient, release room
8. **Symptoms** - Record symptom form

## Key Implementation Details

- FastAPI uses `mysql-connector-python` to call stored procedures via `CALL procedure_name(...)`
- Pydantic models define request schemas with validation
- Frontend uses `fetch()` to call backend API at `http://localhost:8000`
- CORS enabled for frontend-backend communication
- All forms validate inputs before submission

### To-dos

- [ ] Create Flask backend with MySQL connection and all 20 API endpoints
- [x] Create Next.js frontend with Tailwind CSS configuration
- [x] Build Views page displaying all 5 database views in tables
- [x] Build Patients page with add, add-funds, remove forms
- [x] Build Appointments page with book, assign-doctor, complete forms
- [x] Build Orders page with place-order and complete-orders forms
- [x] Build Staff page with add-to-dept, remove-from-dept, manage forms
- [x] Build Rooms page with assign-nurse, assign-patient, release forms
- [x] Build Symptoms page with record symptom form
- [x] Create README with setup and run instructions