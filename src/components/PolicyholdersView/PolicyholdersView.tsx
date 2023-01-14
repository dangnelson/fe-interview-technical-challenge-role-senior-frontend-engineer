import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InfoTable from '../InfoTable';
import AddPolicyholder from './AddPolicyholder';
import PolicyHolderInt from './Policyholder.interface';
import convertPolicyholder from './convertPolicyholder';

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<Array<PolicyHolderInt>>(
    []
  );

  useEffect(() => {
    const sessionData = sessionStorage.getItem('policyHolders');

    if (sessionData) {
      setPolicyholders(JSON.parse(sessionData));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
          );
          const json = await response.json();
          const firstResponse = json.policyHolders[0]; // Should be re-named to policyholders (all lowercase) to match UI
          setPolicyholders([firstResponse]);
          sessionStorage.setItem(
            'policyholders',
            JSON.stringify(firstResponse)
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

  function addPolicyholder(newPolicyholders: Array<PolicyHolderInt>) {
    setPolicyholders(newPolicyholders);
  }

  return (
    <>
      {policyholders.length !== 0 &&
        policyholders.map((policyholder: PolicyHolderInt, i: number) => {
          return (
            <Box sx={{ marginBottom: 2 }} key={i}>
              <InfoTable
                header={'Policyholder ' + (i + 1)}
                rows={convertPolicyholder(policyholder)}
              />
            </Box>
          );
        })}

      <AddPolicyholder onClick={addPolicyholder} />
    </>
  );
}

export default PolicyholdersView;
