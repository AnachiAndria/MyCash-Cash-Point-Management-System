// src/theme.ts
export const colors = {
  ink: '#0E2A24',        
  inkLight: '#143A32',   
  jade: '#1FAA6D',       
  jadeSoft: '#E7F5EC',   
  amber: '#E7A33E',      
  amberSoft: '#FCEFDD',
  red: '#D9534F',
  redSoft: '#FBE9E9',
  cream: '#F7F3E9',       
  card: '#FFFDF8',        
  border: '#ECE6D7',
  borderLight: '#F1EEE2',
  textDark: '#0E2A24',
  textMuted: '#8B968F',
  textOnDark: '#FAF8F2',
  textOnDarkMuted: '#9FC2B6',
};

export const spacing = { xs: 4, sm: 8, md: 14, lg: 20, xl: 24 };

export const radius = { sm: 9, md: 12, lg: 16, xl: 18, pill: 999 };

export const typography = {
  title: { fontWeight: '700', fontSize: 19, color: colors.textDark },
  heading: { fontWeight: '700', fontSize: 17, color: colors.textDark },
  body: { fontSize: 14, color: colors.textDark },
  caption: { fontSize: 12, color: colors.textMuted },
  amount: { fontWeight: '700', fontSize: 26, color: colors.textOnDark },
};