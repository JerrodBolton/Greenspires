// Simple points-based growth model. Every submitted reflection adds
// POINTS_PER_ENTRY points; crossing a threshold below moves the plant to
// the next growth stage label. No custom art yet — stages are just text
// for now, per the plan (visuals can come later).
export const POINTS_PER_ENTRY = 1;

export const GROWTH_STAGES = [
  { minPoints: 0, label: 'Just planted' },
  { minPoints: 3, label: 'Taking root' },
  { minPoints: 7, label: 'Growing steadily' },
  { minPoints: 15, label: 'Flourishing' },
] as const;

export function getGrowthStage(points: number) {
  // Walk the thresholds from highest to lowest and return the first one
  // the current points qualify for.
  for (let i = GROWTH_STAGES.length - 1; i >= 0; i--) {
    if (points >= GROWTH_STAGES[i].minPoints) return GROWTH_STAGES[i];
  }
  return GROWTH_STAGES[0];
}
