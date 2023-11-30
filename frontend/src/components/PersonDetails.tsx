import { useParams } from 'react-router-dom';

import { useGetPersonQuery } from '@/store/api.ts';
import { formatDate } from '@/utils/common.ts';

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

  if (isLoading) return <div>... loading person</div>;
  if (isError) return <div>Something went wrong loading the person!</div>;

  return (
    <section>
      <div>Salutation: {person?.salutation}</div>
      <div>First Name: {person?.firstName}</div>
      <div>Last Name: {person?.lastName}</div>
      <div>Occupation: {person?.occupation}</div>
      <div>Birth Date: {formatDate(person?.birthdate)}</div>
      {person?.isPrimary && <div>Primary</div>}
    </section>
  );
};

export default ProfileDetails;
