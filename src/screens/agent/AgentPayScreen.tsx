// src/screens/agent/AgentPayScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme';

export default function AgentPayScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ma fiche de paie</Text>
      <Text style={styles.subtitle}>Cette section sera disponible prochainement.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.textMuted },
});