import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { detalleLoaded } from "../reducers";


// Cargar todos los productos
export const detallesPedidoStartLoad = (idPedido: number): AppThunk => async (
  dispatch,
  getState) => {

    try {

      const resp = await fetchConToken(`pedidos/${idPedido}`);

      const body = await resp.json();

      if( resp.ok) {

        dispatch(detalleLoaded(body.pedido.detalles));
      }
     


    }catch (e) {
      console.log(e);
    }

    
};