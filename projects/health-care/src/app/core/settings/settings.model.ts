import { AppState } from '../core.module';

export interface SettingsState {
  language: string;
  theme: string;
  autoNightMode: boolean;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
}

export interface State extends AppState {
  settings: SettingsState;
}
