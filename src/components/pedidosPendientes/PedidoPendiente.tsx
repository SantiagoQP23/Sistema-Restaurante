import { FC, useState } from 'react'
import { formatDistance} from 'date-fns';

import { Card, CardHeader, Grid, CardContent, Box, Divider } from '@mui/material';

import { IPedido } from '../../interfaces'
import { IDetallePedido } from '../../interfaces/pedidos';

import { useModal } from '../../hooks';

import { Modal } from '../EditarMenu';
import { DetallePendiente, DespachoDetalle} from './';

interface Props {
  pedido: IPedido;
}

export const PedidoPendiente: FC<Props> = ({ pedido }) => {

  const [detalleActivo, setDetalleActivo] = useState<null | IDetallePedido>(null);
  
  const detalles = pedido.detalles;
  const {isOpen, handleClose, handleClickOpen } = useModal();


  const despacharDetalle = (detalle: IDetallePedido) => {
    setDetalleActivo(detalle);
    handleClickOpen();
  }

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

            <DetallePendiente detalle={det} key={det.idDetallePedido} despachar={despacharDetalle}/>

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
        <DespachoDetalle  handleClose={handleClose} detalle={detalleActivo!} />
      </Modal>
    </>

  )
}
