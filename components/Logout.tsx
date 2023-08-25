import { Logout as LogoutIcon } from 'tabler-icons-react'
import ButtonIcon from './ButtonIcon'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import SpinnerMini from './SpinnerMini'

function Logout() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()

    router.refresh()
    setIsLoading(false)
  }

  return (
    <div onClick={handleSignOut}>
      {!isLoading ? (
        <div className="flex">
          <LogoutIcon className="mr-4" />
          로그아웃
        </div>
      ) : (
        <SpinnerMini />
      )}
    </div>
  )
}

export default Logout
