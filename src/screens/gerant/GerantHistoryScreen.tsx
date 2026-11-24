// src/screens/gerant/GerantHistoryScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../../theme';

export default function GerantHistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historique</Text>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterOn}><Text style={styles.filterOnText}>Tout</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterOff}><Text style={styles.filterText}>Dépôt</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterOff}><Text style={styles.filterText}>Retrait</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterOff}><Text style={styles.filterText}>Rapports</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.dateLabel}>Aujourd'hui</Text>
        
        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: colors.jadeSoft }]}><Text style={{ color: colors.jade }}>↑</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.rowTitle}>Dépôt Mvola</Text><Text style={styles.rowSub}>Analakely · 14:02</Text></View>
          <Text style={{ color: colors.jade, fontWeight: '700' }}>+95 000 Ar</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: colors.redSoft }]}><Text style={{ color: colors.red }}>↓</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.rowTitle}>Retrait Orange Money</Text><Text style={styles.rowSub}>67 Ha · 12:47</Text></View>
          <Text style={{ color: colors.textDark, fontWeight: '700' }}>-120 000 Ar</Text>
        </View>

        <Text style={styles.dateLabel}>Hier</Text>

        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: colors.jadeSoft }]}><Text style={{ color: colors.jade }}>↑</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.rowTitle}>Dépôt Airtel Money</Text><Text style={styles.rowSub}>Ivandry · 17:30</Text></View>
          <Text style={{ color: colors.jade, fontWeight: '700' }}>+60 000 Ar</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textDark },
  filters: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  filterOn: { backgroundColor: colors.ink, paddingVertical: 8, paddingHorizontal: 16, borderRadius: radius.pill },
  filterOnText: { color: colors.textOnDark, fontWeight: '600', fontSize: 13 },
  filterOff: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, paddingVertical: 8, paddingHorizontal: 16, borderRadius: radius.pill },
  filterText: { color: colors.textDark, fontWeight: '600', fontSize: 13 },
  body: { paddingHorizontal: 20 },
  dateLabel: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginBottom: 10, marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 16, gap: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontWeight: '600', fontSize: 15, color: colors.textDark },
  rowSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});