


import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetallePedido } from '../interfaces/';
import { RootState } from '../store/store';


export interface DetallesState {
  detalles: IDetallePedido[],
  detalleActivo: IDetallePedido | null,
}

const initialState: DetallesState = {
  detalles: [],
  detalleActivo: null
};

export const detallesSlice = createSlice({
  name: 'detalles',
  initialState,
  reducers: {
    detalleSetActive: (state, action: PayloadAction<IDetallePedido>) => {
      state.detalleActivo = action.payload;
    },


    detalleAddNew: (state, action: PayloadAction<IDetallePedido>) => {
      state.detalles = [...state.detalles, action.payload]
    },
    detalleoUpdated: (state, action: PayloadAction<IDetallePedido>) => {
      state.detalles = state.detalles.map(
        d => (d.idDetallePedido === action.payload.idDetallePedido)
          ? action.payload
          : d
      )
    },
    detalleDeleted: (state, action: PayloadAction<number>) => {
      state.detalles = state.detalles.filter(
        d => d.idDetallePedido !== action.payload
      )
    },
    detalleLoaded: (state, action: PayloadAction<IDetallePedido[]>) => {
      state.detalles = action.payload
    },
    detalleUpdatedCantidad: (state, action: PayloadAction<number>) => {
      state.detalles = state.detalles.map(
        d => d.idDetallePedido === state.detalleActivo!.idDetallePedido
          ? {
            ...d,
            cantidad: action.payload,
            subtotal: d.producto.precio * action.payload
          } as IDetallePedido
          : d
      );

      state.detalleActivo = {
        ...state.detalleActivo!,
        cantidad: action.payload,
        subtotal: state.detalleActivo!.producto.precio * action.payload
      }
    },
   
  }
});

export const {detalleAddNew, detalleDeleted, detalleLoaded,
  detalleSetActive, detalleUpdatedCantidad, detalleoUpdated,
  
} = detallesSlice.actions;


export const selectDetalles = (state: RootState) => state.detalles;



export default detallesSlice.reducer;