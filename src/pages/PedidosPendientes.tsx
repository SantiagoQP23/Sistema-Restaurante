import { useEffect, useState, useContext } from 'react';
import { Typography, Grid, Select, MenuItem, InputLabel, Box, FormControl, Divider, Card, CardContent, Badge, Tooltip, styled, Avatar, LinearProgress, useTheme, CardHeader } from '@mui/material';
import { fetchConToken } from '../helpers/fetch';
import { SocketContext } from '../context/SocketContext';
import { IDetallePedido, IDetallePendiente } from '../interfaces/pedidos';
import { IActualizarCantidadDetalle, IEliminarDetalle, INuevoDetallePendiente } from '../interfaces/sockets';


import { formatDistance, subDays, subMinutes, subHours } from 'date-fns';
import Text from '../components/ui/Text';
import { PageTitle } from '../components/ui/PageTitle';
import { PageTitleWrapper } from '../components/ui/PageTitleWraper';

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);


export const PedidosPendientes = () => {

  const [detalles, setDetalles] = useState<IDetallePendiente[]>([]);

  const { socket } = useContext(SocketContext);

  const obtenerDetalles = async () => {
    const resp = await fetchConToken('pedidos/detalles/pendientes');
    const body = await resp.json();

    if (resp.ok) {
      setDetalles(body.detalles);
    }
  }

  // MOSTRAR UN NUEVO DETALLE

  useEffect(() => {

    socket.on('nuevoDetalle', ({ nuevoDetalle }: INuevoDetallePendiente) => {

      setDetalles(detalles => [...detalles, nuevoDetalle]);

    });

    return () => {
      socket.off('nuevoDetalle');
    }

  }, [socket]);


  // ELIMINAR UN DETALLE
  useEffect(() => {

    socket.on('eliminarDetalle', ({ idDetallePedido }: IEliminarDetalle) => {

      setDetalles(detalles => detalles.filter(detalle => detalle.idDetallePedido !== idDetallePedido));

    });

    return () => {
      socket.off('eliminarDetalle');
    }

  }, [socket]);

  // ACTUALIZAR LA CANTIDAD DE UN DETALLE
  useEffect(() => {

    socket.on('actualizarCantidadDetalle', ({ detalle }: IActualizarCantidadDetalle) => {

      const { idDetallePedido } = detalle;

      setDetalles(detalles => detalles.map(det => {
        if (det.idDetallePedido === idDetallePedido) {
          return detalle
        }
        return det
      }));

      return () => {
        socket.off('actualizarCantidadDetalle');
      }

    });

  }, [socket]);




  useEffect(() => {

    obtenerDetalles();
  }, []);


  return (
    <>

      <PageTitleWrapper>
        <PageTitle heading='Pedidos Pendientes' />
      </PageTitleWrapper>

      {/* Filtro por mesero */}
      <Grid container spacing={1} mb={2}>
        <Grid item xs={12} md={4} xl={3}>

          <FormControl fullWidth>
            <InputLabel >Meseros</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Age"

            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Todos</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>


      <Grid container spacing={1}>
        {
          detalles.length > 0 && detalles.map(det => (

            <Grid key={det.idDetallePedido} item xs={12} md={6} lg={4}>

              <Card sx={{ p: 2.5 }}>

                <Box display="flex" justifyContent="space-between">

                  <Box sx={{ ml: 1.5 }}>
                    <Typography variant="h4" noWrap gutterBottom>
                      {det.pedido.nombreCliente}
                    </Typography>
                  </Box>
                  <Box>

                    <Typography variant="subtitle2" noWrap>
                      {det.pedido.usuario.nombres}
                    </Typography>

                  </Box>

                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" alignItems="center" pb={3} justifyContent="space-between">

                  <Box sx={{ ml: 1.5 }}>
                    <Typography variant="h4" noWrap gutterBottom>
                      {det.cantidad}  {det.producto.nombre}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {det.descripcion}
                    </Typography>
                  </Box>

                  <Box>
                    {formatDistance(subDays(new Date(), 14), new Date(), {
                      addSuffix: true
                    })}

                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  <Text color="black">{det.cantEntregada}</Text> out of{' '}
                  <Text color="black">{det.cantidad}</Text> tasks completed
                </Typography>
                <LinearProgressWrapper
                  value={(det.cantEntregada * 100) / det.cantidad}
                  color="primary"
                  variant="determinate"
                />
              </Card>

            </Grid>
          ))
        }
      </Grid>
    </>

  )
}
