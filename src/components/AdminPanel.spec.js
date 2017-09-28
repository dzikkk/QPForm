import React from 'react';
import ReactDOM from 'react-dom';
import AdminPanel from './AdminPanel';

describe('Admin Panel', () => {
  const form1 = {
    name: 'test1',
    email: 'test@adres.pl',
    policyid: '123',
    claimType: 'TEST',
    claimAmount: '1000',
    dateOccurred: '12/12/1212',
  }

  const form2 = {
    name: 'test2',
    email: 'test@adres.eu',
    policyid: '123123',
    claimType: 'TEST2',
    claimAmount: '9999',
    dateOccurred: '12/12/1212',
  }

  const formsList = [form1, form2];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdminPanel />, div);
  });

  it('renders without crashing with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdminPanel formsList = {formsList}/>, div);
  });
})
