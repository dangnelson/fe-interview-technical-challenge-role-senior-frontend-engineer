import { Box, Button } from '@mui/material';

function AddPolicyholder({ onClick }: { onClick: Function }) {
  function postPolicyholder() {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
          {
            method: 'POST',
            body: JSON.stringify({
              name: 'Joe Smith',
              age: 45,
              address: {
                line1: '123 Veryreal St',
                line2: '',
                city: 'Richmond',
                state: 'VA',
                postalCode: 23225,
              },
              phoneNumber: '(804) 123-4567',
            }),
          }
        );
        const json = await response.json();
        onClick(json.policyHolders);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={postPolicyholder} variant="contained">
        Add a policyholder
      </Button>
    </Box>
  );
}

export default AddPolicyholder;
