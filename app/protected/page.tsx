import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="flex-1 flex flex-col gap-20 items-center">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl">This is a protected page</h1>
        <p>You can view this page because you are signed in.</p>
      </div>
    </div>
  )
}