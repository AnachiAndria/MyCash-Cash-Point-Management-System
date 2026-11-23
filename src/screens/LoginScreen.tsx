// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { colors, radius } from '../theme';

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState(''); // On garde l'email pour Supabase, mais le design affiche "Téléphone"
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      onLoginSuccess(); // Déclenche la redirection
    }
    setLoading(false);
  }

  // Boutons de création de compte (cachés en bas pour le dev)
  async function createTestUser(role: 'gerant' | 'agent') {
    setLoading(true);
    const testEmail = `${role}_test@demo.com`;
    const { error } = await supabase.auth.signUp({
      email: testEmail,
      password: 'password123',
      options: { data: { full_name: role === 'gerant' ? 'Rado Rakoto' : 'Agent Bako A.', role: role } }
    });
    if (error) Alert.alert('Erreur', error.message);
    else Alert.alert('Succès', `Compte ${role} créé ! Email: ${testEmail} / Mdp: password123`);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}><Text>💳</Text></View>
        <Text style={styles.brandText}>Vola+</Text>
      </View>

      <Text style={styles.title}>Bon retour</Text>
      <Text style={styles.subtitle}>Connectez-vous pour gérer vos cash points</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email (ou téléphone)</Text>
        <TextInput
          style={styles.input}
          placeholder="votre@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.textOnDark} /> : <Text style={styles.buttonText}>Se connecter</Text>}
        </TouchableOpacity>
        
        {/* Boutons de test pour la démo */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
           <TouchableOpacity onPress={() => createTestUser('gerant')}><Text style={{color: colors.jade, fontSize: 12}}>+ Créer Gérant</Text></TouchableOpacity>
           <TouchableOpacity onPress={() => createTestUser('agent')}><Text style={{color: colors.jade, fontSize: 12}}>+ Créer Agent</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.operators}>
        <Text style={styles.pill}>Orange Money</Text>
        <Text style={styles.pill}>Mvola</Text>
        <Text style={styles.pill}>Airtel</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: 24, justifyContent: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40 },
  brandIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: colors.jade, alignItems: 'center', justifyContent: 'center' },
  brandText: { fontWeight: '700', fontSize: 20, color: colors.ink },
  title: { fontSize: 26, fontWeight: '700', color: colors.ink, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 28 },
  form: { gap: 14 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textMuted, marginBottom: 2 },
  input: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.md, padding: 14, fontSize: 15, color: colors.textDark },
  forgot: { alignSelf: 'flex-end', color: colors.jade, fontWeight: '600', fontSize: 13 },
  button: { backgroundColor: colors.ink, borderRadius: radius.md, padding: 15, alignItems: 'center', marginTop: 8 },
  buttonText: { color: colors.textOnDark, fontWeight: '700', fontSize: 15 },
  operators: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 50 },
  pill: { fontSize: 11, fontWeight: '600', color: colors.textMuted, backgroundColor: '#EFEADC', paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.pill, overflow: 'hidden' },
});