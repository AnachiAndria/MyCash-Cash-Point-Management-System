// src/screens/gerant/GerantReportDetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, radius } from '../../theme';

export default function GerantReportDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Rapport du jour</Text>
          <Text style={styles.headerSub}>22 novembre 2026 · Analakely</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>PRODUITS</Text>
        <View style={styles.row}><Text style={styles.rowTitle}>T1000</Text><Text style={styles.rowValue}>8 vendus</Text></View>
        <View style={styles.row}><Text style={styles.rowTitle}>SIGARA</Text><Text style={styles.rowValue}>15 vendus</Text></View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>OPÉRATIONS MOBILE MONEY</Text>
        <View style={styles.row}>
          <View style={[styles.badgeCircle, { backgroundColor: colors.amberSoft }]}><Text style={{ color: colors.amber, fontWeight: '700', fontSize: 10 }}>OM</Text></View>
          <Text style={[styles.rowTitle, { flex: 1 }]}>Orange Money</Text>
          <Text style={styles.rowValue}>120 000 Ar</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.badgeCircle, { backgroundColor: colors.jadeSoft }]}><Text style={{ color: colors.jade, fontWeight: '700', fontSize: 10 }}>MV</Text></View>
          <Text style={[styles.rowTitle, { flex: 1 }]}>Mvola</Text>
          <Text style={styles.rowValue}>95 000 Ar</Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryLine}><Text style={styles.summaryLabel}>Total espèces compté</Text><Text style={styles.summaryValue}>342 500 Ar</Text></View>
          <View style={styles.summaryLine}><Text style={styles.summaryLabel}>Écart</Text><Text style={styles.summaryEcart}>0 Ar</Text></View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.btnOutlineText}>Signaler un écart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.goBack()}>
          <Text style={styles.btnPrimaryText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15, backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.border },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.borderLight, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', fontSize: 17, color: colors.textDark },
  headerSub: { fontSize: 12, color: colors.textMuted },
  body: { padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 16, marginBottom: 8, gap: 10 },
  rowTitle: { fontWeight: '600', fontSize: 14, color: colors.textDark },
  rowValue: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  badgeCircle: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  summary: { backgroundColor: colors.inkLight, borderRadius: radius.lg, padding: 16, marginTop: 20 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: colors.textOnDarkMuted, fontSize: 13 },
  summaryValue: { color: colors.textOnDark, fontWeight: '700', fontSize: 15 },
  summaryEcart: { color: colors.amber, fontWeight: '700', fontSize: 15 },
  footer: { flexDirection: 'row', gap: 10, padding: 20, backgroundColor: colors.card, borderTopWidth: 1, borderColor: colors.border },
  btnOutline: { flex: 1, borderWidth: 1.5, borderColor: colors.red, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnOutlineText: { color: colors.red, fontWeight: '600', fontSize: 14 },
  btnPrimary: { flex: 1, backgroundColor: colors.jade, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnPrimaryText: { color: colors.ink, fontWeight: '700', fontSize: 14 },
});