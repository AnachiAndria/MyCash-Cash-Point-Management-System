// SplashScreen.js
// Interface : COMMUNE (affichée avant la connexion, pour Agent et Gérant)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoIcon}>💳</Text>
      </View>
      <Text style={styles.title}>
        Vola<Text style={{ color: colors.amber }}>+</Text>
      </Text>
      <Text style={styles.subtitle}>Gestion de vos cash points</Text>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: colors.jade,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logoIcon: { fontSize: 36 },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textOnDark,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textOnDarkMuted,
    marginTop: 6,
  },
  dots: {
    position: 'absolute',
    bottom: 56,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.inkLight,
  },
  dotActive: { width: 22, backgroundColor: colors.jade },
});
