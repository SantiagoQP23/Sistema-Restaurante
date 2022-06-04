import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


import { Grid, Box, Button, IconButton, Typography, ButtonGroup, Card, CardContent } from '@mui/material';

import { pedidoStartSetActive, pedidoStartDeleted, pedidoStartUpdatedEstado } from '../../actions/pedidos';

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

import { parsearFecha } from '../../helpers/fecha';

import '../../styles/estilos-pedido.css';

import { IPedido } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';

interface Props {
  pedido: IPedido
}


export const Pedido: FC<Props> = ({ pedido }) => {


  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const eliminarPedido = () => {

    Swal.fire({
      title: '¿Quieres eliminar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("Eliminando el pedido: ", pedido.idPedido);
        dispatch(pedidoStartDeleted(pedido.idPedido));
      }
    })
  }

  const finalizarPedido = () => {

    Swal.fire({
      title: '¿Quieres finalizar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Finalizar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("finalizar el pedido: ", pedido.idPedido);
        dispatch(pedidoStartUpdatedEstado(pedido.idPedido));
      }
    })
  }

  const editarPedido = () => {
    dispatch(pedidoStartSetActive(pedido));
    navigate(`/pedidos/editar/${pedido.idPedido}`);

  }


  return (

    <>

      <Grid item xs={12} md={6} lg={4}  >
        <Box >

          <Card>
            <CardContent>

              <Box display='flex' justifyContent='space-between'>

                <Typography variant="body1" >Cliente: {pedido.nombreCliente}</Typography>
                <Typography variant="subtitle2" >{pedido.estado ? 'activo' : 'finalizado'}</Typography>

              </Box>

              <Box display='flex' justifyContent='space-between'>

                <Typography variant="subtitle2" >{pedido.usuario.nombres}</Typography>

                <Typography variant="subtitle1"> {parsearFecha(pedido.fecha)}</Typography>

              </Box>

              <Box display='flex' justifyContent='space-between'>


                <ButtonGroup variant="outlined" >

                  <Button
                    aria-label="menu"
                    onClick={finalizarPedido}

                  >
                    <DoneIcon />
                  </Button>

                  <Button
                    onClick={() => editarPedido()}
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    onClick={eliminarPedido}
                    color='error'

                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>

                <Typography variant="h6" >$ {pedido.total}</Typography>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Grid>



    </>
  )


}

