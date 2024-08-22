import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

export default async function OnboardingPage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to Onboarding!</h1>
                <p className="mb-4">Hello, {user.email}! Let's get you set up.</p>
                {/* Add your onboarding form or steps here */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {/* Handle onboarding completion */ }}
                >
                    Complete Onboarding
                </button>
            </main>
            <Footer />
        </div>
    )
}