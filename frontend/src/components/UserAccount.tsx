import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import ErrorMessage from '@/components/ErrorMessage';
import { useAppSelector } from '@/utils/hooks';
import ItemLoader from '@/components/ItemLoader.tsx';
import { selectUserAccountCounts, useGetUserAccountQuery } from '@/store/api.ts';

const UserAccount = () => {
  const { isLoading, isFetching, isError, data } = useGetUserAccountQuery();
  const { profileCount, personCount, addressCount, paymentCount, meterCount } = useAppSelector(selectUserAccountCounts);

  const combinedLoading = isLoading || isFetching;

  if (isError) return <ErrorMessage>Something went wrong loading the user account!</ErrorMessage>;

  const chipsContent = [
    { label: 'Profiles', value: profileCount },
    { label: 'Persons', value: personCount },
    { label: 'Addresses', value: addressCount },
    { label: 'Payment Methods', value: paymentCount },
    { label: 'Meters', value: meterCount },
  ];

  return (
    <Card>
      <CardHeader title="User Account" sx={{ background: (theme) => theme.palette.primary.main, color: 'white' }} />
      <CardContent>
        <Typography variant="body1" noWrap>
          <strong>Email:</strong> <ItemLoader isLoading={combinedLoading} value={data?.email} />
        </Typography>
        {chipsContent.map((chipContent, index) => (
          <Chip
            key={index}
            sx={{ mt: 1, mr: 1 }}
            label={chipContent.label}
            avatar={<Avatar>{combinedLoading ? <CircularProgress size={10} /> : chipContent.value}</Avatar>}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default UserAccount;
