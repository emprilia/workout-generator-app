import { createClient } from '@supabase/supabase-js';

export const cypressSupabaseUrl = Cypress.env('CYPRESS_REACT_APP_SUPABASE_URL' ?? '');
export const cypressSupabaseAnonKey = Cypress.env('CYPRESS_REACT_APP_SUPABASE_ANON_KEY' ?? '');

export const supabase = createClient(cypressSupabaseUrl, cypressSupabaseAnonKey);
