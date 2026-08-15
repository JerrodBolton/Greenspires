import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import type { RootStackParamList } from './types/navigation';
import { loadPlant, StoredPlant } from './storage/plantStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // AsyncStorage reads are async, so on launch we don't yet know whether
  // there's a saved plant. Show a brief loading state rather than
  // flashing Onboarding before redirecting to Home.
  const [isLoading, setIsLoading] = useState(true);
  const [savedPlant, setSavedPlant] = useState<StoredPlant | null>(null);

  useEffect(() => {
    loadPlant().then((plant) => {
      setSavedPlant(plant);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#8fd19e" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={savedPlant ? 'Home' : 'Onboarding'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: 'Settings',
            headerStyle: { backgroundColor: '#1c2e22' },
            headerTintColor: '#f4f7f3',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c2e22',
  },
});
