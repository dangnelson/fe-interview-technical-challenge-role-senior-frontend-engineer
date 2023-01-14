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
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <p style={{ fontStyle: 'italic' }}>
          Prompt: Add some text at the bottom of PolicyHoldersView describing
          any remaining work you would do in this repo before shipping your code
          to a "production" environment.
        </p>

        <ul>
          <li>
            Ensure it's place and value for the user within the current app
            ecosystem.
          </li>
          <li>Add authentication.</li>
          <li>Add mobile support.</li>
          <li>Setup a CI/CD pipeline for deployment.</li>
          <li>Add a component library with Storybook.</li>
          <li>Setup a CI/CD pipeline for deployment.</li>
          <li>
            Ensure there's no code in shared component libraries that's
            redudant.
          </li>
          <li>
            Add variable constants for colors & other common styles used acoss
            the app.
          </li>
          <li>Add Jest test coverage for the new functionality.</li>
          <li>
            Add better error handling for API requests with alerts for the user.
          </li>
          <li>
            Add meta tags, open graph tags / images, and h1 titles and
            descriptions for each page which is indexable / crawlable.
          </li>
          <li>
            Add a ticket for the API to be fixed to use all lower case
            "Policyholders" to match the UI, rather than "PolicyHolders"
            spelling.
          </li>
          <li>Ensure accessiblity standards are met if required.</li>
          <li>Run Jest & Cypress tests to ensure they pass.</li>
          <li>
            Add documentation to the README for how to run the Cypress tests.
          </li>
          <li>Rename the NavBar component to SideBar.</li>
        </ul>
      </div>
    </>
  );
}

export default PolicyholdersView;
