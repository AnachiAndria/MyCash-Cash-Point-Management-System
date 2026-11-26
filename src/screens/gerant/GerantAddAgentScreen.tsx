// src/screens/gerant/GerantAddAgentScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import { colors, radius } from '../../theme';

export default function GerantAddAgentScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cashPoint, setCashPoint] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAgent = async () => {
    if (!fullName || !email || !password || !cashPoint) {
      return Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
    }

    setLoading(true);
    // Appel à l'Edge Function Supabase
    const { data, error } = await supabase.functions.invoke('create-user', {
      body: { email, password, full_name: fullName, phone, cash_point: cashPoint }
    });

    if (error || (data && data.error)) {
      Alert.alert('Erreur', error?.message || data.error || 'Impossible de créer le compte.');
    } else {
      Alert.alert('Succès', 'Le compte de l\'agent a été créé avec succès !');
      navigation.goBack(); // Retour à l'écran précédent
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvel Agent</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.description}>Créez un compte pour un nouvel agent et assignez-lui un cash point.</Text>

        <Text style={styles.label}>Nom complet *</Text>
        <TextInput style={styles.input} placeholder="Ex: Bako Andriantsoa" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Adresse Email *</Text>
        <TextInput style={styles.input} placeholder="agent@vola.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Mot de passe temporaire *</Text>
        <TextInput style={styles.input} placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />

        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput style={styles.input} placeholder="034 00 000 00" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Lieu / Nom du Cash Point *</Text>
        <TextInput style={styles.input} placeholder="Ex: Analakely" value={cashPoint} onChangeText={setCashPoint} />

        <TouchableOpacity style={styles.button} onPress={handleCreateAgent} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.textOnDark} /> : <Text style={styles.buttonText}>Créer le compte agent</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15, backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.border },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.borderLight, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', fontSize: 18, color: colors.textDark },
  body: { padding: 20, gap: 10 },
  description: { fontSize: 14, color: colors.textMuted, marginBottom: 10 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textDark, marginTop: 10 },
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, fontSize: 15, color: colors.textDark },
  button: { backgroundColor: colors.jade, borderRadius: radius.md, padding: 16, alignItems: 'center', marginTop: 30 },
  buttonText: { color: colors.ink, fontWeight: '700', fontSize: 15 },
});