// src/screens/agent/AgentReportScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { colors, radius } from '../../theme';

const PRODUCTS = [
  { key: 'T1000', stock: 20, pv: 1000, vendu: '17' },
  { key: 'FIRST', stock: 200, pv: 200, vendu: '198' },
  { key: 'NEWS MENA', stock: 200, pv: 225, vendu: '187' },
];

const MOBILE_MONEY = [
  { key: 'OM', label: 'Orange Money', montant: '120000', color: colors.amber, bg: colors.amberSoft },
  { key: 'MV', label: 'Mvola', montant: '95000', color: colors.jade, bg: colors.jadeSoft },
  { key: 'AM', label: 'Airtel Money', montant: '60000', color: colors.red, bg: colors.redSoft },
];

const TABS = ['Mobile money', 'Produits', 'Caisse'];

// 1. On définit le type des props
interface AgentReportScreenProps {
  onSave?: (data: any) => void;
  onSubmit?: (data: any) => void;
}

// 2. On applique le type
export default function AgentReportScreen({ onSave, onSubmit }: AgentReportScreenProps) {
  const [tab, setTab] = useState('Produits');
  const [qty, setQty] = useState<Record<string, string>>(Object.fromEntries(PRODUCTS.map((p) => [p.key, p.vendu])));
  const [mm, setMm] = useState<Record<string, string>>(Object.fromEntries(MOBILE_MONEY.map((m) => [m.key, m.montant])));

  return (
    <SafeAreaView style={styles.container}>
       {/* ... (Le reste de ton code JSX reste identique) ... */}
       <View style={styles.header}>
        <Text style={styles.headerTitle}>Rapport du jour</Text>
        <Text style={styles.headerSub}>22 nov. 2026 · Cash point Analakely</Text>

        <View style={styles.tabs}>
          {TABS.map((t) => (
            <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabOn]} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextOn]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {tab === 'Produits' && (
          <>
            <Text style={styles.sectionTitle}>Recharges &amp; cartes · stock et ventes du jour</Text>
            {PRODUCTS.map((p) => (
              <View key={p.key} style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{p.key}</Text>
                  <Text style={styles.rowSub}>Stock {p.stock} · PV {p.pv} Ar</Text>
                </View>
                <TextInput style={styles.qtyInput} keyboardType="numeric" value={qty[p.key]} onChangeText={(v) => setQty({ ...qty, [p.key]: v })} />
              </View>
            ))}
          </>
        )}

        {tab === 'Mobile money' && (
          <>
            <Text style={styles.sectionTitle}>Opérations mobile money du jour</Text>
            {MOBILE_MONEY.map((m) => (
              <View key={m.key} style={styles.row}>
                <View style={[styles.badgeCircle, { backgroundColor: m.bg }]}>
                  <Text style={{ color: m.color, fontWeight: '700', fontSize: 10 }}>{m.key}</Text>
                </View>
                <Text style={[styles.rowTitle, { flex: 1 }]}>{m.label}</Text>
                <TextInput style={[styles.qtyInput, { width: 90 }]} keyboardType="numeric" value={mm[m.key]} onChangeText={(v) => setMm({ ...mm, [m.key]: v })} />
              </View>
            ))}
          </>
        )}

        {tab === 'Caisse' && (
          <>
            <Text style={styles.sectionTitle}>Mouvements de caisse</Text>
            {['Espèces', 'Décaissement', 'Achat', 'Encaissement'].map((c) => (
              <View key={c} style={styles.row}>
                <Text style={[styles.rowTitle, { flex: 1 }]}>{c}</Text>
                <TextInput style={[styles.qtyInput, { width: 90 }]} keyboardType="numeric" placeholder="0" />
              </View>
            ))}
          </>
        )}

        <View style={styles.summary}>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Revenu total</Text>
            <Text style={styles.summaryValue}>36 528 Ar</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Écart</Text>
            <Text style={styles.summaryEcart}>0 Ar</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSave && onSave({ qty, mm })}>
          <Text style={styles.btnOutlineText}>Enregistrer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => onSubmit && onSubmit({ qty, mm })}>
          <Text style={styles.btnPrimaryText}>Envoyer le rapport</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... (Les styles restent identiques)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.border, padding: 20, paddingBottom: 12 },
  headerTitle: { fontWeight: '700', fontSize: 17, color: colors.textDark },
  headerSub: { fontSize: 12, color: colors.textMuted, marginBottom: 12 },
  tabs: { flexDirection: 'row', backgroundColor: colors.borderLight, padding: 4, borderRadius: 11, gap: 6 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9 },
  tabOn: { backgroundColor: colors.ink },
  tabText: { fontSize: 12, fontWeight: '700', color: '#53615B' },
  tabTextOn: { color: colors.textOnDark },
  body: { padding: 20, gap: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 12 },
  rowTitle: { fontWeight: '600', fontSize: 13, color: colors.textDark },
  rowSub: { fontSize: 11, color: colors.textMuted },
  qtyInput: { width: 60, textAlign: 'right', borderWidth: 1.3, borderColor: colors.border, borderRadius: 9, padding: 8, fontSize: 13 },
  badgeCircle: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  summary: { backgroundColor: colors.inkLight, borderRadius: radius.lg, padding: 14, marginTop: 8 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  summaryLabel: { color: colors.textOnDarkMuted, fontSize: 13 },
  summaryValue: { color: colors.textOnDark, fontWeight: '600', fontSize: 13 },
  summaryEcart: { color: colors.amber, fontWeight: '700', fontSize: 13 },
  footer: { flexDirection: 'row', gap: 10, padding: 20, backgroundColor: colors.card, borderTopWidth: 1, borderColor: colors.border },
  btnOutline: { flex: 1, borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnOutlineText: { color: colors.textDark, fontWeight: '600', fontSize: 14 },
  btnPrimary: { flex: 1, backgroundColor: colors.jade, borderRadius: radius.md, padding: 14, alignItems: 'center' },
  btnPrimaryText: { color: colors.ink, fontWeight: '700', fontSize: 14 },
});