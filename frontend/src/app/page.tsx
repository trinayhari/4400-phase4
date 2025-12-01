import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Home() {
  const sections = [
    { name: 'Views', href: '/views', description: 'View all database views' },
    { name: 'Patients', href: '/patients', description: 'Manage patients' },
    { name: 'Appointments', href: '/appointments', description: 'Book and manage appointments' },
    { name: 'Orders', href: '/orders', description: 'Place and complete orders' },
    { name: 'Staff', href: '/staff', description: 'Manage staff and departments' },
    { name: 'Rooms', href: '/rooms', description: 'Assign rooms and nurses' },
    { name: 'Symptoms', href: '/symptoms', description: 'Record patient symptoms' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Emergency Room Management System</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the ERMS dashboard. Select a section to get started.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">{section.name}</h2>
              <p className="text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

