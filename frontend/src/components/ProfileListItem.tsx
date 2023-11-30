import { FC } from 'react';

import { useDeleteProfileMutation } from '@/store/api.ts';
import { Profile } from '@/types.ts';

interface Props {
  profile: Profile;
}

const ProfileListItem: FC<Props> = ({ profile }) => {
  const [deleteProfileMutation, { isLoading, isSuccess }] = useDeleteProfileMutation();

  if (isSuccess) return null;

  return (
    <li key={profile.id}>
      {profile.name}
      <button
        disabled={isLoading}
        onClick={() => deleteProfileMutation(profile.id)}
        aria-label={`delete ${profile.name}`}
      >
        {isLoading ? `... deleting` : `X`}
      </button>
    </li>
  );
};

export default ProfileListItem;
