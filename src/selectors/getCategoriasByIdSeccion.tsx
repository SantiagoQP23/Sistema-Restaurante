import { ISeccion, ICategoria } from '../interfaces/';



export const getCategoriasByIdSeccion = (secciones: ISeccion[], idSeccion: number, categorias: ICategoria[]): ICategoria[] => {

  const seccion = secciones.find( seccion => seccion.idSeccion === idSeccion);

  if( !seccion ){
    throw new Error("No se encontro esta sección");
  }

  const categoriasSeccion = categorias.filter(categoria => categoria.idSeccion === idSeccion);
  return categoriasSeccion;


}