-- Création du type pour les rôles (sécurisé)
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('gerant', 'agent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Table des profils
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  role public.user_role DEFAULT 'agent'::public.user_role,
  phone text,
  cash_point text
);

-- Table des cash points
CREATE TABLE IF NOT EXISTS public.cashpoints (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  location text,
  current_agent_id uuid REFERENCES public.profiles(id)
);

-- Table des produits
CREATE TABLE IF NOT EXISTS public.products (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  purchase_price numeric DEFAULT 0,
  selling_price numeric DEFAULT 0
);

-- Table des rapports journaliers
CREATE TABLE IF NOT EXISTS public.reports (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agent_id uuid REFERENCES public.profiles(id) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text DEFAULT 'brouillon',
  total_sales numeric DEFAULT 0,
  total_bonus numeric DEFAULT 0,
  ecart numeric DEFAULT 0
);

-- Activer la sécurité RLS sur les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Fonction sécurisée pour éviter la boucle infinie (SECURITY DEFINER contourne le RLS)
CREATE OR REPLACE FUNCTION public.is_gerant()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'gerant'
  );
$$;

-- Politiques RLS pour la table profiles
DROP POLICY IF EXISTS "Lecture de son propre profil" ON public.profiles;
CREATE POLICY "Lecture de son propre profil" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Modification de son propre profil" ON public.profiles;
CREATE POLICY "Modification de son propre profil" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Le gerant voit tout" ON public.profiles;
CREATE POLICY "Le gerant voit tout" ON public.profiles
  FOR ALL TO authenticated USING ( public.is_gerant() );

-- Trigger pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, phone, cash_point)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    COALESCE((new.raw_user_meta_data ->> 'role')::public.user_role, 'agent'::public.user_role),
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'cash_point'
  );
  RETURN new;
END;
$$;

-- On supprime le trigger s'il existe déjà avant de le recréer
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();