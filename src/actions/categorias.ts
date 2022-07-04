import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { categoriaAddNew, categoriaDeleted, categoriaLoaded, categoriaUpdated } from "../reducers";
import { ICategoria } from "../interfaces";
import { toast } from "react-toastify";

// Añadir una nueva categoria
export const categoriaStartCreated = (categoria: ICategoria): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/categorias/crear`, categoria, 'POST');
    const body = await resp.json();


    if (resp.ok) {


      dispatch(categoriaAddNew(body.categoria));
      toast.success(body.msg)

    } else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error)
  }

};

// Actualizar una categoria
export const categoriaStartUpdate = (categoria: ICategoria): AppThunk => async (
  dispatch,
  getState) => {
    try {
      const resp = await fetchConToken(`menu/categorias/actualizar/${categoria.idCategoria}`, categoria, "PUT");
      const body = await resp.json();

      if(resp.ok) {
        dispatch( categoriaUpdated(categoria));
        toast.success(body.msg)
      }else{
        toast.error(body.errors[0].msg);
      }

    } catch (error) {
      console.log(error)
    }
};

// Eliminar una categoria
export const categoriaStartDelete = (idCategoria: number): AppThunk => async (
  dispatch,
  getState) => {
    try {
      const resp = await fetchConToken(`menu/categorias/eliminar/${idCategoria}`, { } , 'DELETE');
      const body = await resp.json();
  
      if(resp.ok){
        dispatch( categoriaDeleted(idCategoria));
        toast.success(body.msg)

      }else {
        toast.error(body.errors[0].msg);
      }
      
    } catch (error) {
      console.log(error);
    }    


};

// Cargar las categorias
export const categoriaStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

    try {

      const resp = await fetchConToken('menu/categorias');
      const body = await resp.json();
      const categorias = body.categorias as ICategoria[];

      dispatch( categoriaLoaded(categorias));


    }catch (e) {
      console.log(e);
    }

};