// This describes every screen in the app. Neither screen takes params
// anymore — Home loads the saved plant straight from storage
// (storage/plantStorage.ts) rather than having it handed to it, since
// Onboarding already writes to storage before navigating. One source of
// truth instead of the same data traveling two paths.
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Settings: undefined;
};
