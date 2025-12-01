'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function StaffPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Add Staff to Dept Form
  const [addStaffForm, setAddStaffForm] = useState({
    deptId: '',
    ssn: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    startdate: '',
    address: '',
    staffId: '',
    salary: '',
  })

  // Remove Staff from Dept Form
  const [removeStaffForm, setRemoveStaffForm] = useState({
    ssn: '',
    deptId: '',
  })

  // Manage Department Form
  const [manageDeptForm, setManageDeptForm] = useState({
    ssn: '',
    deptId: '',
  })

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/staff/add-to-dept', {
        ...addStaffForm,
        deptId: parseInt(addStaffForm.deptId),
        staffId: parseInt(addStaffForm.staffId),
        salary: parseInt(addStaffForm.salary),
      })
      setMessage({ type: 'success', text: 'Staff added to department successfully!' })
      setAddStaffForm({
        deptId: '',
        ssn: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        startdate: '',
        address: '',
        staffId: '',
        salary: '',
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to add staff to department' })
    }
  }

  const handleRemoveStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/staff/remove-from-dept', {
        ...removeStaffForm,
        deptId: parseInt(removeStaffForm.deptId),
      })
      setMessage({ type: 'success', text: 'Staff removed from department successfully!' })
      setRemoveStaffForm({ ssn: '', deptId: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to remove staff from department' })
    }
  }

  const handleManageDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/staff/manage-department', {
        ...manageDeptForm,
        deptId: parseInt(manageDeptForm.deptId),
      })
      setMessage({ type: 'success', text: 'Department manager assigned successfully!' })
      setManageDeptForm({ ssn: '', deptId: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to assign department manager' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Staff Management</h1>

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
          {/* Add Staff to Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Staff to Department</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="number"
                  required
                  value={addStaffForm.deptId}
                  onChange={(e) => setAddStaffForm({ ...addStaffForm, deptId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SSN</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={addStaffForm.ssn}
                  onChange={(e) => setAddStaffForm({ ...addStaffForm, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={addStaffForm.firstName}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={addStaffForm.lastName}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                <input
                  type="date"
                  required
                  value={addStaffForm.birthdate}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, birthdate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={addStaffForm.startdate}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, startdate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={addStaffForm.address}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                <input
                  type="number"
                  required
                  value={addStaffForm.staffId}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, staffId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={addStaffForm.salary}
                  onChange={(e) =>
                    setAddStaffForm({ ...addStaffForm, salary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Staff
              </button>
            </form>
          </div>

          {/* Remove Staff from Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Remove Staff from Department</h2>
            <form onSubmit={handleRemoveStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff SSN</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={removeStaffForm.ssn}
                  onChange={(e) => setRemoveStaffForm({ ...removeStaffForm, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="number"
                  required
                  value={removeStaffForm.deptId}
                  onChange={(e) =>
                    setRemoveStaffForm({ ...removeStaffForm, deptId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Remove Staff
              </button>
            </form>
          </div>

          {/* Manage Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Department Manager</h2>
            <form onSubmit={handleManageDepartment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff SSN</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={manageDeptForm.ssn}
                  onChange={(e) =>
                    setManageDeptForm({ ...manageDeptForm, ssn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="number"
                  required
                  value={manageDeptForm.deptId}
                  onChange={(e) =>
                    setManageDeptForm({ ...manageDeptForm, deptId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Assign Manager
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

