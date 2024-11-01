'use client'

import { ThemeProvider } from 'next-themes'

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" storageKey="theme" enableSystem>
      {children}
    </ThemeProvider>
  )
}