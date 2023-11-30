import { Address, Person } from '@/types.ts';

export const getPersonString = (person: Person) => {
  return `${person.salutation} ${person.firstName} ${person.lastName}`;
};

export const getAddressString = (address: Address) => {
  return `${address.postalCode} - ${address.name}`;
};

export const formatDate = (date: string | undefined) => {
  if (!date || isNaN(Date.parse(date))) return '-';
  return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
