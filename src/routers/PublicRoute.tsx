import React, { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
  children: ReactNode;

}

export const PublicRoute: FC<Props> = ({ isAuthenticated, children }) => {

  return isAuthenticated
    ? <Navigate to='/' />
    : <>{children}</>

}
