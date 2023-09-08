'use client'
import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'
import React from 'react'

function Unauthenticated() {
  const session = useSession()

  if (session) {
    redirect('/')
  }

  return <p className="mt-40">로그인이 필요한 기능입니다!</p>
}

export default Unauthenticated
