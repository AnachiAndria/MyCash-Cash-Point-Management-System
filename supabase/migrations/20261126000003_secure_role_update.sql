-- supabase/migrations/20261126000003_secure_role_update.sql
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- On autorise la modification si c'est le système (postgres) qui le fait (ex: script de migration)
  -- Sinon, on bloque.
  IF NEW.role <> OLD.role AND current_user NOT IN ('postgres', 'supabase_admin') THEN
    RAISE EXCEPTION 'Vous n''êtes pas autorisé à modifier le rôle.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_role_change ON public.profiles;
CREATE TRIGGER check_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.prevent_role_change();