import ItemLoader from '@/components/ItemLoader.tsx';
import { selectUserAccountCounts, useGetUserAccountQuery } from '@/store/api.ts';
import { useAppSelector } from '@/utils/hooks';

const UserAccount = () => {
  const { isLoading, isFetching, isError, data } = useGetUserAccountQuery();
  const { profileCount, personCount, addressCount, paymentCount, meterCount } = useAppSelector(selectUserAccountCounts);

  const combinedLoading = isLoading || isFetching;

  if (isError) return <div>Something went wrong loading the user account!</div>;

  return (
    <section>
      <div>
        Email: <ItemLoader isLoading={combinedLoading} value={data?.email} />
      </div>
      <div>
        Profiles: <ItemLoader isLoading={combinedLoading} value={profileCount} />
      </div>
      <div>
        Persons: <ItemLoader isLoading={combinedLoading} value={personCount} />
      </div>
      <div>
        Addresses: <ItemLoader isLoading={combinedLoading} value={addressCount} />
      </div>
      <div>
        Payment Methods: <ItemLoader isLoading={combinedLoading} value={paymentCount} />
      </div>
      <div>
        Meters: <ItemLoader isLoading={combinedLoading} value={meterCount} />
      </div>
    </section>
  );
};

export default UserAccount;
