import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Grid, Button, Typography, useTheme } from '@mui/material';

// Componentes
import { FiltrosPedidos } from './';

import { pedidoStartAdded } from '../../actions/pedidos';

import { selectAuth, selectPedidos } from '../../reducers';
import { IUsuario } from '../../interfaces';
import { obtenerFechaActual } from '../../helpers/fecha';

import { Pedido } from './';
import { useAppDispatch } from '../../hooks/useRedux';

import { PageTitleWrapper } from '../ui/PageTitleWraper';
import { PageTitle } from '../ui/PageTitle';
import { ContadorPedidos } from './';
import { formatDistance } from 'date-fns';


export const Pedidos = () => {

  const dispatch = useAppDispatch();

  const [meseros, setMeseros] = useState<IUsuario[]>([]);
  const theme = useTheme();

  const { pedidos, fecha } = useSelector(selectPedidos);
  const { usuario } = useSelector(selectAuth);

  const aniadirPedido = () => {

    dispatch(pedidoStartAdded());
  }

  // Mostrar los pedidos de la fecha seleccionada
  return (

    <>
      <PageTitleWrapper>
        <PageTitle heading='Pedidos' />
      </PageTitleWrapper>

      <Grid container spacing={1}>
        <FiltrosPedidos />
        <Grid item xs={12}>
          <ContadorPedidos pedidos={pedidos} />

        </Grid>
      </Grid>


      {/* ESTADOS DE PEDIDOS */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => aniadirPedido()}
        disabled={fecha !== obtenerFechaActual()}
      >Añadir Pedido</Button>

      {
        /* Mensaje de no hay pedidos */
        !pedidos.length && (
          <Typography align='center' variant='body1'>No se encontraron pedidos de {/*  {formatDistance(new Date(`${fecha}`), new Date(), {
            addSuffix: true,
            includeSeconds: true,

          })} */}</Typography>
        )
      }

      {/* Lista de pedidos */}
      <Grid  mt={2} container spacing={1}>
        {
          pedidos.length > 0 &&
          pedidos.map(p => (
            <Pedido key={p.idPedido} pedido={p} />
          )
          )
        }
      </Grid>


    </>
  )

}
