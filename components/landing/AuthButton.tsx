"use client"

import { supabase } from '../../utils/supabase/client'; // Adjust the path as necessary
import { signOut } from '../../utils/actions/signOut';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js'; // Import User type

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null); // Define user state type

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user); // Set user state
    };
    fetchUser();
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form onSubmit={async (e) => { e.preventDefault(); await signOut(); }}>
        <button type="submit" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-4 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300" // Updated styles
    >
      Login
    </Link>
  );
}