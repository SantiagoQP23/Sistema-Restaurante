import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Componentes
import { DetalleProducto } from '../components/Pedidos/DetalleProducto';
import AniadirProductosModal from '../components/Pedidos/AniadirProductosModal';

// Selectors
import { useModal, useProductos } from '../hooks';
import { PedidosState, selectPedidos } from '../reducers/pedidosSlice';
import { DetallesState, selectDetalles } from '../reducers/detallesPedidoSlice';
import { IDetallePedido, INuevoDetallePedido } from '../interfaces';
import { ShoppingCartOutlined } from '@mui/icons-material';


export const AniadirProductos: FC = () => {
  const navigate = useNavigate();

  const {
    secciones,
    categoriasSeccion,
    productosCategoria,
    cambiarSeccion,
    cambiarCategoria,
    seccion,
    categoria } = useProductos();

  const { isOpen: open, handleClickOpen, handleClose } = useModal(false);

  const { pedidoActivo } = useSelector(selectPedidos);
  const { detalles } = useSelector(selectDetalles);

  if (!pedidoActivo) {
    navigate('/pedidos')
  }

  const [detalle, setDetalle] = useState<INuevoDetallePedido | null >();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={3}>

        <Typography variant='h2'>Añadir productos</Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ShoppingCartOutlined /> $ {pedidoActivo!.total}
        </Button>

      </Box>


      <FormControl fullWidth>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3} >
            <InputLabel id='select-seccion'>Sección</InputLabel>
            <Select
              id='select-seccion'
              value={seccion}
              label="Seccion"
              margin='dense'
              onChange={(e) =>
                cambiarSeccion(Number(e.target.value))
              }
              fullWidth
             
            >
              {
                secciones.length > 0 && secciones.map(seccion =>
                (
                  <MenuItem key={seccion.idSeccion!} value={seccion.idSeccion!}>{seccion.nombreSeccion}</MenuItem>

                )
                )}

            </Select>

          </Grid>
          <Grid item xs={12} md={6} lg={3} >
            <Select
              id='select-categoria'
              value={categoria}
              label="categoria"
              onChange={(e => {
                cambiarCategoria(Number(e.target.value))

              })}
              fullWidth
             

            >

              {
                categoriasSeccion.length > 0 && categoriasSeccion.map(cat =>
                (
                  <MenuItem key={cat.idCategoria!} value={cat.idCategoria!}>{cat.nombreCategoria}</MenuItem>

                )
                )}

            </Select>


          </Grid>


        </Grid>

      </FormControl>


      <Grid container spacing={1} mt={1}>

        {productosCategoria.length > 0 && productosCategoria.map(producto => (
          <Grid item xs={12} sm={6} md={4} xl={3} >
            <DetalleProducto
              key={producto.idProducto}
              producto={producto}
              abrirModal={handleClickOpen}
              setDetalle={setDetalle}
            />
          </Grid>

        ))
        }


      </Grid>

      {
        detalle && (
          <AniadirProductosModal
    
           handleClose={handleClose}
            open={open}
            detalle={detalle!}
    
          />

        )
      }

    </>
  )
}


