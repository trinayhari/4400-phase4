'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { fetchView } from '@/lib/api'

interface ViewData {
  [key: string]: any
}

export default function ViewsPage() {
  const [views, setViews] = useState<{ [key: string]: ViewData[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadViews = async () => {
      try {
        setLoading(true)
        const [roomWise, symptoms, medicalStaff, departments, charges] = await Promise.all([
          fetchView('room-wise'),
          fetchView('symptoms-overview'),
          fetchView('medical-staff'),
          fetchView('departments'),
          fetchView('outstanding-charges'),
        ])

        setViews({
          'room-wise': roomWise.data || [],
          'symptoms-overview': symptoms.data || [],
          'medical-staff': medicalStaff.data || [],
          'departments': departments.data || [],
          'outstanding-charges': charges.data || [],
        })
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to load views')
      } finally {
        setLoading(false)
      }
    }

    loadViews()
  }, [])

  const renderTable = (title: string, data: ViewData[], key: string) => {
    if (!data || data.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-500">No data available</p>
        </div>
      )
    }

    const columns = Object.keys(data[0])

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row[col]?.toString() || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading views...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Database Views</h1>
        {renderTable('Room Wise View', views['room-wise'], 'room-wise')}
        {renderTable('Symptoms Overview View', views['symptoms-overview'], 'symptoms')}
        {renderTable('Medical Staff View', views['medical-staff'], 'medical-staff')}
        {renderTable('Department View', views['departments'], 'departments')}
        {renderTable('Outstanding Charges View', views['outstanding-charges'], 'charges')}
      </div>
    </div>
  )
}

