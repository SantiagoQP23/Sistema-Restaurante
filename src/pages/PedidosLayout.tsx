import { useContext, useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";

import queryString from 'query-string';
import { Container } from '@mui/material';

import { pedidoStartLoaded } from '../actions/pedidos';

import { useFecha } from '../hooks/useFecha';
import { useAppDispatch } from '../hooks/useRedux';

import { Footer } from '../components/ui/';
import { SocketContext } from '../context/SocketContext';
import { IPedido } from '../interfaces';
import { pedidoAddNew, pedidoDeleted } from '../reducers';
import { toast } from 'react-toastify';

export const PedidosLayout = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();

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


  const { socket } = useContext(SocketContext);

  useEffect(() => {

    socket?.on('nuevoPedido', ({ pedido }: { pedido: IPedido }) => {


      dispatch(pedidoAddNew(pedido))
      toast.success("Se ha añadido un nuevo pedido");

    });

    return () => {
      socket?.off('nuevoPedido');
    }
    
  }, [socket]);

  useEffect(() => {

    socket?.on('eliminarPedido', ({ idPedido }: { idPedido: number }) => {

      dispatch(pedidoDeleted(idPedido));
      toast.success("Se ha eliminado un  pedido");

    });

    return () => {
      socket?.off('eliminarPedido');
    }
    
  }, [socket]);

  





  




  return (
    <>
     
      <Container maxWidth="lg">
        <Outlet />

      </Container>
      {/* <Footer /> */}

    </>
  )
}
