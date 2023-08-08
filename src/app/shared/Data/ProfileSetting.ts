import { Profile } from './Profile';

export interface ProfileSetting {
  id: number;
  language?: string;
  theme?: string;
  profileId?: number | null; 
  profile?: Profile | null; 
}
