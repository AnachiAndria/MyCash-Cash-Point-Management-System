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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- NAVIGATION AGENT ---
function AgentTabs({ setSession }: { setSession: (s: Session | null) => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.jade,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Accueil') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Rapports') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Paie') iconName = focused ? 'wallet' : 'wallet-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil">
        {(props) => (
          <AgentHomeScreen 
            {...props} 
            onNewReport={() => props.navigation.navigate('Rapports')} 
            onLogout={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Rapports" component={AgentReportScreen} />
      <Tab.Screen name="Paie" component={AgentPayScreen} />
    </Tab.Navigator>
  );
}

// --- NAVIGATION GERANT ---
function GerantTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
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
      <Tab.Screen name="Accueil" component={GerantHomeScreen} />
      <Tab.Screen name="Rapports" component={GerantHistoryScreen} />
      <Tab.Screen name="Profil" component={GerantSettingsScreen} />
    </Tab.Navigator>
  );
}

// --- APP PRINCIPALE ---
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSplashVisible(false), 2000);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchRole(session.user.id, session.user.email);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.id, session.user.email);
      else {
        setUserRole(null);
        setIsLoadingRole(false);
      }
    });
  }, []);

  async function fetchRole(userId: string, userEmail: string | undefined) {
    setIsLoadingRole(true);
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
    
    if (data && data.role) {
      setUserRole(data.role);
    } else {
      if (userEmail && userEmail.includes('agent')) setUserRole('agent');
      else setUserRole('gerant');
    }
    setIsLoadingRole(false);
  }

  if (isSplashVisible) return <SplashScreen />;

  if (session && isLoadingRole) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.cream }}>
        <ActivityIndicator size="large" color={colors.jade} />
        <Text style={{ marginTop: 10, color: colors.textMuted }}>Chargement de votre espace...</Text>
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
        ) : userRole === 'agent' ? (
          // --- STACK AGENT ---
          <>
            <Stack.Screen name="AgentApp">
              {() => <AgentTabs setSession={setSession} />}
            </Stack.Screen>
          </>
        ) : (
          // --- STACK GERANT ---
          <>
            <Stack.Screen name="GerantApp" component={GerantTabs} />
            <Stack.Screen name="GerantReportDetail" component={GerantReportDetailScreen} />
            <Stack.Screen name="GerantCashPointDetail" component={GerantCashPointDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}