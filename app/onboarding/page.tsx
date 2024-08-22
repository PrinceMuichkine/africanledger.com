"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Onboarding() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            } else {
                router.push('/login'); // Redirect to login if no user
            }
        };

        getUser();
    }, [router, supabase.auth]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle onboarding form submission
        // You can update user profile or any other onboarding steps here
        router.push('/dashboard'); // Redirect to dashboard after onboarding
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome to Onboarding!</h1>
            <form onSubmit={handleSubmit}>
                {/* Add your onboarding form fields here */}
                <button type="submit">Complete Onboarding</button>
            </form>
        </div>
    );
}