import { generateJWT } from './get-assertion.js';

async function AuthorizationFlow(workflowCtx, portal) {
  return {
    "Step 1": {
      name: "How to Get Access Token",
      stepCallback: async () => {
        return workflowCtx.showContent(`
## Welcome to Your First API Call!

Welcome to the guided walkthrough of calling your first API! In this tutorial, we'll guide you through the process of obtaining an access token, which you'll use to authenticate your future API requests.

### What to Expect:
1. **Getting Your Token**: First, we'll show you how to securely fetch an OAuth2 token, which is required for interacting with protected resources.
2. **Using the Token**: After acquiring the token, we'll walk you through how to use it in subsequent API calls to retrieve and manage your data.

By the end of this guide, you'll have the knowledge and tools to seamlessly interact with APIs using authentication tokens. Let's get started!
    `);
      },
    },
    "Step 2": {
      name: "Get Authorization Token",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig,
            auth: {
              ...defaultConfig.auth,
              basicAuth: {
                ...defaultConfig.auth.basicAuth,
                Username: "REPLACE_ME",
                Password: "REPLACE_ME",
              },
            }
          };
        });

        return workflowCtx.showEndpoint({
          description:
            "This endpoint retrieves an authorization token required for accessing protected resources in the API. You will need your client ID and client secret to authenticate.",
          endpointPermalink: "$e/Authorization/getToken",
          args: {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: await generateJWT("kEm6RUET4w5208Kpk3rAfIRy2ZUXe8Ac"),
            scope: "swift.cash.management"
          },
          verify: (response, setError) => {
            if (response.StatusCode == 401 || response.StatusCode == 400) {
              setError("Invalid client ID or client secret. Please try again.");
              return false;
            } else if (response.StatusCode == 200) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid response. Please try again."
              );
              return false;
            }
          },
        });
      },
    },
    "Step 3": {
      name: "Get the List of Accounts",
      stepCallback: async (stepState) => {
        const step2State = stepState?.["Step 2"];

        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig,
            showFullCode: true,
            auth: {
              ...defaultConfig.auth,
              oauthBearerToken: {
                ...defaultConfig.auth.oauthBearerToken,
                AccessToken: step2State?.data?.access_token ? step2State.data.access_token : "REPLACE ME",
              },
            }
          };
        });

        return workflowCtx.showEndpoint({
          description:
            "This step retrieves a list of accounts associated with your client. The token from the previous step is used for authorization.",
          endpointPermalink: "$e/Account%20Information/getAccounts",
          args: {
            "X-BIC": "swhqbebb",
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200) {
              setError("Unable to fetch the list of accounts. Please try again.");
              return false;
            } else {
              return true;
            }
          },
        });
      },
    },
  };
}

window.AuthorizationFlow = AuthorizationFlow;