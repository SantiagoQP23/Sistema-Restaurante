import { IProducto, IUsuario } from './';




export interface IPedido {

  idPedido: number,
  total: number,
  fecha: Date,
  nombreCliente: string,
  estado: boolean,
  hora: Date,
  usuario: IUsuario;
}

interface IUsuarioDetalle{
  nombres: string;
}

export interface IPedidoPendiente{
  nombreCliente: string;
  usuario: IUsuarioDetalle;
}

export interface IDetallePendiente{
  idDetallePedido: number,
  producto: IProducto,
  cantidad: number,
  subtotal: number,
  hora: Date,
  estado: boolean,
  descripcion: string,
  cantEntregada: number,
  pedido: IPedidoPendiente
  
  idPedido: number,

}



export interface IDetallePedido{
  idDetallePedido: number,
  producto: IProducto,
  cantidad: number,
  subtotal: number,
  hora: Date,
  estado: boolean,
  descripcion: string,
  cantEntregada: number,

  idPedido: number,
}


export interface INuevoDetallePedido{
  idDetallePedido?: number,
  producto: IProducto,
  cantidad: number,
  descripcion: string,
  subtotal?: number,
  hora?: Date,
  estado?: boolean,
  cantEntregada?: number,

  idPedido: number,
}