import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import { useGetAddressQuery } from '@/store/api';
import ItemLoader from '@/components/ItemLoader';
import ErrorMessage from '@/components/ErrorMessage';
import List from '@/components/List';

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

  if (isError) return <ErrorMessage>Something went wrong loading the address!</ErrorMessage>;

  return (
    <List headerText="Address" isLoading={isLoading} loadingCount={0}>
      <Typography variant="body1" noWrap>
        <strong>Name:</strong> <ItemLoader isLoading={isLoading} value={address?.name} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Postal Code:</strong> <ItemLoader isLoading={isLoading} value={address?.postalCode} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>City:</strong> <ItemLoader isLoading={isLoading} value={address?.city} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Street:</strong> <ItemLoader isLoading={isLoading} value={address?.street} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>House Number:</strong> <ItemLoader isLoading={isLoading} value={address?.houseNumber} />
      </Typography>
      <>{address?.isPrimaryMailing && <Chip sx={{ mt: 1, mr: 1 }} label="Primary Mailing Address" />}</>
      <>{address?.isPrimaryBilling && <Chip sx={{ mt: 1, mr: 1 }} label="Primary Billing Address" />}</>
      <>{address?.isPrimaryShipping && <Chip sx={{ mt: 1, mr: 1 }} label="Primary Shipping Address" />}</>
    </List>
  );
};

export default AddressDetails;
