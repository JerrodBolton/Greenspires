import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PLANT_TYPES, DEFAULT_BACKGROUND, PlantTypeId } from '../constants/plants';
import type { RootStackParamList } from '../types/navigation';
import { savePlant } from '../storage/plantStorage';

// NativeStackScreenProps<RootStackParamList, 'Onboarding'> gives this
// component a correctly-typed `navigation` prop — e.g. it knows
// navigation.navigate('Home', {...}) requires a plantType and plantName,
// because that's what we declared for 'Home' in RootStackParamList.
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [selectedPlant, setSelectedPlant] = useState<PlantTypeId | null>(null);
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

      {selectedPlant && plantName.trim().length > 0 && (
        <Pressable
          style={styles.continueButton}
          onPress={async () => {
            const trimmedName = plantName.trim();
            // Save first so the choice survives an app restart. Home
            // reads this back from storage itself, so no params needed.
            await savePlant({ type: selectedPlant, name: trimmedName, points: 0 });
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
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
  continueButton: {
    backgroundColor: '#8fd19e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#1c2e22',
    fontSize: 16,
    fontWeight: '700',
  },
});
