import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LoginPage from './Login';
import HomePage from './Home';
import ResetPasswordPage from './ResetPassword';

const MainComp: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
      <Routes>
        <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
         <Route
          path="/home"
          element={
            <PrivateRoute loggedIn={loggedIn}>
              <HomePage />
            </PrivateRoute>
          }
        />
         <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage setLoggedIn={setLoggedIn} />}
        />
      </Routes>
  
  );
};

interface PrivateRouteProps {
  children: React.ReactNode;
  loggedIn: boolean;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default MainComp;
