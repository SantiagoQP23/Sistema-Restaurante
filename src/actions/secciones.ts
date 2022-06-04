import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { ISeccion } from "../interfaces";
import { seccionAddNew, seccionDeleted, seccionLoaded, seccionUpdated } from "../reducers";

// Crear una nueva seccion
export const seccionStartCreated = (seccion: ISeccion): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/secciones/crear`, seccion, 'POST');
    const body = await resp.json();


    if (resp.ok) {
      

      dispatch(seccionAddNew(body.seccion));

    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  } catch (error) {
    console.log(error)
  }

};

// Actualizar una seccion
export const seccionStartUpdate = (seccion: ISeccion): AppThunk => async (
  dispatch,
  getState) => {

    try {
      const resp = await fetchConToken(`menu/secciones/actualizar/${seccion.idSeccion}`, seccion, 'PUT');
      const body = await resp.json();
      
      
      if(resp.ok) {
        dispatch( seccionUpdated(seccion));
        
      }else{
        Swal.fire('Error', body.msg, 'error');
      }  

    } catch (error) {
      console.log(error)
    }  


};

// Eliminar una seccion
export const seccionStartDelete = (idSeccion: number): AppThunk => async (
  dispatch,
  getState) => {

    try {
      const resp = await fetchConToken(`menu/secciones/eliminar/${idSeccion}`, { } , 'DELETE');
      const body = await resp.json();
  
      if(resp.ok){
        dispatch(seccionDeleted(idSeccion));
      }
      else{ 
        Swal.fire('Error', body.msg, 'error');

      }
      
    } catch (error) {
      console.log(error);
    }

};

// Cargar todas las secciones
export const seccionStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

    try {

      const resp = await fetchConToken('menu/secciones');
      const body = await resp.json();

      if(resp.ok){
        const secciones = body.secciones;
  
        dispatch( seccionLoaded(secciones));

      }else {
        Swal.fire('Error', body.msg, 'error')
      }


    }catch (e) {
      console.log(e);
    }

};