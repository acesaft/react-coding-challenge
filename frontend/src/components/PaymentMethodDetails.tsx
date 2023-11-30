import { useParams } from 'react-router-dom';

import { useGetPaymentMethodQuery } from '@/store/api.ts';

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

  if (isLoading) return <div>... loading payment method</div>;
  if (isError) return <div>Something went wrong loading the payment method!</div>;

  return (
    <section>
      <div>Name: {paymentMethod?.name}</div>
      <div>IBAN: {paymentMethod?.iban}</div>
      <div>bic: {paymentMethod?.bic}</div>
      {paymentMethod?.isPrimary && <div>Primary</div>}
    </section>
  );
};

export default PaymentMethodDetails;
