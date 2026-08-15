import * as SecureStore from 'expo-secure-store';

// Unlike storage/plantStorage.ts (AsyncStorage, unencrypted — fine for
// plant/journal data), the Anthropic API key is a secret and belongs in
// the device's secure storage instead.
const API_KEY_STORAGE_KEY = 'greenspire:anthropicApiKey';

export async function saveApiKey(key: string): Promise<void> {
  await SecureStore.setItemAsync(API_KEY_STORAGE_KEY, key);
}

export async function loadApiKey(): Promise<string | null> {
  return SecureStore.getItemAsync(API_KEY_STORAGE_KEY);
}

export async function clearApiKey(): Promise<void> {
  await SecureStore.deleteItemAsync(API_KEY_STORAGE_KEY);
}
