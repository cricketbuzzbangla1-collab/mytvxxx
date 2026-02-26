import './globals.css'
import { Inter } from 'next/font/google'
import { SWRConfig } from 'swr'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
  },
})

export const metadata = {
  title: 'Live TV - Watch Free Live TV Channels Online',
  description: 'Watch live TV channels from around the world for free. HD quality streaming with multiple player options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SWRConfig value={{ refreshInterval: 30000 }}>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#0e2d4a',
                  color: '#fff',
                },
              }}
            />
          </SWRConfig>
        </QueryClientProvider>
      </body>
    </html>
  )
}
