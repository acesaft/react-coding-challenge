import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import List from '@/components/List';
import ItemLoader from '@/components/ItemLoader';
import { useGetPersonQuery } from '@/store/api';
import { formatDate } from '@/utils/common';

const ProfileDetails = () => {
  const { profileId, personId } = useParams();
  const {
    isLoading,
    isError,
    data: person,
  } = useGetPersonQuery({
    profileId: profileId as string,
    personId: personId as string,
  });

  if (isError) return <div>Something went wrong loading the person!</div>;

  return (
    <List headerText="Person" isLoading={isLoading} loadingCount={0}>
      <Typography variant="body1" noWrap>
        <strong>Salutation:</strong> <ItemLoader isLoading={isLoading} value={person?.salutation} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>First Name:</strong> <ItemLoader isLoading={isLoading} value={person?.firstName} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Last Name:</strong> <ItemLoader isLoading={isLoading} value={person?.lastName} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Occupation:</strong> <ItemLoader isLoading={isLoading} value={person?.occupation} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Birth Date:</strong> <ItemLoader isLoading={isLoading} value={formatDate(person?.birthdate)} />
      </Typography>
      <>{person?.isPrimary && <Chip sx={{ mt: 1, mr: 1 }} label="Primary" />}</>
    </List>
  );
};

export default ProfileDetails;
