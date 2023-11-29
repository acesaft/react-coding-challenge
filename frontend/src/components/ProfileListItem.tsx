import { FC } from 'react';

import { Profile } from '@/types.ts';

interface Props {
  profile: Profile;
}

const ProfileListItem: FC<Props> = ({ profile }) => {
  return <li key={profile.id}>{profile.name}</li>;
};

export default ProfileListItem;
