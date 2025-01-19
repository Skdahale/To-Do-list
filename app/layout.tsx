import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TODO list',
  description: 'Develop a To-Do list application where users can create, read, update, delete the tasks user want to maintain on To-do work list.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
