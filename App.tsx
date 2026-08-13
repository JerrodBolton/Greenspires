import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';

// Available plant types users can choose from
const PLANT_TYPES = [
  { id: 'succulent', label: '🌵 Succulent', description: 'Resilient and steady' },
  { id: 'fern', label: '🌿 Fern', description: 'Gentle and grounding' },
  { id: 'flower', label: '🌸 Flower', description: 'Bright and expressive' },
];

export default function App() {
  // Track which plant type is selected
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  // Store the user's custom name for their plant
  const [plantName, setPlantName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Greenspire</Text>
      <Text style={styles.subtitle}>Choose a companion to grow alongside you</Text>

      {/* Render plant selection options */}
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

      {/* Show naming input when plant is selected */}
      {selectedPlant && (
        <View style={styles.nameSection}>
          <Text style={styles.nameLabel}>What will you name it?</Text>
          <TextInput
            style={styles.nameInput}
            value={plantName}
            onChangeText={setPlantName}
            placeholder="Give your plant a name"
          />
        </View>
      )}
    </ScrollView>
  );
}

// Styling definitions for all components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f7f3',
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '700', color: '#2f4a3c', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#5c705f', marginBottom: 32, textAlign: 'center' },
  plantOption: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  plantOptionSelected: { borderColor: '#4a7c59' },
  plantLabel: { fontSize: 18, fontWeight: '600', color: '#2f4a3c' },
  plantDescription: { fontSize: 13, color: '#5c705f', marginTop: 2 },
  nameSection: { width: '100%', marginTop: 16 },
  nameLabel: { fontSize: 15, color: '#2f4a3c', marginBottom: 8 },
  nameInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
});