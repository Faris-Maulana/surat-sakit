-- Schema for surat-sakit app

-- Institution types enum
CREATE TYPE institution_type AS ENUM ('rumah_sakit', 'puskesmas', 'klinik');

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type institution_type NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  maps_url TEXT,
  logo_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved letters history
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_number TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES institutions(id),
  patient_name TEXT NOT NULL,
  patient_nik TEXT,
  patient_birth_place TEXT,
  patient_birth_date DATE,
  patient_gender TEXT,
  patient_address TEXT,
  patient_occupation TEXT,
  keluhan TEXT,
  diagnosis TEXT,
  icd_code TEXT,
  rest_start_date DATE,
  rest_end_date DATE,
  doctor_name TEXT,
  doctor_sip TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Storage bucket for institution logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Row-level security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Public read for institutions
CREATE POLICY "Public can read institutions" 
  ON institutions FOR SELECT USING (true);

-- Public read for letters (or you can restrict later)
CREATE POLICY "Public can read letters" 
  ON letters FOR SELECT USING (true);

CREATE POLICY "Public can insert letters" 
  ON letters FOR INSERT WITH CHECK (true);
