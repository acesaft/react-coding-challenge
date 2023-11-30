import { mockAddresses, mockPersons } from '@/test/mockData.ts';
import { formatDate, getAddressString, getPersonString } from '@/utils/common.ts';
import { expect } from 'vitest';

describe('getPersonString', () => {
  test('it returns a string containing the salutation, first name and last name', () => {
    expect(getPersonString(mockPersons[0])).toEqual(`Frau Lennie Lamos`);
  });
});

describe('getAddressString', () => {
  test('it returns a string containing the postal code and name', () => {
    expect(getAddressString(mockAddresses[0])).toEqual(`03508 - Eliah_Guldemeister`);
  });
});

describe('formatDate', () => {
  test('it returns a formatted date with format "dd/mm/yyyy" if passed date is valid', () => {
    expect(formatDate(mockPersons[0].birthdate)).toEqual(`29.12.1976`);
  });

  test('it returns a "-" if passed date is not valid', () => {
    expect(formatDate('foo')).toEqual(`-`);
  });
});
