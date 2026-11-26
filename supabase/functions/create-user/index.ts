// supabase/functions/create-user/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    // 1. On récupère les données envoyées par l'application
    const { email, password, full_name, phone, cash_point } = await req.json()

    // 2. On initialise le client "Admin" (qui a tous les droits grâce à la clé secrète)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. On crée l'utilisateur
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // On confirme l'email automatiquement
      user_metadata: { full_name, role: 'agent', phone, cash_point }
    })

    if (error) throw error

    // 4. On renvoie une réponse de succès
    return new Response(JSON.stringify({ user: data.user }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
    
  } catch (error) {
    // En cas d'erreur (ex: email déjà utilisé), on renvoie l'erreur
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})