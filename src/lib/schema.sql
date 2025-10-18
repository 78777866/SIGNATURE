-- Email Signature Generator Database Schema
-- Phase 2: Supabase Database Tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Signatures table
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  signature_data JSONB NOT NULL,
  html_content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  template_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public templates table (for creator platform)
CREATE TABLE IF NOT EXISTS public.template_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  signature_data JSONB NOT NULL,
  html_content TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  downloads_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Template ratings table
CREATE TABLE IF NOT EXISTS public.template_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES public.template_signatures(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(template_id, user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON public.signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_signatures_created_at ON public.signatures(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_template_signatures_category ON public.template_signatures(category);
CREATE INDEX IF NOT EXISTS idx_template_signatures_rating ON public.template_signatures(rating DESC);
CREATE INDEX IF NOT EXISTS idx_template_signatures_downloads ON public.template_signatures(downloads_count DESC);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_ratings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Signatures policies
CREATE POLICY "Users can manage their own signatures" ON public.signatures
  FOR ALL USING (auth.uid() = user_id);

-- Template signatures policies (public read, creator manage)
CREATE POLICY "Anyone can view approved templates" ON public.template_signatures
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Creators can manage their own templates" ON public.template_signatures
  FOR ALL USING (auth.uid() = creator_id);

-- Template ratings policies
CREATE POLICY "Users can manage their own ratings" ON public.template_ratings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view ratings for approved templates" ON public.template_ratings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.template_signatures 
      WHERE id = template_id AND is_approved = TRUE
    )
  );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_signatures_updated_at BEFORE UPDATE ON public.signatures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_template_signatures_updated_at BEFORE UPDATE ON public.template_signatures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update template rating average
CREATE OR REPLACE FUNCTION update_template_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.template_signatures
  SET rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM public.template_ratings
    WHERE template_id = COALESCE(NEW.template_id, OLD.template_id)
  )
  WHERE id = COALESCE(NEW.template_id, OLD.template_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger to update ratings
CREATE TRIGGER update_template_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.template_ratings
  FOR EACH ROW EXECUTE FUNCTION update_template_rating();