import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InfoTable from '../InfoTable';
import AddPolicyholder from './AddPolicyholder';

function PolicyholdersView() {
  const [policyholder, setPolicyholder] = useState<
    Array<{
      key: string;
      value: string | number;
    }>
  >([]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('policyHolders');

    if (sessionData) {
      setPolicyholder(JSON.parse(sessionData));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
          );
          const json = await response.json();
          const firstResponse = json.policyHolders[0]; // Should be re-named to policyholders (all lowercase) to match UI
          const newPolicyholder = [
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

          setPolicyholder(newPolicyholder);

          sessionStorage.setItem(
            'policyholders',
            JSON.stringify(newPolicyholder)
          );
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchData();
    }

    window.onunload = function () {
      sessionStorage.removeItem('policyholders');
    };
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <InfoTable header="Policyholders" rows={policyholder} />
      </Box>
      <AddPolicyholder />
    </>
  );
}

export default PolicyholdersView;
