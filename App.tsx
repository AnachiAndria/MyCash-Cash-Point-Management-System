// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { View, Text, ActivityIndicator } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';

// Screens Communs
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';

// Screens Agent
import AgentHomeScreen from './src/screens/agent/AgentHomeScreen';
import AgentReportScreen from './src/screens/agent/AgentReportScreen';
import AgentPayScreen from './src/screens/agent/AgentPayScreen';

// Screens Gérant
import GerantHomeScreen from './src/screens/gerant/GerantHomeScreen';
import GerantReportDetailScreen from './src/screens/gerant/GerantReportDetailScreen';
import GerantCashPointDetailScreen from './src/screens/gerant/GerantCashPointDetailScreen';
import GerantHistoryScreen from './src/screens/gerant/GerantHistoryScreen';
import GerantSettingsScreen from './src/screens/gerant/GerantSettingsScreen';
import GerantAddAgentScreen from './src/screens/gerant/GerantAddAgentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- NAVIGATION AGENT ---
function AgentTabs({ setSession, profile }: { setSession: any, profile: any }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 65, paddingBottom: 10, paddingTop: 10 },
        tabBarActiveTintColor: colors.jade,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          if (route.name === 'Accueil') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Rapports') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Paie') iconName = focused ? 'wallet' : 'wallet-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil">
        {/* On ajoute (props: any) ici pour corriger l'erreur rouge */}
        {(props: any) => (
          <AgentHomeScreen 
            {...props} 
            profile={profile} 
            onNewReport={() => props.navigation.navigate('Rapports')} 
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Rapports" component={AgentReportScreen} />
      <Tab.Screen name="Paie" component={AgentPayScreen} />
    </Tab.Navigator>
  );
}

// --- NAVIGATION GERANT ---
function GerantTabs({ profile }: { profile: any }) {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 65, paddingBottom: 10, paddingTop: 10 },
        tabBarActiveTintColor: colors.jade,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          if (route.name === 'Accueil') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Rapports') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Profil') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil">
        {/* On ajoute (props: any) ici aussi */}
        {(props: any) => <GerantHomeScreen {...props} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen name="Rapports" component={GerantHistoryScreen} />
      <Tab.Screen name="Profil" component={GerantSettingsScreen} />
    </Tab.Navigator>
  );
}

// --- APP PRINCIPALE ---
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null); 
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSplashVisible(false), 2000);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id, session.user.email);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id, session.user.email);
      else { setProfile(null); setIsLoadingRole(false); }
    });
  }, []);

  async function fetchProfile(userId: string, userEmail: string | undefined) {
    setIsLoadingRole(true);
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    
    if (data) {
      setProfile(data);
    } else {
      setProfile({ 
        role: userEmail && userEmail.includes('agent') ? 'agent' : 'gerant',
        full_name: 'Utilisateur Test',
        cash_point: 'Analakely'
      });
    }
    setIsLoadingRole(false);
  }

  if (isSplashVisible) return <SplashScreen />;

  if (session && isLoadingRole) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.cream }}>
        <ActivityIndicator size="large" color={colors.jade} />
        <Text style={{ marginTop: 10, color: colors.textMuted }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLoginSuccess={() => {}} />}
          </Stack.Screen>
        ) : profile?.role === 'agent' ? (
          <Stack.Screen name="AgentApp">
            {() => <AgentTabs setSession={setSession} profile={profile} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="GerantApp">
              {() => <GerantTabs profile={profile} />}
            </Stack.Screen>
            <Stack.Screen name="GerantReportDetail" component={GerantReportDetailScreen} />
            <Stack.Screen name="GerantCashPointDetail" component={GerantCashPointDetailScreen} />
            <Stack.Screen name="GerantAddAgent" component={GerantAddAgentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}