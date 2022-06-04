

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoria } from '../interfaces/';
import { RootState } from "../store/store";


export interface CategoriasState {
  categorias: ICategoria[]
}

const initialState: CategoriasState = {
  categorias: []
};

export const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    categoriaAddNew: (state, action: PayloadAction<ICategoria>) => {
      state.categorias = [...state.categorias, action.payload]
    },
    categoriaUpdated: (state, action: PayloadAction<ICategoria>) =>{
      state.categorias = state.categorias.map(
        c => (c.idCategoria === action.payload.idCategoria) 
        ? action.payload
        : c 
      )
    },
    categoriaDeleted: (state, action: PayloadAction<number>) => {
      state.categorias = state.categorias.filter(
        c => c.idCategoria !== action.payload
      )
    },
    categoriaLoaded: (state, action: PayloadAction<ICategoria[]>) => {
      state.categorias = action.payload
    }

  }

});


export const {categoriaAddNew, categoriaDeleted, 
  categoriaLoaded, categoriaUpdated
} = categoriasSlice.actions;

export const selectCategorias = (state: RootState) => state.categorias;



export default categoriasSlice.reducer;