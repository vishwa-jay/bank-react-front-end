import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Operations from './components/views/transactions/transactions';
import SavingGoals from './components/views/saving-goals/saving-goals';
import { Alert } from "@mui/material";
import { Suspense } from "react";
import { OPERATIONS_ROUTE, SAVING_GOALS_ROUTE } from "./constants/routes";
import Layout from "./components/views/layout";

function App() {
  const ROUTES = [
    {
      component: <Operations />,
      path: OPERATIONS_ROUTE,
    },
    {
      component: <SavingGoals />,
      path: SAVING_GOALS_ROUTE,
    }
  ];

  const FallbackComponent = () => (
    <Alert severity="warning">Something wrong!</Alert>
  );

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state goes here
      }}
      resetKeys={["someKey"]}
    >
      <Suspense fallback={<h2>Loading...</h2>}>
        <Layout>
          <Routes>
            {ROUTES.map((route, index) => (
              <Route key={index} element={route.component} path={route.path} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
