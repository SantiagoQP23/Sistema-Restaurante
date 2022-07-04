

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { authUsuarioAdd, authUsuariosLoad } from "../reducers";
import { IUsuario } from "../interfaces";
import { toast } from "react-toastify";



export const usuarioStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

  try{
    const resp = await fetchConToken('auth/usuarios');
    const body = await resp.json();
  
    if (resp.ok) {
  
      dispatch(authUsuariosLoad(body.usuarios));
    }

  } catch (error) {
    console.log(error);
  }


};

export const usuarioStartAdd = ({ nombres, password, idCargo, nombreUsuario }: IUsuario): AppThunk => async (
  dispatch,
  getState) => {

  const resp = await fetchConToken(
    'auth/usuarios/crear',
    { nombres, password, idCargo, nombreUsuario },
    'POST');

  const body = await resp.json();

  if (resp.ok) {

    dispatch(authUsuarioAdd(body.usuario));
    toast.success(body.msg);

  } else {
    toast.error(body.errors[0].msg);

  }

};

export const usuarioStartDelete = (): AppThunk => async (
  dispatch,
  getState) => {

};

export const usuarioStartUpdate = (): AppThunk => async (
  dispatch,
  getState) => {

};
