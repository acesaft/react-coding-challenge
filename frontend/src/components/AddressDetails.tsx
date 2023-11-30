import { useParams } from 'react-router-dom';

import { useGetAddressQuery } from '@/store/api.ts';

const AddressDetails = () => {
  const { profileId, addressId } = useParams();
  const {
    isLoading,
    isError,
    data: address,
  } = useGetAddressQuery({
    profileId: profileId as string,
    addressId: addressId as string,
  });

  if (isLoading) return <div>... loading address</div>;
  if (isError) return <div>Something went wrong loading the address!</div>;

  return (
    <section>
      <div>Name: {address?.name}</div>
      <div>Postal Code: {address?.postalCode}</div>
      <div>City: {address?.city}</div>
      <div>Street: {address?.street}</div>
      <div>House Number: {address?.houseNumber}</div>
      {address?.isPrimaryMailing && <div>Primary Mailing Address</div>}
      {address?.isPrimaryBilling && <div>Primary Billing Address</div>}
      {address?.isPrimaryShipping && <div>Primary Shipping Address</div>}
    </section>
  );
};

export default AddressDetails;
