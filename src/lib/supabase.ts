import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjxqhclvprvhprtktwjm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeHFoY2x2cHJ2aHBydGt0d2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjg4MTMsImV4cCI6MjA3NjgwNDgxM30.OTK3qpHqUPi9Kh3pCvM00BhS3c8Kt6x0fqY1UyMWe2g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          image: string;
          count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          image: string;
          count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image?: string;
          count?: number;
          created_at?: string;
        };
      };
      machinery: {
        Row: {
          id: number;
          name: string;
          category: string;
          image: string;
          daily_rate: number;
          weekly_rate: number;
          monthly_rate: number;
          description: string;
          specifications: string[];
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          category: string;
          image: string;
          daily_rate: number;
          weekly_rate: number;
          monthly_rate: number;
          description: string;
          specifications: string[];
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          category?: string;
          image?: string;
          daily_rate?: number;
          weekly_rate?: number;
          monthly_rate?: number;
          description?: string;
          specifications?: string[];
          featured?: boolean;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          machine_id: number;
          machine_name: string;
          customer_name: string;
          company: string | null;
          phone: string;
          email: string;
          job_site: string;
          start_date: string;
          end_date: string;
          delivery_option: 'delivery' | 'pickup';
          extras: string[];
          notes: string | null;
          status: 'pending' | 'approved' | 'declined';
          total_cost: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          machine_id: number;
          machine_name: string;
          customer_name: string;
          company?: string | null;
          phone: string;
          email: string;
          job_site: string;
          start_date: string;
          end_date: string;
          delivery_option: 'delivery' | 'pickup';
          extras: string[];
          notes?: string | null;
          status?: 'pending' | 'approved' | 'declined';
          total_cost: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          machine_id?: number;
          machine_name?: string;
          customer_name?: string;
          company?: string | null;
          phone?: string;
          email?: string;
          job_site?: string;
          start_date?: string;
          end_date?: string;
          delivery_option?: 'delivery' | 'pickup';
          extras?: string[];
          notes?: string | null;
          status?: 'pending' | 'approved' | 'declined';
          total_cost?: number;
          created_at?: string;
        };
      };
    };
  };
};