import React, { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom';

// Material UI
import { Typography, Grid, Box, Button, IconButton, Card, CardContent } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ICategoria } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';
import { categoriaSetActive } from '../../reducers';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

interface Props {
  categoria: ICategoria;
  nombreSeccion: string;
  editarCategoria: (categoria: ICategoria) => void;
  eliminarCategoria: (categoria: ICategoria) => void;


}


export const Categoria: FC<Props> = ({ categoria, nombreSeccion, editarCategoria, eliminarCategoria }) => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const establecerCategoria = () => {
    navigate(`/menu/editar/${nombreSeccion}/${categoria.nombreCategoria}`);
    dispatch(categoriaSetActive(categoria));

  }

  return (
    <>
      <Grid item xs={12} sm={4} md={3} >
        <Card>
          <CardContent>
            <Typography variant="h6" align='center' color='white'>{categoria.nombreCategoria}</Typography>

            <Box display='flex' justifyContent='center'>
              <Button variant="text" size='small' onClick={() => establecerCategoria()} >
                Ver productos

              </Button>

            </Box>


            <Box display='flex' justifyContent='space-between'>

              <Button variant='text' size='small'
                color='error'
                onClick={() => eliminarCategoria(categoria)}
              >

                <DeleteOutlined />
                Eliminar
              </Button>
              <Button variant='text' size='small'
                onClick={() => editarCategoria(categoria)}
              >

                <EditOutlined />
                Editar
              </Button>
            </Box>



          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
