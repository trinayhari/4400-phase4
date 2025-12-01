'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function PatientsPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Add Patient Form
  const [addPatientForm, setAddPatientForm] = useState({
    ssn: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    address: '',
    funds: '',
    contact: '',
  })

  // Add Funds Form
  const [addFundsForm, setAddFundsForm] = useState({
    ssn: '',
    funds: '',
  })

  // Remove Patient Form
  const [removePatientForm, setRemovePatientForm] = useState({
    ssn: '',
  })

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/patients/add', {
        ...addPatientForm,
        funds: parseInt(addPatientForm.funds),
      })
      setMessage({ type: 'success', text: 'Patient added successfully!' })
      setAddPatientForm({
        ssn: '',
        first_name: '',
        last_name: '',
        birthdate: '',
        address: '',
        funds: '',
        contact: '',
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to add patient' })
    }
  }

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/patients/add-funds', {
        ...addFundsForm,
        funds: parseInt(addFundsForm.funds),
      })
      setMessage({ type: 'success', text: 'Funds added successfully!' })
      setAddFundsForm({ ssn: '', funds: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to add funds' })
    }
  }

  const handleRemovePatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/patients/remove', removePatientForm)
      setMessage({ type: 'success', text: 'Patient removed successfully!' })
      setRemovePatientForm({ ssn: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to remove patient' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Patient Management</h1>

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
          {/* Add Patient */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SSN</label>
                <input
                  type="text"
                  required
                  value={addPatientForm.ssn}
                  onChange={(e) => setAddPatientForm({ ...addPatientForm, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={addPatientForm.first_name}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, first_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={addPatientForm.last_name}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, last_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                <input
                  type="date"
                  required
                  value={addPatientForm.birthdate}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, birthdate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={addPatientForm.address}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funds</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={addPatientForm.funds}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, funds: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={addPatientForm.contact}
                  onChange={(e) =>
                    setAddPatientForm({ ...addPatientForm, contact: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Patient
              </button>
            </form>
          </div>

          {/* Add Funds */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Funds</h2>
            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient SSN</label>
                <input
                  type="text"
                  required
                  value={addFundsForm.ssn}
                  onChange={(e) => setAddFundsForm({ ...addFundsForm, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={addFundsForm.funds}
                  onChange={(e) => setAddFundsForm({ ...addFundsForm, funds: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Add Funds
              </button>
            </form>
          </div>

          {/* Remove Patient */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Remove Patient</h2>
            <form onSubmit={handleRemovePatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient SSN</label>
                <input
                  type="text"
                  required
                  value={removePatientForm.ssn}
                  onChange={(e) => setRemovePatientForm({ ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Remove Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

