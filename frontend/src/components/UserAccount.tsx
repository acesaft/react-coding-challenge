import { selectUserAccountCounts, useGetUserAccountQuery } from '@/store/userAccountApi';
import { useAppSelector } from '@/utils/hooks';

const UserAccount = () => {
  const { isLoading, isError, data } = useGetUserAccountQuery();
  const { profileCount, personCount, addressCount, paymentCount, meterCount } = useAppSelector(selectUserAccountCounts);

  if (isLoading) return <div>... loading user account</div>;
  if (isError) return <div>Something went wrong loading the user account!</div>;

  return (
    <section>
      <div>Email: {data?.email}</div>
      <div>Profiles: {profileCount}</div>
      <div>Persons: {personCount}</div>
      <div>Addresses: {addressCount}</div>
      <div>Payment Methods: {paymentCount}</div>
      <div>Meters: {meterCount}</div>
    </section>
  );
};

export default UserAccount;
