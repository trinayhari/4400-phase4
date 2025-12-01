'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function RoomsPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Assign Nurse to Room Form
  const [assignNurseForm, setAssignNurseForm] = useState({
    nurseId: '',
    roomNumber: '',
  })

  // Assign Room to Patient Form
  const [assignPatientForm, setAssignPatientForm] = useState({
    ssn: '',
    roomNumber: '',
    roomType: '',
  })

  // Release Room Form
  const [releaseRoomForm, setReleaseRoomForm] = useState({
    roomNumber: '',
  })

  const handleAssignNurse = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/rooms/assign-nurse', {
        ...assignNurseForm,
        roomNumber: parseInt(assignNurseForm.roomNumber),
      })
      setMessage({ type: 'success', text: 'Nurse assigned to room successfully!' })
      setAssignNurseForm({ nurseId: '', roomNumber: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to assign nurse to room' })
    }
  }

  const handleAssignPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/rooms/assign-patient', {
        ...assignPatientForm,
        roomNumber: parseInt(assignPatientForm.roomNumber),
      })
      setMessage({ type: 'success', text: 'Room assigned to patient successfully!' })
      setAssignPatientForm({ ssn: '', roomNumber: '', roomType: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to assign room to patient' })
    }
  }

  const handleReleaseRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/rooms/release', {
        roomNumber: parseInt(releaseRoomForm.roomNumber),
      })
      setMessage({ type: 'success', text: 'Room released successfully!' })
      setReleaseRoomForm({ roomNumber: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to release room' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Room Management</h1>

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
          {/* Assign Nurse to Room */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Nurse to Room</h2>
            <form onSubmit={handleAssignNurse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nurse ID</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={assignNurseForm.nurseId}
                  onChange={(e) =>
                    setAssignNurseForm({ ...assignNurseForm, nurseId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="number"
                  required
                  value={assignNurseForm.roomNumber}
                  onChange={(e) =>
                    setAssignNurseForm({ ...assignNurseForm, roomNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">
                  A nurse can be assigned to a maximum of 4 rooms
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Assign Nurse
              </button>
            </form>
          </div>

          {/* Assign Room to Patient */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Room to Patient</h2>
            <form onSubmit={handleAssignPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient SSN</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={assignPatientForm.ssn}
                  onChange={(e) =>
                    setAssignPatientForm({ ...assignPatientForm, ssn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="number"
                  required
                  value={assignPatientForm.roomNumber}
                  onChange={(e) =>
                    setAssignPatientForm({ ...assignPatientForm, roomNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <input
                  type="text"
                  required
                  value={assignPatientForm.roomType}
                  onChange={(e) =>
                    setAssignPatientForm({ ...assignPatientForm, roomType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Room type must match the actual room type
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Assign Room
              </button>
            </form>
          </div>

          {/* Release Room */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Release Room</h2>
            <form onSubmit={handleReleaseRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="number"
                  required
                  value={releaseRoomForm.roomNumber}
                  onChange={(e) =>
                    setReleaseRoomForm({ roomNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Release Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

