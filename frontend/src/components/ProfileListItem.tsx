import { FC } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={`profile/${profile.id}`}>{profile.name}</Link>
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
