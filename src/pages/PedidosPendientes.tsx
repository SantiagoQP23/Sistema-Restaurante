import { useEffect, useState, useContext } from 'react';
import { Typography, Grid, Select, MenuItem, InputLabel, Box, FormControl, Divider, Card, CardContent, Badge, Tooltip, styled, Avatar, LinearProgress, useTheme, CardHeader, TextField } from '@mui/material';
import { fetchConToken } from '../helpers/fetch';
import { SocketContext } from '../context/SocketContext';
import { IDetallePedido, IDetallePendiente } from '../interfaces/pedidos';
import { IActualizarCantidadDetalle, IEliminarDetalle, INuevoDetallePendiente } from '../interfaces/sockets';



import { PageTitle } from '../components/ui/PageTitle';
import { PageTitleWrapper } from '../components/ui/PageTitleWraper';
import { DetallePendiente } from '../components/pedidosPendientes/DetallePendiente';
import { PedidoPendiente } from '../components/pedidosPendientes/';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {  selectPedidos } from '../reducers/pedidosSlice';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import { useFecha } from '../hooks/useFecha';
import { parsearFecha } from '../helpers/fecha';
import { useLocation, useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FiltrosPedidos } from '../components/Pedidos';
import queryString from 'query-string';
import { pedidoStartLoaded } from '../actions';


export const PedidosPendientes = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();


  const [detalles, setDetalles] = useState<IDetallePedido[]>([]);

  const{pedidos} = useAppSelector(selectPedidos);

  const { socket } = useContext(SocketContext);

  const obtenerDetalles = async () => {
    const resp = await fetchConToken('pedidos/detalles/pendientes');
    const body = await resp.json();

    if (resp.ok) {
      setDetalles(body.detalles);
    }
  }

   // Obtener la fecha del url
   let { fecha = '' } = queryString.parse(location.search);

   const { setFecha, fecha: fechaPedidos } = useFecha();
 
   const cargarPedidos = (fecha: string) => {
     dispatch(pedidoStartLoaded(fecha));
   }
 
   // Establecer la fecha de los pedidos a mostrar
   useEffect(() => {
     fecha
       ? setFecha(fecha[0]!)
       : setFecha();
 
   }, []);
 
   // Cargar los pedidos cuando cambia la fecha
   useEffect(() => {
 
     cargarPedidos(fechaPedidos);
 
     // eslint-disable-next-line 
   }, [fechaPedidos]);

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
        <FiltrosPedidos />
      </Grid>

      <Grid container spacing={1}>
       {pedidos.length > 0 && pedidos.map( p => (
         <PedidoPendiente pedido={p} key={p.idPedido} />

         ) 
       )}

      </Grid>

    </>

  )
}
