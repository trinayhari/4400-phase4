'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function AppointmentsPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Book Appointment Form
  const [bookForm, setBookForm] = useState({
    patientid: '',
    apptdate: '',
    appttime: '',
    apptcost: '',
  })

  // Assign Doctor Form
  const [assignDoctorForm, setAssignDoctorForm] = useState({
    patientId: '',
    apptDate: '',
    apptTime: '',
    doctorId: '',
  })

  // Complete Appointment Form
  const [completeForm, setCompleteForm] = useState({
    patientId: '',
    apptDate: '',
    apptTime: '',
  })

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/appointments/book', {
        ...bookForm,
        apptcost: parseInt(bookForm.apptcost),
      })
      setMessage({ type: 'success', text: 'Appointment booked successfully!' })
      setBookForm({ patientid: '', apptdate: '', appttime: '', apptcost: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to book appointment' })
    }
  }

  const handleAssignDoctor = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/appointments/assign-doctor', assignDoctorForm)
      setMessage({ type: 'success', text: 'Doctor assigned successfully!' })
      setAssignDoctorForm({ patientId: '', apptDate: '', apptTime: '', doctorId: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to assign doctor' })
    }
  }

  const handleCompleteAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/appointments/complete', completeForm)
      setMessage({ type: 'success', text: 'Appointment completed successfully!' })
      setCompleteForm({ patientId: '', apptDate: '', apptTime: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to complete appointment' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Appointment Management</h1>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-400'
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Appointment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  required
                  value={bookForm.patientid}
                  onChange={(e) => setBookForm({ ...bookForm, patientid: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={bookForm.apptdate}
                  onChange={(e) => setBookForm({ ...bookForm, apptdate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  required
                  value={bookForm.appttime}
                  onChange={(e) => setBookForm({ ...bookForm, appttime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={bookForm.apptcost}
                  onChange={(e) => setBookForm({ ...bookForm, apptcost: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Assign Doctor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Doctor</h2>
            <form onSubmit={handleAssignDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  required
                  value={assignDoctorForm.patientId}
                  onChange={(e) =>
                    setAssignDoctorForm({ ...assignDoctorForm, patientId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  required
                  value={assignDoctorForm.apptDate}
                  onChange={(e) =>
                    setAssignDoctorForm({ ...assignDoctorForm, apptDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
                <input
                  type="time"
                  required
                  value={assignDoctorForm.apptTime}
                  onChange={(e) =>
                    setAssignDoctorForm({ ...assignDoctorForm, apptTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                <input
                  type="text"
                  required
                  value={assignDoctorForm.doctorId}
                  onChange={(e) =>
                    setAssignDoctorForm({ ...assignDoctorForm, doctorId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Assign Doctor
              </button>
            </form>
          </div>

          {/* Complete Appointment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Appointment</h2>
            <form onSubmit={handleCompleteAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  required
                  value={completeForm.patientId}
                  onChange={(e) => setCompleteForm({ ...completeForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  required
                  value={completeForm.apptDate}
                  onChange={(e) => setCompleteForm({ ...completeForm, apptDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
                <input
                  type="time"
                  required
                  value={completeForm.apptTime}
                  onChange={(e) => setCompleteForm({ ...completeForm, apptTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Complete Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

