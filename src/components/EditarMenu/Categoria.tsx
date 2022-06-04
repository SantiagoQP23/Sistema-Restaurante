import React, { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom';

// Material UI
import { Typography, Grid, Box, Button, IconButton, Card, CardContent } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ICategoria } from '../../interfaces';

interface Props {
  categoria: ICategoria;
  nombreSeccion: string;
  editarCategoria: (categoria: ICategoria) => void;
  eliminarCategoria: (categoria: ICategoria) => void;


}


export const Categoria: FC<Props> = ({ categoria, nombreSeccion, editarCategoria, eliminarCategoria }) => {

  const navigate = useNavigate();

  return (
    <>
      <Grid item xs={12} md={4} >
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="subtitle1" color="initial">{categoria.nombreCategoria}</Typography>
              {/* <Typography variant="subtitle2" color="initial">{categoria.cantProductos} productos</Typography> */}

              <IconButton aria-label="editar-categoria" onClick={() => editarCategoria(categoria)}>

                <EditIcon />
              </IconButton>
            </Box>



            <Box display='flex' justifyContent='space-between'>

              <Button variant='outlined' size='small'
                color='error'
                onClick={() => eliminarCategoria(categoria)}
              >

                <DeleteIcon />
              </Button>
              <Button variant="outlined" size='small' onClick={() => navigate(`/menu/editar/${nombreSeccion}/${categoria.nombreCategoria}`)} >
                productos

              </Button>
            </Box>



          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
