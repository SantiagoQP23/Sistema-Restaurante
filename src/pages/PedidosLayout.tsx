import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";

import queryString from 'query-string';
import { Container } from '@mui/material';

import { pedidoStartLoaded } from '../actions/pedidos';

import { useFecha } from '../hooks/useFecha';
import { useAppDispatch } from '../hooks/useRedux';

import { Footer } from '../components/ui/';

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

  return (
    <>
     
      <Container maxWidth="lg">
        <Outlet />

      </Container>
      <Footer />

    </>
  )
}
