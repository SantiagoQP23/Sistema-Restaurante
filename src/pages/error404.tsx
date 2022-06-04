import { Typography, Box } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom'

export function Error404() {

  const location = useLocation();
  const navigate = useNavigate();


  if(location.pathname === "/"){
    console.log("ruta inicial")
    navigate('/pedidos')
  }

  return (
    <>
      <Box pt={10} >

        <Typography variant="h3" align='center' color="initial">Módulo no disponible</Typography>
        <Typography variant="h6" align='center' color="initial">Page not found</Typography>

      </Box>
    </>
  )
}

