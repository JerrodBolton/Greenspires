import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PlantTypeId } from '../constants/plants';

// AsyncStorage is unencrypted on-device key/value storage — fine for plant
// data (not sensitive), but NOT where the Anthropic API key should live
// later (that belongs in expo-secure-store instead).
const PLANT_STORAGE_KEY = 'greenspire:plant';

export type StoredPlant = {
  type: PlantTypeId;
  name: string;
  points: number;
};

export async function savePlant(plant: StoredPlant): Promise<void> {
  await AsyncStorage.setItem(PLANT_STORAGE_KEY, JSON.stringify(plant));
}

export async function loadPlant(): Promise<StoredPlant | null> {
  const raw = await AsyncStorage.getItem(PLANT_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredPlant;
  } catch {
    // Corrupted or unexpected data — treat it as "no plant saved" rather
    // than crashing the app on launch.
    return null;
  }
}

export async function clearPlant(): Promise<void> {
  await AsyncStorage.removeItem(PLANT_STORAGE_KEY);
}

// Adds to the saved plant's points and persists the result. Returns the
// updated record so the caller can update its UI without a second read.
// If there's no saved plant yet (shouldn't happen once past Onboarding),
// this is a no-op that returns null.
export async function addGrowth(amount: number): Promise<StoredPlant | null> {
  const current = await loadPlant();
  if (!current) return null;

  const updated: StoredPlant = { ...current, points: current.points + amount };
  await savePlant(updated);
  return updated;
}
