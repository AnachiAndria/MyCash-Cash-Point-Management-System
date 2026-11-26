-- On remplace la fonction trigger pour qu'elle ignore le rôle demandé
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, phone, cash_point)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', 'Nouvel Agent'),
    'agent'::public.user_role, -- ⚠️ TOUJOURS 'agent' par défaut, peu importe ce qu'on envoie
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'cash_point'
  );
  RETURN new;
END;
$$;