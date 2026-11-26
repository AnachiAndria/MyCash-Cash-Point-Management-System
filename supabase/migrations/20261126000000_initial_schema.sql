-- Création du type pour les rôles
CREATE TYPE public.user_role AS ENUM ('gerant', 'agent');

-- Table des profils (liée à auth.users)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  role public.user_role DEFAULT 'agent'::public.user_role,
  phone text,
  cash_point text
);

-- Table des cash points (pour plus tard)
CREATE TABLE public.cashpoints (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  location text,
  current_agent_id uuid REFERENCES public.profiles(id)
);

-- Table des produits (pour plus tard)
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  purchase_price numeric DEFAULT 0,
  selling_price numeric DEFAULT 0
);

-- Table des rapports journaliers (pour plus tard)
CREATE TABLE public.reports (
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

-- Politiques RLS pour les profils
-- Un utilisateur peut lire son propre profil
CREATE POLICY "Lecture de son propre profil" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

-- Un utilisateur peut modifier son propre profil
CREATE POLICY "Modification de son propre profil" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Le gérant peut tout voir (on vérifie son rôle)
CREATE POLICY "Le gerant voit tout" ON public.profiles
  FOR ALL TO authenticated USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'gerant'
  );

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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();