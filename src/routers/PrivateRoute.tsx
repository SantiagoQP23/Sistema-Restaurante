import { FC, ReactNode } from 'react';
import {  Navigate, useLocation, useNavigate } from 'react-router-dom';


interface Props {
  isAuthenticated: boolean;
  children: ReactNode;
}

export const PrivateRoute : FC<Props> = ({ isAuthenticated, children }) => {

  const location = useLocation();

  localStorage.setItem('lastPath', location.pathname);

  return isAuthenticated 
    ? <>{children}</>
    : <Navigate to='/login' replace/>
}
