import { FC, ReactNode } from 'react';
import {  Navigate, useNavigate } from 'react-router-dom';


interface Props {
  isAuthenticated: boolean;
  children: ReactNode;
}

export const PrivateRoute : FC<Props> = ({ isAuthenticated, children }) => {

  return isAuthenticated 
    ? <>{children}</>
    : <Navigate to='/login' replace/>
}
