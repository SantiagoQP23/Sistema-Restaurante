import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { IPedido } from "../interfaces";

import { pedidoSetFecha, pedidoAddNew, pedidoLoaded, pedidoDeleted, pedidoUpdatedEstado, pedidoSetActive } from "../reducers";

// Establecer la fecha de los pedidos
export const pedidoStartSetFecha = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

    dispatch(pedidoSetFecha(fecha));
  
};


// Añadir un pedido
export const pedidoStartAdded = (): AppThunk => async (
  dispatch,
  getState) => {

    try{

    const resp = await fetchConToken('pedidos/crear',{}, 'POST');
    const body = await resp.json();

    if(resp.ok){
      dispatch(pedidoAddNew(body.pedido));

    }else{
      Swal.fire('Error', body.msg, 'error');
    }

  } catch (error) {
    console.log(error);
  }
};

// Cargar los pedidos del dia
export const pedidoStartLoaded = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

    try {
   
      
      const resp = await fetchConToken(`pedidos/?fecha=${fecha}`);
    

      const body = await resp.json();


      if( resp.ok) {
        dispatch ( pedidoLoaded( body.pedidos ) )
      }

    } catch (e) {
      console.log(e);
    }
  
};

// Eliminar un pedido
export const pedidoStartDeleted = (idPedido: number): AppThunk => async (
  dispatch,
  getState) => {

    const resp = await fetchConToken(`pedidos/eliminar/${idPedido}` , {} ,  'DELETE');
    const body = await resp.json();

    if( resp.ok ) {
        dispatch( pedidoDeleted( idPedido ) );

    }else{
      Swal.fire('Error', body.msg, 'error');
    }

  
};

// Finalizar un pedido
export const pedidoStartUpdatedEstado = (idPedido: number): AppThunk => async (
  dispatch,
  getState) => {
    const resp = await fetchConToken(`pedidos/editar/estado/${idPedido}`,{},  'PUT');
    const body = await resp.json();
    
    if( resp.ok ) {
      dispatch( pedidoUpdatedEstado( false ) );

    }else{
      Swal.fire('Error', body.msg, 'error');
    }


};
  
export const pedidoStartSetActive = (pedido: IPedido): AppThunk => async (
  dispatch,
  getState) => {
    
    dispatch(pedidoSetActive(pedido));
    
};

/*
export const pedidoStart = (fecha: string): AppThunk => async (
  dispatch,
  getState) => {

    dispatch();
  
};
 */

