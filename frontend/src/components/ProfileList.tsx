import { useGetProfilesQuery } from '@/store/api.ts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import ListItemLoader from '@/components/ListItemLoader.tsx';
import ProfileListItem from '@/components/ProfileListItem.tsx';
import ErrorMessage from '@/components/ErrorMessage.tsx';

const ProfileList = () => {
  const { isLoading, isError, data: profiles } = useGetProfilesQuery();

  if (isError) return <ErrorMessage>Something went wrong loading the profiles!</ErrorMessage>;

  return (
    <Card sx={{ mt: 1 }}>
      <CardHeader
        disableTypography
        title={<Typography variant="h6">Profiles</Typography>}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary.main}` }}
      />
      <CardContent>
        <List dense>
          {isLoading && <ListItemLoader count={3} />}
          {profiles?.map((profile) => <ProfileListItem key={profile.id} profile={profile} />)}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileList;
