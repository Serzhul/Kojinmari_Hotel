'use client'
import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'

function Unauthenticated() {
  const session = useSession()

  if (session) {
    redirect('/')
  }

  redirect('/login')
}

export default Unauthenticated
