import { createClient } from '@supabase/supabase-js';

// Placeholder Supabase configuration for Phase 2
// Currently inactive - will be enabled in Phase 2 with actual credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client (inactive in Phase 1)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Disabled for Phase 1
    autoRefreshToken: false, // Disabled for Phase 1
  }
});

// Placeholder types for future database schema
export interface DbSignature {
  id: string;
  user_id: string;
  name: string;
  signature_data: Record<string, unknown>;
  html_content: string;
  created_at: string;
  updated_at: string;
}

export interface DbUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Future Phase 2 functions (placeholder implementations)
export const signatureService = {
  // Get all signatures for a user
  async getUserSignatures(_userId: string): Promise<DbSignature[]> {
    // Phase 2: Implement with actual Supabase query
    console.warn('signatureService.getUserSignatures - Phase 2 feature');
    return [];
  },

  // Save a signature
  async saveSignature(_signature: Omit<DbSignature, 'id' | 'created_at' | 'updated_at'>): Promise<DbSignature | null> {
    // Phase 2: Implement with actual Supabase insert
    console.warn('signatureService.saveSignature - Phase 2 feature');
    return null;
  },

  // Update a signature
  async updateSignature(_id: string, _updates: Partial<DbSignature>): Promise<DbSignature | null> {
    // Phase 2: Implement with actual Supabase update
    console.warn('signatureService.updateSignature - Phase 2 feature');
    return null;
  },

  // Delete a signature
  async deleteSignature(_id: string): Promise<boolean> {
    // Phase 2: Implement with actual Supabase delete
    console.warn('signatureService.deleteSignature - Phase 2 feature');
    return false;
  }
};

export const authService = {
  // Sign in with email
  async signIn(_email: string, _password: string) {
    // Phase 2: Implement with actual Supabase auth
    console.warn('authService.signIn - Phase 2 feature');
    return null;
  },

  // Sign up with email
  async signUp(_email: string, _password: string) {
    // Phase 2: Implement with actual Supabase auth
    console.warn('authService.signUp - Phase 2 feature');
    return null;
  },

  // Sign out
  async signOut() {
    // Phase 2: Implement with actual Supabase auth
    console.warn('authService.signOut - Phase 2 feature');
    return null;
  },

  // Get current user
  async getCurrentUser() {
    // Phase 2: Implement with actual Supabase auth
    console.warn('authService.getCurrentUser - Phase 2 feature');
    return null;
  }
};
