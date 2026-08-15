import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PLANT_TYPES, DEFAULT_BACKGROUND } from '../constants/plants';
import { getGrowthStage, POINTS_PER_ENTRY } from '../constants/growth';
import { loadPlant, addGrowth, StoredPlant } from '../storage/plantStorage';
import type { RootStackParamList } from '../types/navigation';

// this is is what this is what the use entry
type Entry = {
  id: string; // unique identifier for the entry
  text: string; // the content of the entry name
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [plant, setPlant] = useState<StoredPlant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    loadPlant().then((stored) => {
      setPlant(stored);
      setIsLoading(false);
    });
  }, []);

  const plantMeta = PLANT_TYPES.find((p) => p.id === plant?.type);
  const backgroundColor = plantMeta ? plantMeta.color : DEFAULT_BACKGROUND;
  const stage = getGrowthStage(plant?.points ?? 0);

  async function handleShare() {
    const text = draft.trim();
    if (!text) return;

    // Echo it back into the list immediately, then persist the growth.
    setEntries((prev) => [{ id: String(Date.now()), text }, ...prev]);
    setDraft('');

    const updated = await addGrowth(POINTS_PER_ENTRY);
    if (updated) setPlant(updated);
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: DEFAULT_BACKGROUND }]}>
        <ActivityIndicator color="#8fd19e" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          hitSlop={12}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>

        <Text style={styles.emoji}>{plantMeta?.label.split(' ')[0] ?? '🌱'}</Text>
        <Text style={styles.name}>{plant?.name ?? 'Your plant'}</Text>
        <Text style={styles.stage}>{stage.label}</Text>
        <Text style={styles.points}>{plant?.points ?? 0} pts</Text>
      </View>

      <ScrollView style={styles.entryList} contentContainerStyle={styles.entryListContent}>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>What's on your mind today?</Text>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.entryBubble}>
              <Text style={styles.entryText}>{entry.text}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Type how you're feeling..."
          placeholderTextColor="#a9bcae"
          multiline
        />
        <Pressable
          style={[styles.shareButton, draft.trim().length === 0 && styles.shareButtonDisabled]}
          onPress={handleShare}
          disabled={draft.trim().length === 0}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center' },
  header: {
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 16,
    paddingHorizontal: 24,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: 64,
    right: 24,
  },
  settingsIcon: { fontSize: 22 },
  emoji: { fontSize: 56, marginBottom: 8 },
  name: { fontSize: 24, fontWeight: '700', color: '#f4f7f3' },
  stage: { fontSize: 14, color: '#c3d3c6', marginTop: 4 },
  points: { fontSize: 12, color: '#8fd19e', marginTop: 2, fontWeight: '600' },
  entryList: { flex: 1, paddingHorizontal: 24 },
  entryListContent: { paddingBottom: 16 },
  emptyText: {
    color: '#c3d3c6',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
  },
  entryBubble: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  entryText: { color: '#f4f7f3', fontSize: 15 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f4f7f3',
    maxHeight: 100,
  },
  shareButton: {
    backgroundColor: '#8fd19e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  shareButtonDisabled: { opacity: 0.4 },
  shareButtonText: { color: '#1c2e22', fontSize: 15, fontWeight: '700' },
});
