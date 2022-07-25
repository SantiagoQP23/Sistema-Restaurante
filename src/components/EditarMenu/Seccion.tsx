import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ISeccion } from '../../interfaces';
import { useAppDispatch } from '../../app/hooks';
import { seccionSetActive } from '../../reducers';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';

interface Props {
  seccion: ISeccion,
  eliminarSeccion: (seccion: ISeccion) => void;
  editarSeccion: (seccion: ISeccion) => void;
}


export const Seccion: FC<Props> = ({ seccion, eliminarSeccion, editarSeccion }) => {

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
            <Typography variant="h6" color="white" align='center'>{seccion.nombreSeccion}</Typography>
            <Box display='flex' justifyContent='center'>

              <Button size='small' variant="text" onClick={() => editarCategorias()}>
                Editar  Categorias
              </Button>

            </Box>

            <Box mt={1} display='flex' justifyContent='space-between' >

              <Button
                variant='text'
                onClick={() => {
                  editarSeccion(seccion);
                }}>

                <EditOutlined />
                Editar
              </Button>
              <Button variant='text' size='small' color='error' onClick={() => { eliminarSeccion(seccion) }}>

                <DeleteOutlined />
                Eliminar
              </Button>


            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}


