




import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPedido } from '../interfaces/';
import { RootState } from "../store/store";
import { IDetallePedido } from '../interfaces/pedidos';


export interface PedidosState {
  pedidos: IPedido[]
  pedidoActivo: IPedido | null;
  fecha: string;
  detalleActivo: IDetallePedido | null;
}

const initialState: PedidosState = {
  pedidos: [],
  pedidoActivo: null,
  fecha: '',
  detalleActivo: null
};

export const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {

    pedidoSetActive: (state, action: PayloadAction<IPedido>) => {
      state.pedidoActivo = action.payload;
    },

    pedidoAddNew: (state, action: PayloadAction<IPedido>) => {
      state.pedidos = [...state.pedidos, action.payload]
    },

    pedidoUpdated: (state, action: PayloadAction<IPedido>) => {
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === action.payload.idPedido)
          ? action.payload
          : p
      )
    },

    pedidoDeleted: (state, action: PayloadAction<number>) => {
      state.pedidos = state.pedidos.filter(
        p => p.idPedido !== action.payload
      )
    },

    pedidoLoaded: (state, action: PayloadAction<IPedido[]>) => {
      state.pedidos = action.payload
    },

    pedidoUpdateTotal: (state, action: PayloadAction<number>) => {
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, total: action.payload }
          : p
      )
      state.pedidoActivo = { ...state.pedidoActivo!, total: action.payload }
    },

    pedidoSetFecha: (state, action: PayloadAction<string>) => {
      state.fecha = action.payload;
    },

    pedidoUpdatedCliente: (state, action: PayloadAction<string>) => {
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p
      );
      state.pedidoActivo = { ...state.pedidoActivo!, nombreCliente: action.payload };
    },

    pedidoUpdatedEstado: (state, action: PayloadAction<boolean>) => {
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, estado: action.payload }
          : p

      );
      state.pedidoActivo = { ...state.pedidoActivo!, estado: action.payload };
    },

    pedidoUpdatedNombreCliente: (state, action: PayloadAction<string>) => {
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p

      );
      state.pedidoActivo = { ...state.pedidoActivo!, nombreCliente: action.payload };

    },

    pedidoUpdateDetalles: (state, action: PayloadAction<IDetallePedido[]>) => {

      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, detalles: action.payload }
          : p
      )
      state.pedidoActivo = { ...state.pedidoActivo!, detalles: action.payload }
    },

    pedidoDetalleAddNew: (state, action: PayloadAction<IDetallePedido>) => {

      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? { ...p, detalles: [...state.pedidoActivo!.detalles, action.payload] }
          : p
      );

      state.pedidoActivo = {
        ...state.pedidoActivo!, detalles: [...state.pedidoActivo!.detalles, action.payload]
      }
    },

    pedidoDetalleDeleted: (state, action: PayloadAction<number>) => {

      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? {
            ...p, detalles: state.pedidoActivo!.detalles.filter(
              d => d.idDetallePedido !== action.payload
            )
          }
          : p
      );

      state.pedidoActivo = {
        ...state.pedidoActivo!, detalles: state.pedidoActivo!.detalles.filter(
          d => d.idDetallePedido !== action.payload
        )
      }

    },

    pedidoDetalleCantidad: (state, action: PayloadAction<number>) => {
      const detalles = state.pedidoActivo!.detalles;
      const subtotal = state.detalleActivo!.producto.precio * action.payload;
      const cantidad = action.payload;
      state.pedidos = state.pedidos.map(
        p => (p.idPedido === state.pedidoActivo?.idPedido)
          ? {
            ...p, detalles: detalles.map(
              d => d.idDetallePedido === state.detalleActivo!.idDetallePedido
                ? {
                  ...d,
                  cantidad,
                  subtotal
                } as IDetallePedido
                : d
            )
          }
          : p
      );

      state.pedidoActivo = {
        ...state.pedidoActivo!, detalles: detalles.map(
          d => d.idDetallePedido === state.detalleActivo!.idDetallePedido
            ? {
              ...d,
              cantidad,
              subtotal
            } as IDetallePedido
            : d
        )
      }

      state.detalleActivo = {
        ...state.detalleActivo!,
        cantidad,
        subtotal
      }

    },
    pedidoDetalleActivo: (state, action: PayloadAction<IDetallePedido>) => {
      state.detalleActivo = action.payload;
    },










  }

});
export const { pedidoAddNew, pedidoDeleted, pedidoLoaded,
  pedidoSetActive, pedidoSetFecha, pedidoUpdated, pedidoUpdatedCliente,
  pedidoUpdatedEstado, pedidoUpdatedNombreCliente, pedidoUpdateTotal, pedidoUpdateDetalles,
  pedidoDetalleAddNew, pedidoDetalleDeleted, pedidoDetalleActivo, pedidoDetalleCantidad

} = pedidosSlice.actions;


export const selectPedidos = (state: RootState) => state.pedidos;





export default pedidosSlice.reducer;