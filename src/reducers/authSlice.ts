

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { IUsuario } from '../interfaces/';
import { AppThunk, RootState } from "../store/store";


export interface AuthState {
  usuario: IUsuario | null,
  checking: boolean,
  error: string | null;
  usuarios: IUsuario[];
  logged: boolean
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
  checking: true,
  error: null,
  usuarios: [],
  logged: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<IUsuario>) => {
      state.usuario = action.payload;
      state.checking = false;
      state.logged = true;
      state.usuario.online = true;
    },
    authLogout: (state) => {
      state.usuario!.online = false;
      state.usuario = null;
      state.checking = false;
      state.logged = false; 
    },
    authCheckingFinish: (state) => {
      state.checking = false
    },
    authError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    authUsuariosLoad: (state, action: PayloadAction<IUsuario[]>) => {
      state.usuarios = action.payload;
    },
    authUsuarioAdd: (state, action: PayloadAction<IUsuario>) => {
      state.usuarios.push(action.payload);
    },
    authUsuarioDelete: (state, action: PayloadAction<number>) => {
      state.usuarios = state.usuarios.filter(u => u.idUsuario === action.payload);
    },
    authUsuarioUpdate: (state, action: PayloadAction<IUsuario>) => {
      state.usuarios = state.usuarios.map(
        u => (u.idUsuario === action.payload.idUsuario)
        ? action.payload
        : u
        );
    },



  }

});





export const { authLogin, 
  authLogout, 
  authCheckingFinish, 
  authError,
  authUsuarioAdd,
  authUsuarioUpdate,
  authUsuarioDelete,
  authUsuariosLoad

} = authSlice.actions;

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
    dispatch(authError(body.msg))
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