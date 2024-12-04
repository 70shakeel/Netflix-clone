import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_ANON_KEY;

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
