import Swal from "sweetalert2";

import { AppThunk } from "../store/store";
import { fetchConToken } from "../helpers/fetch";
import { IProducto } from "../interfaces";

import { productoAddNew, productoDeleted, productoLoaded, productoUpdated } from "../reducers";
import { toast } from "react-toastify";

// Añadir un nuevo producto
export const productoStartCreated = (producto: IProducto): AppThunk => async (
  dispatch,
  getState) => {
  try {

    const resp = await fetchConToken(`menu/productos/crear`, producto, 'POST');

    const body = await resp.json();

    if (resp.ok) {
      // Añadir el producto a la var global
      dispatch(productoAddNew(body.producto));

      // Aumentar la cantidad de productos a la categoria
      //dispatch( categoriaProductoAdded(producto.idCategoria));

      //closeModal();
      toast.success(body.msg)



    } else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error)
  }


};

// Actualizar un producto
export const productoStartUpdate = (producto: IProducto): AppThunk => async (
  dispatch,
  getState) => {

    try {
      const resp = await fetchConToken(`menu/productos/actualizar/${producto.idProducto}`, producto, 'PUT');
      const body = await resp.json();

      if(resp.ok) {

        dispatch( productoUpdated(producto));
        toast.success(body.msg)

      }else{
        toast.error(body.errors[0].msg);
      }

    } catch (error) {
      console.log(error)
    }

};

// Eliminar un producto
export const productoStartDelete = (producto: IProducto): AppThunk => async (
  dispatch,
  getState) => {

    try {
      const resp = await fetchConToken(`menu/productos/eliminar/${producto.idProducto}`, { } , 'DELETE');
      const body = await resp.json();
  
      if(resp.ok){

        dispatch( productoDeleted(producto.idProducto!));
        toast.success(body.msg);

      }else {
        toast.error(body.errors[0].msg);
      }
      
    } catch (error) {
      console.log(error);
    }
};

// Cargar todos los productos
export const productoStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

    try {

      const resp = await fetchConToken('menu/productos');
      const body = await resp.json();
      const productos = body.productos;

      dispatch( productoLoaded(productos));


    }catch (e) {
      console.log(e);
    }

    
};