import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvgsdhhmmfbaywkynlow.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2Z3NkaGhtbWZiYXl3a3lubG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjY5MjQsImV4cCI6MjA5MDQwMjkyNH0.nDBxnSGq1q0hMm41srEJZpEgFMIyn5m9xWqQ-OoK4XE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)