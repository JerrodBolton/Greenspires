import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';

const PLANT_TYPES = [
  { id: 'succulent', label: '🌵 Succulent', description: 'Resilient and steady', color: '#2d4a3e' },
  { id: 'fern', label: '🌿 Fern', description: 'Gentle and grounding', color: '#1f3d2b' },
  { id: 'flower', label: '🌸 Flower', description: 'Bright and expressive', color: '#3f2f45' },
];

const DEFAULT_BACKGROUND = '#1c2e22';

export default function App() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [plantName, setPlantName] = useState('');

  const selected = PLANT_TYPES.find((p) => p.id === selectedPlant);
  const backgroundColor = selected ? selected.color : DEFAULT_BACKGROUND;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.title}>Welcome to Greenspire</Text>
      <Text style={styles.subtitle}>Choose a companion to grow alongside you</Text>

      {PLANT_TYPES.map((plant) => (
        <Pressable
          key={plant.id}
          onPress={() => setSelectedPlant(plant.id)}
          style={[
            styles.plantOption,
            selectedPlant === plant.id && styles.plantOptionSelected,
          ]}
        >
          <Text style={styles.plantLabel}>{plant.label}</Text>
          <Text style={styles.plantDescription}>{plant.description}</Text>
        </Pressable>
      ))}

      {selectedPlant && (
        <View style={styles.nameSection}>
          <Text style={styles.nameLabel}>What will you name it?</Text>
          <TextInput
            style={styles.nameInput}
            value={plantName}
            onChangeText={setPlantName}
            placeholder="Give your plant a name"
            placeholderTextColor="#a9bcae"
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '700', color: '#f4f7f3', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#c3d3c6', marginBottom: 32, textAlign: 'center' },
  plantOption: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  plantOptionSelected: { borderColor: '#8fd19e' },
  plantLabel: { fontSize: 18, fontWeight: '600', color: '#f4f7f3' },
  plantDescription: { fontSize: 13, color: '#c3d3c6', marginTop: 2 },
  nameSection: { width: '100%', marginTop: 16 },
  nameLabel: { fontSize: 15, color: '#f4f7f3', marginBottom: 8 },
  nameInput: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f4f7f3',
  },
});
