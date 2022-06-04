

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { IUsuario } from '../interfaces/';
import { AppThunk, RootState } from "../store/store";


export interface AuthState {
  usuario: IUsuario | null,
  checking: boolean
}
/*
usuario:  idUsuario: 1,
 nombreUsuario: "Nombre del usuario",
 nombres: "No se ha iniciado sesión",
 
 cargo: {
   idCargo: 1,
   nombre: 'Admin',
   descripcion: 'alsdjl',
 }} */

const initialState: AuthState = {
  usuario: null,
  checking: true
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<IUsuario>) => {
      state.usuario = action.payload;
      state.checking = false;
    },
    authLogout: (state) => {
      state.usuario = null;
      state.checking = false;
    },
    authCheckingFinish: (state) => {
      state.checking = false
    }

  }

});





export const { authLogin, authLogout, authCheckingFinish } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;


export const startLogin = (nombreUsuario: string, password: string): AppThunk => async (
  dispatch,
  getState) => {


  const resp = await fetchSinToken('auth/login', {
    nombreUsuario, password
  }, 'POST')

  const body = await resp.json();

  if (resp.ok) {

    localStorage.setItem('x-token', body.token);
    dispatch(authLogin(body.usuario))

  } else {
    console.log('Error', body.msg, 'error');
  }

};


export const startChecking = (): AppThunk => async (
  dispatch,
  getState) => {

  const resp = await fetchConToken('auth/renew');
  const body = await resp.json();

  if (resp.ok) {
    // Grabar el nuevo token en la memoria
    localStorage.setItem('x-token', body.token);

    const usuario = body.usuario as IUsuario;
    // Establecer informacion del usuario
    dispatch(authLogin(usuario));

  } else {
    console.log("Finalizando chequeo")
    dispatch(authCheckingFinish())

  }
};

export const startLogout = (): AppThunk => async (
  dispatch,
  getState) => {

  localStorage.removeItem('x-token');
  dispatch(authLogout());

};






export default authSlice.reducer;