import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { categoriaAddNew, categoriaDeleted, categoriaLoaded, categoriaUpdated } from "../reducers";
import { ICategoria } from "../interfaces";

// Añadir una nueva categoria
export const categoriaStartCreated = (categoria: ICategoria): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/categorias/crear`, categoria, 'POST');
    const body = await resp.json();


    if (resp.ok) {


      dispatch(categoriaAddNew(body.categoria));

    } else {
      Swal.fire('Error', body.msg, 'error');
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
      }else{
        Swal.fire('Error', body.msg, 'error');
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
        console.log("la categoria se ha eliminado");
        dispatch( categoriaDeleted(idCategoria));
      }else {
        Swal.fire('Error', body.msg, 'error');
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
      console.log(body);
      const categorias = body.categorias as ICategoria[];

      dispatch( categoriaLoaded(categorias));


    }catch (e) {
      console.log(e);
    }

};