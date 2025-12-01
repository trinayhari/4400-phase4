'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { callProcedure } from '@/lib/api'

export default function OrdersPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [orderType, setOrderType] = useState<'lab' | 'prescription'>('lab')

  // Place Order Form
  const [placeOrderForm, setPlaceOrderForm] = useState({
    ordernumber: '',
    priority: '',
    patientid: '',
    doctorid: '',
    cost: '',
    labtype: '',
    drug: '',
    dosage: '',
  })

  // Complete Orders Form
  const [completeOrdersForm, setCompleteOrdersForm] = useState({
    num_orders: '',
  })

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      const payload: any = {
        ordernumber: parseInt(placeOrderForm.ordernumber),
        priority: parseInt(placeOrderForm.priority),
        patientid: placeOrderForm.patientid,
        doctorid: placeOrderForm.doctorid,
        cost: parseInt(placeOrderForm.cost),
      }

      if (orderType === 'lab') {
        payload.labtype = placeOrderForm.labtype
        payload.drug = null
        payload.dosage = null
      } else {
        payload.labtype = null
        payload.drug = placeOrderForm.drug
        payload.dosage = parseInt(placeOrderForm.dosage)
      }

      await callProcedure('/api/orders/place', payload)
      setMessage({ type: 'success', text: 'Order placed successfully!' })
      setPlaceOrderForm({
        ordernumber: '',
        priority: '',
        patientid: '',
        doctorid: '',
        cost: '',
        labtype: '',
        drug: '',
        dosage: '',
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to place order' })
    }
  }

  const handleCompleteOrders = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await callProcedure('/api/orders/complete', {
        num_orders: parseInt(completeOrdersForm.num_orders),
      })
      setMessage({
        type: 'success',
        text: `${completeOrdersForm.num_orders} order(s) completed successfully!`,
      })
      setCompleteOrdersForm({ num_orders: '' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to complete orders' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Order Management</h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Place Order */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Place Order</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="lab"
                    checked={orderType === 'lab'}
                    onChange={(e) => setOrderType(e.target.value as 'lab' | 'prescription')}
                    className="mr-2"
                  />
                  Lab Work
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="prescription"
                    checked={orderType === 'prescription'}
                    onChange={(e) => setOrderType(e.target.value as 'lab' | 'prescription')}
                    className="mr-2"
                  />
                  Prescription
                </label>
              </div>
            </div>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={placeOrderForm.ordernumber}
                  onChange={(e) =>
                    setPlaceOrderForm({ ...placeOrderForm, ordernumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority (1-5)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="5"
                  value={placeOrderForm.priority}
                  onChange={(e) =>
                    setPlaceOrderForm({ ...placeOrderForm, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  required
                  value={placeOrderForm.patientid}
                  onChange={(e) =>
                    setPlaceOrderForm({ ...placeOrderForm, patientid: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                <input
                  type="text"
                  required
                  value={placeOrderForm.doctorid}
                  onChange={(e) =>
                    setPlaceOrderForm({ ...placeOrderForm, doctorid: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={placeOrderForm.cost}
                  onChange={(e) =>
                    setPlaceOrderForm({ ...placeOrderForm, cost: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {orderType === 'lab' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Type</label>
                  <input
                    type="text"
                    required
                    value={placeOrderForm.labtype}
                    onChange={(e) =>
                      setPlaceOrderForm({ ...placeOrderForm, labtype: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drug</label>
                    <input
                      type="text"
                      required
                      value={placeOrderForm.drug}
                      onChange={(e) =>
                        setPlaceOrderForm({ ...placeOrderForm, drug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={placeOrderForm.dosage}
                      onChange={(e) =>
                        setPlaceOrderForm({ ...placeOrderForm, dosage: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Complete Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Orders</h2>
            <form onSubmit={handleCompleteOrders} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Orders to Complete
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={completeOrdersForm.num_orders}
                  onChange={(e) =>
                    setCompleteOrdersForm({ num_orders: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Orders will be completed by priority (highest first), then by date (oldest first)
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Complete Orders
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

