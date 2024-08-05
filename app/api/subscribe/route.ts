import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a named function for the POST method
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json(); // Parse JSON body

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('subscribe_emails')
      .insert([{ email }]);

    if (error) {
      return NextResponse.json({ error: "Submission failed." }, { status: 500 });
    }

    return NextResponse.json({ message: "You're in!" }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}