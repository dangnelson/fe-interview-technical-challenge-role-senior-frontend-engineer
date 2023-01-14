import PolicyholderInt from './Policyholder.interface';

function convertPolicyHolder(policyHolder: PolicyholderInt) {
  return [
    {
      key: 'Name',
      value: policyHolder.name,
    },
    {
      key: 'Age',
      value: policyHolder.age,
    },
    {
      key: 'Address',
      value:
        policyHolder.address.line1 +
        ' ' +
        policyHolder.address.line2 +
        ', ' +
        policyHolder.address.city +
        ', ' +
        policyHolder.address.state +
        ' ' +
        policyHolder.address.postalCode,
    },
    {
      key: 'Phone Number',
      value: policyHolder.phoneNumber,
    },
    {
      key: 'Primary Policyholder?',
      value: policyHolder.isPrimary ? 'Yes' : 'No',
    },
  ];
}

export default convertPolicyHolder;
