import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, Box, Card, CardContent, styled, Avatar, useTheme } from '@mui/material';

// Componentes
import { FiltrosPedidos } from './';

import { pedidoStartAdded } from '../../actions/pedidos';

import { AuthState, PedidosState, selectAuth, selectPedidos } from '../../reducers';
import { IUsuario } from '../../interfaces';
import { obtenerFechaActual } from '../../helpers/fecha';

import { Pedido } from './';
import { useAppDispatch } from '../../hooks/useRedux';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import { PageTitleWrapper } from '../ui/PageTitleWraper';
import { PageTitle } from '../ui/PageTitle';


const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);


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
      </Grid>

      <Card>
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <ShoppingBagTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>

            <Box display="flex">
              <Box pr={6}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Total
                </Typography>
                <Typography variant="h2">{pedidos.length}</Typography>
              </Box>
              <Box pr={6}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Activos
                </Typography>
                <Typography variant="h2">{pedidos.filter(p => p.estado).length}</Typography>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Entregados
                </Typography>
                <Typography variant="h2">{pedidos.filter(p => !p.estado).length}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

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
          <Typography align='center' variant='body1'>No se encontraron pedidos de {fecha}</Typography>
        )
      }

      {/* Lista de pedidos */}
      <Grid width={"100%"} mt={2} container spacing={1}>
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
