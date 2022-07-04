

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeccion } from '../interfaces/';
import { RootState } from "../store/store";


export interface SeccionesState {
  secciones: ISeccion[],
  seccionActiva: ISeccion | null,
}

const initialState: SeccionesState = {
  secciones: [],
  seccionActiva: null
};

export const seccionesSlice = createSlice({
  name: 'secciones',
  initialState,
  reducers: {
    seccionAddNew: (state, action: PayloadAction<ISeccion>) => {
      state.secciones = [...state.secciones, action.payload]
    },
    seccionUpdated: (state, action: PayloadAction<ISeccion>) =>{
      state.secciones = state.secciones.map(
        p => (p.idSeccion === action.payload.idSeccion) 
        ? action.payload
        : p 
      )
    },
    seccionDeleted: (state, action: PayloadAction<number>) => {
      state.secciones = state.secciones.filter(
        p => p.idSeccion !== action.payload
      )
    },
    seccionLoaded: (state, action: PayloadAction<ISeccion[]>) => {
      state.secciones = action.payload
    },
    seccionSetActive: (state, action: PayloadAction<ISeccion>) => {
      state.seccionActiva = action.payload
    }
  }

});


export const {seccionDeleted, seccionLoaded, 
  seccionUpdated, seccionAddNew,
  seccionSetActive
} = seccionesSlice.actions;

export const selectSecciones = (state: RootState) => state.secciones;

export default seccionesSlice.reducer;