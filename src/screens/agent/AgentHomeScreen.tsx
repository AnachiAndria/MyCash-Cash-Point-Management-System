// src/screens/agent/AgentHomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../../theme';
import { supabase } from '../../../lib/supabase';

interface AgentHomeScreenProps {
  onNewReport: () => void;
  profile: any;
}

export default function AgentHomeScreen({ onNewReport, profile }: AgentHomeScreenProps) {
  
  const confirmLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Non", style: "cancel" },
        { text: "Oui", onPress: async () => { await supabase.auth.signOut(); } }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Modifications ici : flexDirection, justifyContent, alignItems, et flex sur le View du texte */}
        <View style={styles.headerTop}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerLabel}>Cash point</Text>
            <Text style={styles.headerTitle}>
              {profile?.cash_point || 'Non défini'} · {profile?.full_name || 'Agent'}
            </Text>
          </View>
          
          <TouchableOpacity onPress={confirmLogout} style={styles.logoutBtn}>
             <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total encaissé aujourd'hui</Text>
          <Text style={styles.summaryAmount}>68 000 Ar</Text>
          <Text style={styles.summaryStatus}>Rapport pas encore envoyé</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity style={styles.cta} onPress={onNewReport}>
          <Text style={styles.ctaText}>＋  Nouveau rapport journalier</Text>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statLabel}>Stock produits restant</Text><Text style={styles.statValue}>612 unités</Text></View>
          <View style={styles.statCard}><Text style={styles.statLabel}>Rapports envoyés (mois)</Text><Text style={styles.statValue}>21 / 22</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Mes derniers rapports</Text>
        {[{ date: '21 novembre', heure: '18:40' }, { date: '20 novembre', heure: '19:02' }].map((r) => (
          <View key={r.date} style={styles.reportRow}>
            <View><Text style={styles.reportDate}>{r.date}</Text><Text style={styles.reportTime}>Envoyé à {r.heure}</Text></View>
            <Text style={styles.badge}>Validé</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { backgroundColor: colors.ink, padding: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  
  // --- NOUVEAUX STYLES POUR L'EN-TÊTE ---
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // Aligne les éléments en haut
    marginBottom: 16 
  },
  headerTextContainer: { 
    flex: 1, // Permet au texte de prendre l'espace disponible
    marginRight: 15 // Laisse un peu d'espace entre le texte et le bouton
  },
  headerLabel: { color: colors.textOnDarkMuted, fontSize: 12 },
  headerTitle: { 
    color: colors.textOnDark, 
    fontWeight: '700', 
    fontSize: 19, 
    flexWrap: 'wrap' // Permet au texte long de passer à la ligne
  },
  logoutBtn: {
    padding: 10, 
    backgroundColor: colors.inkLight, 
    borderRadius: 8, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: colors.textOnDark, 
    fontSize: 11,
    fontWeight: 'bold'
  },
  // --------------------------------------

  summaryCard: { backgroundColor: colors.inkLight, borderRadius: radius.xl, padding: 16 },
  summaryLabel: { color: colors.textOnDarkMuted, fontSize: 12, marginBottom: 4 },
  summaryAmount: { color: colors.textOnDark, fontWeight: '700', fontSize: 26 },
  summaryStatus: { color: colors.jade, fontSize: 12, fontWeight: '600', marginTop: 6 },
  body: { padding: 20, gap: 14 },
  cta: { backgroundColor: colors.jade, borderRadius: radius.lg, padding: 16, alignItems: 'center' },
  ctaText: { color: colors.ink, fontWeight: '700', fontSize: 15 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 12 },
  statLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 4 },
  statValue: { fontWeight: '700', fontSize: 16, color: colors.textDark },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginTop: 6 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 12 },
  reportDate: { fontWeight: '600', fontSize: 13, color: colors.textDark },
  reportTime: { fontSize: 11, color: colors.textMuted },
  badge: { fontSize: 11, fontWeight: '700', color: colors.jade, backgroundColor: colors.jadeSoft, paddingVertical: 4, paddingHorizontal: 9, borderRadius: radius.pill, overflow: 'hidden' },
});