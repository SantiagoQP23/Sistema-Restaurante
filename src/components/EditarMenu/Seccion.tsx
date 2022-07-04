import {FC} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ISeccion } from '../../interfaces';
import { useAppDispatch } from '../../app/hooks';
import { seccionSetActive } from '../../reducers';

interface Props{
  seccion: ISeccion,
  eliminarSeccion: (seccion: ISeccion) => void;
  editarSeccion: (seccion: ISeccion) => void;
}


export const Seccion:FC<Props> = ({ seccion, eliminarSeccion, editarSeccion }) => {

  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();

  const editarCategorias = () => {
    navigate(`${seccion.nombreSeccion}`);
    dispatch(seccionSetActive(seccion));
  }


  return (
    <>
      <Grid item xs={12} sm={6} lg={4}>
        <Card >
          <CardContent>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="body1" color="initial">{seccion.nombreSeccion}</Typography>

              <Button onClick={() => {
                editarSeccion(seccion);
              }}>

                <EditIcon />
              </Button>

            </Box>
            
            <Box mt={2} display='flex' justifyContent='space-between' >

              <Button variant='outlined' size='small' color='error' onClick={() => { eliminarSeccion(seccion) }}>

                <DeleteIcon />
              </Button>

              <Button size='small' variant="outlined" onClick={() => editarCategorias()}>
                Editar  Categorias

              </Button>

            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}


