import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import ErrorMessage from '@/components/ErrorMessage.tsx';
import { useGetPaymentMethodQuery } from '@/store/api.ts';
import ItemLoader from '@/components/ItemLoader.tsx';
import List from '@/components/List.tsx';

const PaymentMethodDetails = () => {
  const { profileId, paymentMethodId } = useParams();
  const {
    isLoading,
    isError,
    data: paymentMethod,
  } = useGetPaymentMethodQuery({
    profileId: profileId as string,
    paymentMethodId: paymentMethodId as string,
  });

  if (isError) return <ErrorMessage>Something went wrong loading the payment method!</ErrorMessage>;

  return (
    <List headerText="Payment Method" isLoading={isLoading} loadingCount={0}>
      <Typography variant="body1" noWrap>
        <strong>Name:</strong> <ItemLoader isLoading={isLoading} value={paymentMethod?.name} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>IBAN:</strong> <ItemLoader isLoading={isLoading} value={paymentMethod?.iban} />
      </Typography>
      <Typography variant="body1" noWrap>
        <strong>Bic:</strong> <ItemLoader isLoading={isLoading} value={paymentMethod?.bic} />
      </Typography>
      <>{paymentMethod?.isPrimary && <Chip sx={{ mt: 1, mr: 1 }} label="Primary" />}</>
    </List>
  );
};

export default PaymentMethodDetails;
