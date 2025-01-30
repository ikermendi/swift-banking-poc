async function AuthorizationFlow(workflowCtx, portal) {
  return {
    "Step 1": {
      name: "Placeholder Step Name",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
 This is a guided walkthrough.`);
      },
    },
  };
}