// src/screens/gerant/GerantCashPointDetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../../theme';

export default function GerantCashPointDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Text>←</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Fiche du cash point</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.banner}>
          <View style={styles.bannerAvatar}><Text style={styles.bannerAvatarText}>AB</Text></View>
          <View>
            <Text style={styles.bannerTitle}>Cash point Analakely</Text>
            <Text style={styles.bannerSub}>Agent : Bako Andriantsoa</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridCard}><Text style={styles.gridLabel}>Ventes du jour</Text><Text style={styles.gridValue}>68 000 Ar</Text></View>
          <View style={styles.gridCard}><Text style={styles.gridLabel}>Écart</Text><Text style={[styles.gridValue, {color: colors.jade}]}>0 Ar</Text></View>
          <View style={styles.gridCard}><Text style={styles.gridLabel}>Bonus du mois</Text><Text style={styles.gridValue}>12 400 Ar</Text></View>
          <View style={styles.gridCard}><Text style={styles.gridLabel}>Rapports ce mois</Text><Text style={styles.gridValue}>21 / 22</Text></View>
        </View>

        <Text style={styles.sectionTitle}>ACTIVITÉ RÉCENTE</Text>
        <View style={styles.row}>
          <View><Text style={styles.rowTitle}>Rapport du 21 nov.</Text><Text style={styles.rowSub}>Envoyé à 18:40</Text></View>
          <View style={styles.badgeSuccess}><Text style={styles.badgeSuccessText}>Validé</Text></View>
        </View>
        <View style={styles.row}>
          <View><Text style={styles.rowTitle}>Rapport du 20 nov.</Text><Text style={styles.rowSub}>Envoyé à 19:02</Text></View>
          <View style={styles.badgeSuccess}><Text style={styles.badgeSuccessText}>Validé</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', fontSize: 18, color: colors.textDark },
  body: { paddingHorizontal: 20 },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.ink, borderRadius: radius.xl, padding: 20, gap: 15, marginBottom: 20 },
  bannerAvatar: { width: 56, height: 56, borderRadius: 16, backgroundColor: colors.jade, alignItems: 'center', justifyContent: 'center' },
  bannerAvatarText: { color: colors.ink, fontWeight: '700', fontSize: 20 },
  bannerTitle: { color: colors.textOnDark, fontWeight: '700', fontSize: 17 },
  bannerSub: { color: colors.textOnDarkMuted, fontSize: 13, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  gridCard: { flex: 1, minWidth: '45%', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 16 },
  gridLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 6 },
  gridValue: { fontSize: 18, fontWeight: '700', color: colors.textDark },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 16, marginBottom: 10 },
  rowTitle: { fontWeight: '600', fontSize: 14, color: colors.textDark },
  rowSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  badgeSuccess: { backgroundColor: colors.jadeSoft, paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.pill },
  badgeSuccessText: { color: colors.jade, fontSize: 11, fontWeight: '700' },
});