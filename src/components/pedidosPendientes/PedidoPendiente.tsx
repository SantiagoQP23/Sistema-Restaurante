import { FC, useContext, useEffect, useState } from 'react'
import { formatDistance } from 'date-fns';

import { Card, CardHeader, Grid, CardContent, Box, Divider } from '@mui/material';

import { IPedido } from '../../interfaces'
import { IDetallePedido } from '../../interfaces/pedidos';

import { useModal } from '../../hooks';

import { Modal } from '../EditarMenu';
import { DetallePendiente, DespachoDetalle } from './';
import { SocketContext } from '../../context/SocketContext';
import { IActualizarCantidadDetalle, IEliminarDetalle } from '../../interfaces/sockets';
import { pedidoSetActive } from '../../reducers';



interface Props {
  pedido: IPedido;
}

export const PedidoPendiente: FC<Props> = ({ pedido }) => {


  const { socket } = useContext(SocketContext);

  const [detalleActivo, setDetalleActivo] = useState<null | IDetallePedido>(null);

  const [detalles, setDetalles] = useState<IDetallePedido[]>(pedido.detalles);

  const { isOpen, handleClose, handleClickOpen } = useModal();


  const despacharDetalle = (detalle: IDetallePedido) => {
    setDetalleActivo(detalle);
    handleClickOpen();

    



  }

  useEffect(() => {

    socket?.on('nuevoDetalle', ({ nuevoDetalle }: { nuevoDetalle: IDetallePedido }) => {

      if (pedido.idPedido === nuevoDetalle.idPedido) {
        setDetalles(detalles => [...detalles, nuevoDetalle]);

      }

    });

    return () => {
      socket?.off('nuevoDetalle');
    }

  }, [socket]);


  useEffect(() => {

    socket?.on('eliminarDetalle', ({ idDetallePedido, idPedido }: { idDetallePedido: number, idPedido: number }) => {

      console.log("Eliminando un detalle pedido");
      if (pedido.idPedido === idPedido) {
        setDetalles(detalles => detalles.filter(detalle => detalle.idDetallePedido !== idDetallePedido));

      }

    });

    return () => {
      socket?.off('eliminarDetalle');
    }

  }, [socket]);


  useEffect(() => {

    socket?.on('actualizarCantidadDetalle', ({ detalle }: { detalle: IDetallePedido }) => {

      console.log("Actualizando");

      const { idDetallePedido } = detalle;
      if (pedido.idPedido === detalle.idPedido) {

        setDetalles(detalles => detalles.map(det => {
          if (det.idDetallePedido === idDetallePedido) {
            return detalle
          }
          return det
        }));

      }

      return () => {
        socket?.off('actualizarCantidadDetalle');
      }

    });

  }, [socket]);

  useEffect(() => {

    socket?.on('despacharDetalle', ({ detalle }: { detalle: IDetallePedido }) => {

      console.log("Actualizando");

      const { idDetallePedido } = detalle;
      if (pedido.idPedido === detalle.idPedido) {

        setDetalles(detalles => detalles.map(det => {
          if (det.idDetallePedido === idDetallePedido) {
            return detalle
          }
          return det
        }));

      }

      return () => {
        socket?.off('despacharDetalle');
      }

    });

  }, [socket]);



  return (
    <>
      <Grid item lg={4} xs={12}>

        <Card>
          <CardHeader
            title={pedido.nombreCliente}
            subheader={pedido.usuario.nombres}
          />
          <Divider />
          <CardContent>

            {detalles.length > 0 && detalles!.map(det => (

              <DetallePendiente detalle={det} key={det.idDetallePedido} despachar={despacharDetalle} />

            ))}
          </CardContent>

          <Divider />
          <Box p={2} >

            {formatDistance(new Date(`${pedido.fecha}T${pedido.hora}`), new Date(), {
              addSuffix: true,
              includeSeconds: true,

            })}
          </Box>

        </Card>
      </Grid>
      {/* 
        <DespachoDetalle detalle={detalleActivo!} handleClose={handleClose} />
      */}
      <Modal open={isOpen} closeModal={handleClose}>
        <DespachoDetalle handleClose={handleClose} detalle={detalleActivo!} />
      </Modal>
    </>

  )
}
