import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { saveApiKey, loadApiKey } from '../storage/secureStorage';
import { clearPlant } from '../storage/plantStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    loadApiKey().then((key) => {
      if (key) setApiKey(key);
    });
  }, []);

  async function handleSaveKey() {
    await saveApiKey(apiKey.trim());
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  }

  function handleResetPlant() {
    Alert.alert(
      'Reset your plant?',
      'This clears your plant and its growth. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearPlant();
            // Clear the whole stack back to Onboarding rather than
            // pushing/popping — there's nothing meaningful to "go back"
            // to once the plant is gone.
            navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plant</Text>
        <Pressable style={styles.dangerButton} onPress={handleResetPlant}>
          <Text style={styles.dangerButtonText}>Reset my plant</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionDescription}>
          Greenspire — grow through your words. Your reflections are the water that helps your plant grow.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c2e22' },
  content: { padding: 24, paddingBottom: 48 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#f4f7f3', marginBottom: 8 },
  sectionDescription: { fontSize: 13, color: '#c3d3c6', marginBottom: 12, lineHeight: 18 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#f4f7f3',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#8fd19e',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: { color: '#1c2e22', fontSize: 15, fontWeight: '700' },
  dangerButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c96b5c',
  },
  dangerButtonText: { color: '#e6a99b', fontSize: 15, fontWeight: '600' },
});
