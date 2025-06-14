import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserPreferences = {
  id: string;
  user_id: string;
  slang_terms: string[];
  formality_level: 'casual' | 'semi-formal' | 'formal';
  custom_replacements: Record<string, string>;
  created_at: string;
  updated_at: string;
};

export type SpellCheckResult = {
  corrected_message: string;
  detected_slang: string[];
  replaced_slurs: string[];
  suggested_alternatives: string[];
  formality_level: 'casual' | 'semi-formal' | 'formal';
}; 