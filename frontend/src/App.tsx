import ProfileList from '@/components/ProfileList.tsx';
import UserAccount from '@/components/UserAccount.tsx';

export const App = () => {
  return (
    <main style={{ display: 'grid', placeItems: 'center', fontFamily: 'helvetica' }}>
      <UserAccount />
      <ProfileList />
    </main>
  );
};
