import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import {
  Grid, Typography, Button, TextField, Box, FormControl, Card, CardContent, Paper, IconButton,
  InputBase,
  Container
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { SocketContext } from '../context/SocketContext';

// Componentes
import { DetallePedido } from '../components/Pedidos/DetallePedido';
import { DetallesState, PedidosState, pedidoUpdatedNombreCliente, selectDetalles, selectPedidos } from '../reducers';
import { detallesPedidoStartLoad } from '../actions/detallesPedido';
import { useAppDispatch } from '../hooks/useRedux';
import { PageTitleWrapper } from '../components/ui';
import { PageTitle } from '../components/ui/PageTitle';


export const EditarPedido = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { socket } = useContext(SocketContext);

  const { idPedido } = useParams();


  const { detalles } = useSelector(selectDetalles);
  const { pedidoActivo } = useSelector((selectPedidos));


  if (!pedidoActivo) {
    navigate('/pedidos');
  }

  const [cliente, setCliente] = useState<string>(pedidoActivo!.nombreCliente);


  async function cargarDetallesPedido(idPedido: number) {

    dispatch(detallesPedidoStartLoad(idPedido));

  }

  useEffect(() => {

    cargarDetallesPedido(pedidoActivo?.idPedido!);

    // eslint-disable-next-line
  }, [])



  const cambiarNombre = () => {

    socket.emit('cambiarNombreCliente', { idPedido, cliente }, (ok: boolean) => {
      if (ok) {
        dispatch(pedidoUpdatedNombreCliente(cliente));
      }

    });


  }



  return (
    <>

      <PageTitleWrapper>
        <PageTitle heading='Editar pedido' />
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
      </PageTitleWrapper>

      <Container maxWidth="lg">

        <Box display='flex' justifyContent='space-between' >
          <Box>
            <Button variant="outlined" color='error' aria-label="Eliminar pedido" >
              <DeleteIcon />
            </Button>

            <Button variant="contained" aria-label="estado pedido" >
              <DoneIcon />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('productos')}

            >

              <AddIcon />
              Añadir
            </Button>

          </Box>

          <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              id="input-nombre"
              defaultValue={cliente}
              onBlur={(e) => {
                setCliente(e.target.value)
              }}
              fullWidth
            />
            <IconButton
              color="primary"
              onClick={cambiarNombre}
              sx={{ p: '10px' }} aria-label="search">
              <SaveIcon />
            </IconButton>
          </Paper>
        </Box>


        <Box display='flex' justifyContent='space-between'>
          <Paper sx={{ p: '4px' }}>
            Total: {pedidoActivo?.total}

          </Paper>

        </Box>

        <Box>
          <Typography variant="h6" color="initial" align='center'>Detalles del pedido</Typography>
          <Grid container spacing={1}>
            {
              detalles.length > 0 && detalles.map(detalle => (

                <DetallePedido key={detalle.idDetallePedido}
                  detalle={detalle}
                  totalPedido={pedidoActivo!.total}
                />

              ))

            }

          </Grid>

        </Box>

      </Container>


    </>
  )
}

