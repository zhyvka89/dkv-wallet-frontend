import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { authSelectors } from './Redux/auth';

import PrivateRoute from './Components/Navigation/PrivateRoute';
import PublicRoute from './Components/Navigation/PublicRoute';

import Container from './Components/UI/Container';
import muiTheme from './Components/UI/muiTheme';
import Header from './Components/Header';

const LoginView = lazy(() =>
  import('./Pages/LoginView' /* webpackChunkName: "LoginView"*/),
);
const RegisterView = lazy(() =>
  import('./Pages/RegisterView' /* webpackChunkName: "RegisterView"*/),
);
const HomeView = lazy(() =>
  import('./Pages/HomeView' /* webpackChunkName: "HomeView"*/),
);
const StatView = lazy(() =>
  import('./Pages/StatView' /* webpackChunkName: "StatView"*/),
);
const CurrencyView = lazy(() =>
  import('./Pages/CurrencyView' /* webpackChunkName: "CurrencyView"*/),
);

const App = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <ThemeProvider theme={muiTheme}>
      {isLoggedIn ? <Header />: <></>}
      <Container>
        <Suspense fallback={'Loading...'}>
          <Routes>
            <Route
              path="/"
              redirectTo="/home"
              restricted
              exact
              element={
                <PublicRoute>
                  <LoginView />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              restricted
              element={
                <PublicRoute>
                  <RegisterView />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomeView />
                </PrivateRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <PrivateRoute>
                  <StatView />
                </PrivateRoute>
              }
            />

            <Route
              path="/currency"
              element={
                <PrivateRoute>
                  <CurrencyView />
                </PrivateRoute>
              }
            />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <p>User</p>
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </ThemeProvider>
  );
};

export default App;
