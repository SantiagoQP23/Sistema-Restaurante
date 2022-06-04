
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Card, CardContent, Typography, Button, TextField, Box, ButtonGroup } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import { Producto } from '../Menu/';
import { useCounter } from '../../hooks/useCounter';
import { IProducto } from '../../interfaces';
import { INuevoDetallePedido } from '../../interfaces/pedidos';
import { PedidosState, selectPedidos } from '../../reducers';

interface Props {
  producto: IProducto;
  abrirModal: () => void;
  setDetalle: (detalle: INuevoDetallePedido) => void;
}

export const DetalleProducto: FC<Props> = ({ producto, abrirModal, setDetalle }) => {

  const { pedidoActivo } = useSelector(selectPedidos);

  const { state: counter, increment, decrement } = useCounter(1);

  const [subtotal, setSubtotal] = useState(counter * producto.precio);


  useEffect(() => {
    setSubtotal(counter * producto.precio);

  }, [counter])


  return (
    <>


      <Producto key={producto.idProducto} producto={producto} />


      <Box display='flex' bgcolor='#fff' p={1} justifyContent='space-between'>


        <Typography variant="h6" > $ {subtotal}</Typography>

        <ButtonGroup variant="contained" size='small'>
          <Button
            aria-label="añadir"
            variant="contained"
            color="primary"
            onClick={() => {
              setDetalle({
                idPedido: pedidoActivo!.idPedido,
                cantidad: counter,
                descripcion: '',
                subtotal,
                producto,
              })
              abrirModal();
            }}
            disabled={counter <= 0}
          >

            <ShoppingCartIcon />
          </Button>
          <Button
            aria-label="añadir"
            variant="contained"
            color="primary"
            onClick={increment}
          >
            <AddIcon />
          </Button>

          <Box sx={{ width: 80, display: "inline-block" }} >
            <TextField
              id="cantidad"
              value={counter}
              type="number"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}

            />

          </Box>
          <Button
            aria-label="quitar"
            variant="contained"
            color="primary"
            onClick={decrement}

          >
            <RemoveIcon />
          </Button>
        </ButtonGroup>
      </Box>




    </>
  )
}
