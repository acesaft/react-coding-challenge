import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddressDetails from '@/components/AddressDetails.tsx';
import PaymentMethodDetails from '@/components/PaymentMethodDetails.tsx';
import PersonDetails from '@/components/PersonDetails.tsx';
import ProfileDetails from '@/components/ProfileDetails.tsx';
import ProfileList from '@/components/ProfileList.tsx';
import UserAccount from '@/components/UserAccount.tsx';

export const App = () => {
  return (
    <main style={{ display: 'grid', placeItems: 'center', fontFamily: 'helvetica' }}>
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
    </main>
  );
};
