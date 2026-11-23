// src/screens/gerant/GerantSettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors, radius } from '../../theme';
import { supabase } from '../../../lib/supabase'; // Import de Supabase

export default function GerantSettingsScreen() {
  
  // Fonction pour se déconnecter
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Erreur', error.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paramétrage</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>PRIX DES PRODUITS</Text>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.rowText}>T1000</Text><Text style={styles.rowValue}>PV: 1 000 Ar</Text></View>
          <View style={styles.row}><Text style={styles.rowText}>FIRST</Text><Text style={styles.rowValue}>PV: 200 Ar</Text></View>
          <View style={styles.row}><Text style={styles.rowText}>SIGARA</Text><Text style={styles.rowValue}>PV: 300 Ar</Text></View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>BARÈMES DE BONUS</Text>
        <View style={styles.card}>
          <Text style={styles.rowText}>Orange Money (OM)</Text>
          <Text style={styles.rowSubText}>Tranche 1 : 0 - 50k → 200 Ar</Text>
          <Text style={styles.rowSubText}>Tranche 2 : 50k - 100k → 500 Ar</Text>
        </View>

        {/* BOUTON DE DÉCONNEXION */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textDark },
  body: { padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 10 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  rowText: { fontWeight: '600', fontSize: 14, color: colors.textDark },
  rowValue: { fontWeight: '600', fontSize: 14, color: colors.jade },
  rowSubText: { fontSize: 13, color: colors.textMuted, marginTop: 6 },
  
  // Styles du bouton de déconnexion
  logoutButton: { 
    marginTop: 40, 
    backgroundColor: colors.redSoft, 
    borderWidth: 1, 
    borderColor: colors.red, 
    padding: 16, 
    borderRadius: radius.md, 
    alignItems: 'center' 
  },
  logoutText: { 
    color: colors.red, 
    fontWeight: '700', 
    fontSize: 15 
  },
});