import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageTitle, PageTitleWrapper } from '../components/ui';

export const Inicio = () => {

  const navigate = useNavigate();

  /* 
    useEffect(() => {
      const lastPath = localStorage.getItem('lastPath' || '/');
  
      console.log("Redirigiendo a ", lastPath);
  
      navigate(lastPath!, {
        replace: true
      }) 
    }, []); */

 


  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Dashboard'></PageTitle>
      </PageTitleWrapper>




    </>
  )
}
