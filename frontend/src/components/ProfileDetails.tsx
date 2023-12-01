import { useParams } from 'react-router-dom';

import { useGetProfileQuery } from '@/store/api.ts';
import { getAddressString, getPersonString } from '@/utils/common.ts';
import List from '@/components/List';
import ErrorMessage from '@/components/ErrorMessage.tsx';
import ListItem from '@/components/ListItem';

const ProfileDetails = () => {
  const { profileId } = useParams();
  const { isLoading, isError, data: profile } = useGetProfileQuery(profileId as string);

  if (isError) return <ErrorMessage>Something went wrong loading the profile!</ErrorMessage>;

  return (
    <>
      <List headerText="Persons" isLoading={isLoading} loadingCount={2}>
        {profile?.persons?.map((person) => (
          <ListItem key={person.id} linkTo={`person/${person.id}`} text={getPersonString(person)} />
        ))}
      </List>
      <List headerText="Addresses" isLoading={isLoading} loadingCount={2}>
        {profile?.addresses?.map((address) => (
          <ListItem key={address.id} linkTo={`address/${address.id}`} text={getAddressString(address)} />
        ))}
      </List>
      <List headerText="Payment Methods" isLoading={isLoading} loadingCount={2}>
        {profile?.paymentMethods?.map((paymentMethod) => (
          <ListItem key={paymentMethod.id} linkTo={`payment-method/${paymentMethod.id}`} text={paymentMethod.name} />
        ))}
      </List>
    </>
  );
};

export default ProfileDetails;
