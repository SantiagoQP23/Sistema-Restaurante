



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducto } from '../interfaces/';
import { RootState } from "../store/store";


export interface ProductosState {
  productos: IProducto[]
}

const initialState: ProductosState = {
  productos: []
};

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    productoAddNew: (state, action: PayloadAction<IProducto>) => {
      state.productos = [...state.productos, action.payload]
    },
    productoUpdated: (state, action: PayloadAction<IProducto>) =>{
      state.productos = state.productos.map(
        p => (p.idProducto === action.payload.idProducto) 
        ? action.payload
        : p 
      )
    },
    productoDeleted: (state, action: PayloadAction<number>) => {
      state.productos = state.productos.filter(
        p => p.idProducto !== action.payload
      )
    },
    productoLoaded: (state, action: PayloadAction<IProducto[]>) => {
      state.productos = action.payload
    }

  }

});

export const {productoAddNew, productoDeleted, productoLoaded,
  productoUpdated
} = productosSlice.actions;

export const selectProductos = (state: RootState) => state.productos;


export default productosSlice.reducer;