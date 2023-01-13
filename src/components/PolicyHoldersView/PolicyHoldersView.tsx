import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function PolicyholdersView() {
  const [policyHolders, setPolicyHolders] = useState<any>([]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('policyHolders');

    if (sessionData) {
      setPolicyHolders(JSON.parse(sessionData));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
          );
          const json = await response.json();
          setPolicyHolders(json);
          sessionStorage.setItem('policyHolders', JSON.stringify(json));
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

  return <Box></Box>;
}

export default PolicyholdersView;
