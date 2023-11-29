import ProfileListItem from '@/components/ProfileListItem.tsx';
import { selectUserAccountProfiles, useGetUserAccountQuery } from '@/store/userAccountApi.ts';
import { useAppSelector } from '@/utils/hooks.ts';

const ProfileList = () => {
  const { isLoading, isError } = useGetUserAccountQuery();
  const profiles = useAppSelector(selectUserAccountProfiles);

  if (isLoading) return <div>... loading profiles</div>;
  if (isError) return <div>Something went wrong loading the profiles!</div>;
  if (!profiles.length) return null;

  return (
    <section>
      <ul>
        {profiles.map((profile) => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
      </ul>
    </section>
  );
};

export default ProfileList;
