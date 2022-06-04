import React, { FC } from 'react'

import { Typography, Grid, Box, Button, Card, CardContent } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IProducto } from '../../interfaces';



interface Props {
  producto: IProducto;
  editarProducto: (producto: IProducto) => void;
  eliminarProducto: (producto: IProducto) => void;
}

export const Producto: FC<Props> = ({ producto, editarProducto, eliminarProducto }) => {
  return (
    <>

      <Grid item xs={12} md={4} >
        <Card>
          <CardContent>
            <Box >
              <Typography variant="subtitle1" color="initial">{producto.nombre}</Typography>
              <Typography variant="subtitle2" color="initial">Precio: ${producto.precio}</Typography>

            </Box>

            <Box display='flex' justifyContent='space-between' mt={1}>

              <Button variant='outlined'
                size='small'
                color='error'
                onClick={() => eliminarProducto(producto)}
              >

                <DeleteIcon />
              </Button>

              <Button variant='outlined'
                size='small'
                color='info'
                onClick={() => editarProducto(producto)}
              >

                <EditIcon />
              </Button>
            </Box>


          </CardContent>
        </Card>
      </Grid>

    </>
  )
}
