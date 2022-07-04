import React, { FC, useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { AuthState, selectAuth, startChecking } from '../reducers';

// Componentes
import { Login } from '../pages/';
import { AppRouter, PrivateRoute, PublicRoute } from './';
import { useAppSelector, useAppDispatch } from '../app/hooks';


export const LoginRouter: FC = () => {

  const dispatch = useAppDispatch();
  const { checking, usuario } = useAppSelector(selectAuth);

  const startCheckingJWT = () => {
    
    dispatch(startChecking());

  


  }

  useEffect(() => {
    startCheckingJWT();

  }, [dispatch]);


  

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/*'
            element={
              <PrivateRoute isAuthenticated={!!usuario}>
                <AppRouter />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticated={!!usuario}>
                <Login />
              </PublicRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}





