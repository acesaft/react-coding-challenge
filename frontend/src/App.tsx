import Container from '@mui/material/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddressDetails from '@/components/AddressDetails.tsx';
import PaymentMethodDetails from '@/components/PaymentMethodDetails.tsx';
import PersonDetails from '@/components/PersonDetails.tsx';
import ProfileDetails from '@/components/ProfileDetails.tsx';
import ProfileList from '@/components/ProfileList.tsx';
import UserAccount from '@/components/UserAccount.tsx';

export const App = () => {
  return (
    <Container maxWidth={false} sx={{ p: 1, maxWidth: 700 }}>
      <UserAccount />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/profile/:profileId" element={<ProfileDetails />} />
          <Route path="/profile/:profileId/person/:personId" element={<PersonDetails />} />
          <Route path="/profile/:profileId/address/:addressId" element={<AddressDetails />} />
          <Route path="/profile/:profileId/payment-method/:paymentMethodId" element={<PaymentMethodDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
