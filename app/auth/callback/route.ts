import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  const { email } = await req.json(); // Parse the JSON body

  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Insert email into Supabase
  const { data, error } = await supabase
    .from('subscribe_emails')
    .insert([{ email }]);

  if (error) {
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }

  return NextResponse.json({ message: "You're in!" }, { status: 200 });
}