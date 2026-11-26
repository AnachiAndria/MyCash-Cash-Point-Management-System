// src/screens/agent/AgentPayScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../../theme';

export default function AgentPayScreen() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* En-tête avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ma fiche de paie</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        
        {/* Carte principale (Fond vert foncé) */}
        <View style={styles.mainCard}>
          <Text style={styles.mainCardMonth}>Novembre 2026</Text>
          <Text style={styles.mainCardAmount}>162 352 Ar</Text>
          <Text style={styles.mainCardLabel}>Net à payer</Text>
        </View>

        {/* Détails des gains */}
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Repas <Text style={styles.rowSubLabel}>(3 000 Ar × 16 j)</Text></Text>
            <Text style={styles.rowValue}>48 000 Ar</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Salaire de base <Text style={styles.rowSubLabel}>(7 000 Ar × 16 j)</Text></Text>
            <Text style={styles.rowValue}>112 000 Ar</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Prime <Text style={styles.rowSubLabel}>(10 000 Ar × 2,5)</Text></Text>
            <Text style={styles.rowValue}>25 000 Ar</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.rowLabel}>Congé</Text>
            <Text style={styles.rowValue}>0 Ar</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total gains</Text>
            <Text style={styles.totalValue}>185 000 Ar</Text>
          </View>
        </View>

        {/* Détails des retenues */}
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Retenue sur écarts</Text>
            <Text style={[styles.rowValue, { color: colors.red }]}>-22 648 Ar</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total retenue</Text>
            <Text style={[styles.totalValue, { color: colors.red }]}>-22 648 Ar</Text>
          </View>
        </View>

        {/* Résumé Net à payer (Fond vert clair) */}
        <View style={styles.netCard}>
          <Text style={styles.netLabel}>Net à payer</Text>
          <Text style={styles.netValue}>162 352 Ar</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.cream,
    gap: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backIcon: { fontSize: 18, color: colors.textDark, fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.textDark },
  
  body: { padding: 20, paddingTop: 0, gap: 16 },
  
  mainCard: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: 24,
  },
  mainCardMonth: { color: colors.textOnDarkMuted, fontSize: 14, marginBottom: 8 },
  mainCardAmount: { color: colors.textOnDark, fontSize: 36, fontWeight: '700' },
  mainCardLabel: { color: colors.textOnDarkMuted, fontSize: 14, marginTop: 4 },

  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rowLabel: { fontSize: 15, color: colors.textDark },
  rowSubLabel: { fontSize: 13, color: colors.textMuted },
  rowValue: { fontSize: 15, fontWeight: '500', color: colors.textDark },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.textDark },
  totalValue: { fontSize: 15, fontWeight: '700', color: colors.textDark },

  netCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.jadeSoft,
    borderRadius: radius.lg,
    padding: 20,
    marginTop: 4,
  },
  netLabel: { fontSize: 16, fontWeight: '700', color: colors.ink },
  netValue: { fontSize: 22, fontWeight: '700', color: colors.jade },
});