import { useParams } from 'react-router-dom';

import ListItem from '@/components/ListItem.tsx';
import { useGetProfileQuery } from '@/store/api.ts';
import { getAddressString, getPersonString } from '@/utils/common.ts';

const ProfileDetails = () => {
  const { profileId } = useParams();
  const { isLoading, isError, data: profile } = useGetProfileQuery(profileId as string);

  if (isLoading) return <div>... loading profile</div>;
  if (isError) return <div>Something went wrong loading the profile!</div>;

  return (
    <section>
      <section>
        <h4>Persons</h4>
        <ul>
          {profile?.persons?.map((person) => (
            <ListItem key={person.id} linkTo={`person/${person.id}`} text={getPersonString(person)} />
          ))}
        </ul>
      </section>
      <section>
        <h4>Addresses</h4>
        <ul>
          {profile?.addresses?.map((address) => (
            <ListItem key={address.id} linkTo={`address/${address.id}`} text={getAddressString(address)} />
          ))}
        </ul>
      </section>
      <section>
        <h4>Payment Methods</h4>
        <ul>
          {profile?.paymentMethods?.map((paymentMethod) => (
            <ListItem key={paymentMethod.id} linkTo={`payment-method/${paymentMethod.id}`} text={paymentMethod.name} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ProfileDetails;
