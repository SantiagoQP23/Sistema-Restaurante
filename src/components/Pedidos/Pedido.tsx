import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { es } from 'date-fns/locale';


import { Grid, Box, Button, IconButton, Typography, ButtonGroup, Card, CardContent } from '@mui/material';

import { pedidoStartSetActive, pedidoStartDeleted, pedidoStartUpdatedEstado } from '../../actions/pedidos';

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { IPedido } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';
import { formatDistance } from 'date-fns';
import { Label } from '../ui';

import '../../styles/estilos-pedido.css';
import { SocketContext } from '../../context/SocketContext';
import { toast } from 'react-toastify';
import { pedidoDeleted } from '../../reducers';
import { DeleteOutline, DoneOutline, EditOutlined } from '@mui/icons-material';

interface Props {
  pedido: IPedido
}


export const Pedido: FC<Props> = ({ pedido }) => {

  const { socket } = useContext(SocketContext);



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

        socket?.emit('eliminarPedido', { idPedido: pedido.idPedido }, ({ok}: { ok: boolean }) => {

          console.log("Pedido eliminado", ok);

          if (!ok) {

            toast.error('No se pudo eliminar el pedido');
          }
        })
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

                {
                  pedido.estado
                    ? (<Label color='success'>Activo</Label>)
                    : (<Label color='error'>Finalizado</Label>)
                }

              </Box>

              <Box display='flex' justifyContent='space-between'>

                <Typography variant="subtitle2" >{pedido.usuario.nombres}</Typography>

                <Typography
                  variant="subtitle1"
                >
                  {formatDistance(new Date(`${pedido.fecha}T${pedido.hora}`), new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                    locale: es

                  })}
                </Typography>

              </Box>

              <Box display='flex' justifyContent='space-between'>

                <Box>
                  <IconButton
                    onClick={finalizarPedido}
                    color='success'
                  >
                    <DoneOutline />
                  </IconButton>

                  <IconButton
                    onClick={() => editarPedido()}
                    color='primary'
                  >
                    <EditOutlined />
                  </IconButton>

                  <IconButton
                    onClick={eliminarPedido}
                    color='error'
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>


               {/*  <ButtonGroup variant="outlined" >

                  <Button
                    aria-label="menu"
                    onClick={finalizarPedido}

                  >
                    <DoneIcon />
                  </Button>

                  <Button
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    onClick={eliminarPedido}
                    color='error'

                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup> */}

                <Typography variant="h6" >$ {pedido.total}</Typography>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Grid>



    </>
  )


}

