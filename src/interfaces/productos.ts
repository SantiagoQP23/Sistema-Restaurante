



export interface ISeccion {
 idSeccion: number | null;
 nombreSeccion: string;

}


export interface ICategoria {
  idCategoria: number | null;
  nombreCategoria: string;
  idSeccion: number;
}

export interface IProducto {
  idProducto: number | null;
  nombre: string;
  precio: number;
  fecha_venta: Date;
  cantidad: number;
  descripcion: string;
  linkFoto: string;
  idCategoria: number;
}