// src/screens/gerant/GerantHomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, radius } from '../../theme';

export default function GerantHomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLabel}>Bonjour,</Text>
            <Text style={styles.headerTitle}>Rado Rakoto</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={{fontSize: 20}}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total encaissé aujourd'hui</Text>
          <Text style={styles.summaryAmount}>342 500 Ar</Text>
          <View style={styles.summaryRow}>
            <View><Text style={styles.summarySubLabel}>Cash points</Text><Text style={styles.summarySubValue}>6</Text></View>
            <View><Text style={styles.summarySubLabel}>Rapports reçus</Text><Text style={styles.summarySubValue}>5/6</Text></View>
            <View><Text style={styles.summarySubLabel}>Écarts</Text><Text style={[styles.summarySubValue, {color: colors.amber}]}>1</Text></View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mes cash points</Text>
          <TouchableOpacity><Text style={styles.seeAll}>Tout voir</Text></TouchableOpacity>
        </View>

        {/* Liste des cash points */}
        <TouchableOpacity style={styles.cpCard} onPress={() => navigation.navigate('GerantCashPointDetail')}>
          <View style={[styles.avatar, { backgroundColor: colors.jadeSoft }]}><Text style={[styles.avatarText, { color: colors.jade }]}>AB</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cpTitle}>Cash point Analakely</Text>
            <Text style={styles.cpSub}>Agent : Bako A. · 68 000 Ar</Text>
          </View>
          <View style={styles.badgeSuccess}><Text style={styles.badgeSuccessText}>Reçu</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cpCard}>
          <View style={[styles.avatar, { backgroundColor: colors.jadeSoft }]}><Text style={[styles.avatarText, { color: colors.jade }]}>TS</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cpTitle}>Cash point Tsaralalàna</Text>
            <Text style={styles.cpSub}>Agent : Sitraka N. · 54 200 Ar</Text>
          </View>
          <View style={styles.badgeSuccess}><Text style={styles.badgeSuccessText}>Reçu</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cpCard}>
          <View style={[styles.avatar, { backgroundColor: colors.amberSoft }]}><Text style={[styles.avatarText, { color: colors.amber }]}>67</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cpTitle}>Cash point 67 Ha</Text>
            <Text style={styles.cpSub}>Agent : Mialy R. · écart signalé</Text>
          </View>
          <View style={styles.badgeWarning}><Text style={styles.badgeWarningText}>Écart</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cpCard}>
          <View style={[styles.avatar, { backgroundColor: colors.borderLight }]}><Text style={[styles.avatarText, { color: colors.textMuted }]}>IV</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cpTitle}>Cash point Ivandry</Text>
            <Text style={styles.cpSub}>Agent : Herimanana T.</Text>
          </View>
          <View style={styles.badgePending}><Text style={styles.badgePendingText}>En attente</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('GerantReportDetail')}>
          <Text style={styles.reportBtnText}>Voir un rapport détaillé (Test)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { backgroundColor: colors.ink, padding: 24, paddingTop: 40, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLabel: { color: colors.textOnDarkMuted, fontSize: 13 },
  headerTitle: { color: colors.textOnDark, fontWeight: '700', fontSize: 22 },
  notifBtn: { backgroundColor: colors.inkLight, padding: 10, borderRadius: 12 },
  summaryCard: { backgroundColor: colors.inkLight, borderRadius: radius.xl, padding: 16 },
  summaryLabel: { color: colors.textOnDarkMuted, fontSize: 12, marginBottom: 4 },
  summaryAmount: { color: colors.textOnDark, fontWeight: '700', fontSize: 28, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summarySubLabel: { color: colors.textOnDarkMuted, fontSize: 11 },
  summarySubValue: { color: colors.textOnDark, fontWeight: '700', fontSize: 15 },
  body: { padding: 20, gap: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark },
  seeAll: { fontSize: 13, fontWeight: '600', color: colors.jade },
  cpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 12, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 15 },
  cpTitle: { fontWeight: '600', fontSize: 14, color: colors.textDark },
  cpSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  badgeSuccess: { backgroundColor: colors.jadeSoft, paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.pill },
  badgeSuccessText: { color: colors.jade, fontSize: 11, fontWeight: '700' },
  badgeWarning: { backgroundColor: colors.amberSoft, paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.pill },
  badgeWarningText: { color: colors.amber, fontSize: 11, fontWeight: '700' },
  badgePending: { backgroundColor: colors.borderLight, paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.pill },
  badgePendingText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  reportBtn: { marginTop: 20, backgroundColor: colors.ink, padding: 14, borderRadius: radius.md, alignItems: 'center' },
  reportBtnText: { color: colors.textOnDark, fontWeight: 'bold' },
});