import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERMS - Emergency Room Management System',
  description: 'Emergency Room Management System Phase 4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

