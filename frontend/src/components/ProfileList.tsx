import ProfileListItem from '@/components/ProfileListItem.tsx';
import { useGetProfilesQuery } from '@/store/api.ts';

const ProfileList = () => {
  const { isLoading, isError, data: profiles } = useGetProfilesQuery();

  if (isLoading) return <div>... loading profiles</div>;
  if (isError) return <div>Something went wrong loading the profiles!</div>;

  return (
    <section>
      <ul>{profiles?.map((profile) => <ProfileListItem key={profile.id} profile={profile} />)}</ul>
    </section>
  );
};

export default ProfileList;
