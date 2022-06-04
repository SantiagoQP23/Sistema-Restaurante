import { ICategoria, IProducto } from "../interfaces";

export const getProductosByIdCategoria = (categorias: ICategoria[], idCategoria: number, productos: IProducto[]) => {

  const categoria = categorias.find( categoria => categoria.idCategoria === idCategoria);

  if( !categoria ){
    throw new Error("No se encontro esta categoria" + idCategoria);
  }
  const productosCategoria = productos.filter(producto => producto.idCategoria === idCategoria);

  return productosCategoria;

}