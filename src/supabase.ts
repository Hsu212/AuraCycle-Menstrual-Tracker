import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjjdkxifozdtcqhnvwoq.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqamRreGlmb3pkdGNxaG52d29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTkxMjMsImV4cCI6MjA3MzkzNTEyM30.9b3t5TOdi41hw1HkTge7kg8ise9-xrAwvW2WX-_cY6Q'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);