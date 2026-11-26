-- supabase/migrations/20261126000001_bootstrap_admin.sql
DO $$
DECLARE
  v_admin_email TEXT := 'admin@vola.mg'; 
  v_admin_password TEXT := 'ChangeMe123!'; 
  v_admin_name TEXT := 'Administrateur Vola+';
  v_user_id UUID;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_admin_email) THEN
    
    v_user_id := gen_random_uuid();

    -- 1. Créer l'utilisateur avec TOUS les champs requis par Supabase Auth
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, 
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data, 
      created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated', 
      v_admin_email, extensions.crypt(v_admin_password, extensions.gen_salt('bf')), NOW(), 
      '{"provider":"email","providers":["email"]}', 
      jsonb_build_object('full_name', v_admin_name),
      NOW(), NOW(), '', '', '', ''
    );

    -- 2. Créer l'identité (Crucial pour la connexion)
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    )
    VALUES (
      gen_random_uuid(), v_user_id, format('{"sub": "%s", "email": "%s"}', v_user_id, v_admin_email)::jsonb, 
      'email', v_user_id, NOW(), NOW(), NOW()
    );

    -- 3. Mettre à jour le profil (le trigger l'a créé en 'agent', on le passe en 'gerant')
    -- On utilise une commande spéciale pour contourner le trigger de sécurité s'il existe
    ALTER TABLE public.profiles DISABLE TRIGGER check_role_change;
    
    UPDATE public.profiles 
    SET role = 'gerant'::public.user_role, full_name = v_admin_name
    WHERE id = v_user_id;
    
    ALTER TABLE public.profiles ENABLE TRIGGER check_role_change;
    
    RAISE NOTICE 'Compte Admin bootstrap créé avec succès pour %', v_admin_email;
  END IF;
END $$;