'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function SymptomsPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [form, setForm] = useState({
    patientId: '',
    numDays: '',
    apptDate: '',
    apptTime: '',
    symptomType: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/symptoms/record', {
        ...form,
        numDays: parseInt(form.numDays),
      })
      setMessage({ type: 'success', text: 'Symptom recorded successfully!' })
      setForm({
        patientId: '',
        numDays: '',
        apptDate: '',
        apptTime: '',
        symptomType: '',
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to record symptom' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Record Symptom</h1>

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

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  required
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Days
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.numDays}
                  onChange={(e) => setForm({ ...form, numDays: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  required
                  value={form.apptDate}
                  onChange={(e) => setForm({ ...form, apptDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <input
                  type="time"
                  required
                  value={form.apptTime}
                  onChange={(e) => setForm({ ...form, apptTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Symptom Type</label>
                <input
                  type="text"
                  required
                  value={form.symptomType}
                  onChange={(e) => setForm({ ...form, symptomType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Fever, Headache, Nausea"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Record Symptom
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

