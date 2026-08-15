// Shared plant type data. Both the Onboarding screen (picking a plant) and
// the Home screen (displaying the chosen plant) need this list, so it lives
// here instead of being duplicated in each screen file.

export const PLANT_TYPES = [
  { id: 'succulent', label: '🌵 Succulent', description: 'Resilient and steady', color: '#2d4a3e' },
  { id: 'fern', label: '🌿 Fern', description: 'Gentle and grounding', color: '#1f3d2b' },
  { id: 'flower', label: '🌸 Flower', description: 'Bright and expressive', color: '#3f2f45' },
] as const;

export type PlantTypeId = (typeof PLANT_TYPES)[number]['id'];

export const DEFAULT_BACKGROUND = '#1c2e22';
