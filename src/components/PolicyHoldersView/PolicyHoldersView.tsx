import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InfoTable from '../InfoTable';

function PolicyholdersView() {
  const [policyHolder, setPolicyHolder] = useState<
    Array<{
      key: string;
      value: string | number;
    }>
  >([]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('policyHolders');

    if (sessionData) {
      setPolicyHolder(JSON.parse(sessionData));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
          );
          const json = await response.json();
          const firstResponse = json.policyHolders[0];
          const newPolicyHolder = [
            {
              key: 'Name',
              value: firstResponse.name,
            },
            {
              key: 'Age',
              value: firstResponse.age,
            },
            {
              key: 'Address',
              value:
                firstResponse.address.line1 +
                ' ' +
                firstResponse.address.line2 +
                ', ' +
                firstResponse.address.city +
                ', ' +
                firstResponse.address.state +
                ' ' +
                firstResponse.address.postalCode,
            },
            {
              key: 'Phone Number',
              value: firstResponse.phoneNumber,
            },
            {
              key: 'Primary Policyholder?',
              value: firstResponse.isPrimary ? 'Yes' : 'No',
            },
          ];

          setPolicyHolder(newPolicyHolder);

          sessionStorage.setItem(
            'policyHolders',
            JSON.stringify(newPolicyHolder)
          );
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchData();
    }

    window.onunload = function () {
      sessionStorage.removeItem('policyHolders');
    };
  }, []);

  return (
    <Box>
      <InfoTable header="Policy Holder" rows={policyHolder} />
    </Box>
  );
}

export default PolicyholdersView;
