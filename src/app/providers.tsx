'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Header from '@components/Header'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Database } from 'types/supabase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  )

  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>(),
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ToastContainer
          role="alert"
          position="top-center"
          autoClose={3000}
          hideProgressBar
        />
      </QueryClientProvider>
    </SessionContextProvider>
  )
}
