import { ProfileProvider } from '@/contexts/ProfileContext';
import { ProfileManager } from '@/components/ProfileManager';
import { NotificationProvider } from '@/components/ui/notification';

export default function HomePage() {
  return (
    <NotificationProvider>
      <ProfileProvider>
        <ProfileManager />
      </ProfileProvider>
    </NotificationProvider>
  );
}
