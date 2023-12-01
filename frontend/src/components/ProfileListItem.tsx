import { CircularProgress } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
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
    <ListItem
      key={profile.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label={`delete ${profile.name}`}
          disabled={isLoading}
          onClick={() => deleteProfileMutation(profile.id)}
        >
          {isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
        </IconButton>
      }
    >
      <ListItemText>
        <Typography sx={{ color: 'text.primary' }} component={Link} to={`profile/${profile.id}`}>
          {profile.name}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default ProfileListItem;
