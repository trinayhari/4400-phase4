import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            ERMS
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-200">Dashboard</Link>
            <Link href="/views" className="hover:text-blue-200">Views</Link>
            <Link href="/patients" className="hover:text-blue-200">Patients</Link>
            <Link href="/appointments" className="hover:text-blue-200">Appointments</Link>
            <Link href="/orders" className="hover:text-blue-200">Orders</Link>
            <Link href="/staff" className="hover:text-blue-200">Staff</Link>
            <Link href="/rooms" className="hover:text-blue-200">Rooms</Link>
            <Link href="/symptoms" className="hover:text-blue-200">Symptoms</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

