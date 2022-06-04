import { INuevoDetallePedido } from './';
import { IDetallePedido, IDetallePendiente } from './pedidos';

export interface IPedidoNombreCliente {
  idPedido: number,
  cliente: String
}

export interface INuevoDetalle {
  nuevoDetalle: IDetallePendiente,
  ok?: boolean
}

export interface IEliminarDetalle {
  idDetallePedido: number;
  idPedido?: number;
}

export interface IActualizarEstadoDetalle {
  idDetallePedido: number;
  cantEntregada: number;
}

export interface IActualizarCantidadDetalle {
  detalle: IDetallePendiente;
}

export interface ICallbackSocket{
  ok: boolean;
}


export interface IEliminarDetalle {
  idDetallePedido: number;
  idPedido?: number;
}

export interface INuevoDetallePendiente{
  nuevoDetalle: IDetallePendiente;
}



export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  nuevoDetalle: (detalle: IDetallePedido) => void;
  eliminarDetalle: (data: IEliminarDetalle) => void;
  actualizarCantidadDetalle: (data: IActualizarCantidadDetalle) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  cambiarNombreCliente: (data: IPedidoNombreCliente) => void;
  nuevoDetalle: (data: INuevoDetalle, callback: (data: INuevoDetalle) => void) => void;
  eliminarDetalle: (data: IEliminarDetalle, callback: () => void) => void;
  actualizarCantidadDetalle: (data: IActualizarCantidadDetalle, callback: () => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}