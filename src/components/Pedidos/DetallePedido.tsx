import { FC, useContext } from 'react';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { Box, IconButton, Typography, TextField, Button, ButtonGroup, Grid, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCounter } from '../../hooks/useCounter';

import { SocketContext } from '../../context/SocketContext';
import { IDetallePedido, INuevoDetallePedido } from '../../interfaces';
import { ICallbackSocket } from '../../interfaces/sockets';
import { detalleDeleted, detalleSetActive, detalleUpdatedCantidad, pedidoUpdateTotal} from '../../reducers';

interface Props {
  detalle: IDetallePedido;
  totalPedido: number;
}

export const DetallePedido: FC<Props> = ({ detalle, totalPedido }) => {

  const { idPedido } = useParams();

  const dispatch = useDispatch();

  const { state: counter, increment, decrement } = useCounter(detalle.cantidad);

  const { socket } = useContext(SocketContext);


  const eliminarDetalle = () => {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(detalle.idDetallePedido);

        const detalleEliminar = {
          idDetallePedido: detalle.idDetallePedido, 
          idPedido
        }

        socket.emit('eliminarDetalle',  detalleEliminar , ({ok}: ICallbackSocket) => {

          // TODO leer el ok en el callbacke
            if(ok){
              // TODO Eliminar el detalle de pedido
              dispatch( detalleDeleted( detalle.idDetallePedido));
              
              dispatch( pedidoUpdateTotal( Number(totalPedido) - Number(detalle.subtotal) ))

            }

        }
        )


      }
    })



  }

  const actualizarDetalle = () => {
  
    const cantidad = Math.abs(counter - detalle.cantidad);

    const detalleActualizar = {
      idDetallePedido: detalle.idDetallePedido,
      idPedido,
      cantidad: counter,
      descripcion: ''

    }

    socket.emit('actualizarCantidadDetalle', { detalleActualizar }, (data: ICallbackSocket) => {
      
      // TODO leer el ok en el callback
      if (data.ok){
        // TODO Activar el detalle de pedido
        dispatch( detalleSetActive(detalle));

        // TODO Actualizar la cantidad del detalle
        dispatch( detalleUpdatedCantidad( counter ));

        const subtotal = cantidad * detalle.producto.precio;
        const aumentar = counter > detalle.cantidad;

        // TODO Actualizar el subtotal del pedido
        const total = aumentar 
        ? Number(totalPedido) + Number(subtotal)
        : Number(totalPedido) - Number(subtotal);

        dispatch( pedidoUpdateTotal(total));
      }

    })

  }

  return (
    <>

      <Grid item xs={12} md={6} lg={4}>

        <Box className='caja-detalle' >
          <Card>
            <CardContent>


              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                
                  <Typography
                    variant="h6"
                    color="initial">
                    {detalle.producto.nombre}
                  </Typography>

                  <IconButton
                    aria-label="Eliminar detalle"
                    onClick={eliminarDetalle}
                    disabled={!detalle.estado}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>

               
              </Box>


              <Typography variant="body2" color="initial">
                {detalle.producto.descripcion}
              </Typography>

              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }} mt={2}>
                  <Typography variant="body1" color="initial">
                    $ {detalle.producto.precio}

                  </Typography>

                </Box>

                <Box alignContent="right" >
                  <ButtonGroup size='small' variant="text" >
                    <Button
                      aria-label=""
                      onClick={decrement}
                      color='primary'
                      variant='outlined'

                    >
                      <RemoveIcon color='primary' />

                    </Button>

                    <Box sx={{ width: 60, display: "inline-block" }} >
                      <TextField
                        id="cantidad"
                        value={counter}
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: 'center', border: 'none' } }}

                      />

                    </Box>

                    <Button
                      aria-label=""
                      onClick={increment}
                      color='primary'
                      variant='outlined'

                    >
                      <AddIcon color='primary' />
                    </Button>



                    <Button
                      type="submit"
                      className="btn-submit"
                      disabled={!counter || counter === detalle.cantidad}
                      color='primary'
                      variant='outlined'
                      onClick={() => actualizarDetalle()}
                    >
                      <SaveIcon />
                    </Button>

                  </ButtonGroup>



                </Box>
              </Box>

              <Typography variant="h6">$ {detalle.subtotal}</Typography>
            </CardContent>
          </Card>

        </Box>
      </Grid>
    </>
  )
}
