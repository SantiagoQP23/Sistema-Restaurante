import { ICategoria, ISeccion } from "../interfaces";


export const getCategoriasByNombreSeccion = (secciones: ISeccion[], nombreSeccion: string, categorias: ICategoria[]) => {

  const seccion = secciones.find( seccion => seccion.nombreSeccion === nombreSeccion);

  if( !seccion ){
    throw new Error("No se encontro esta sección");
  }

  const categoriasSeccion = categorias.filter(categoria => categoria.idSeccion === seccion.idSeccion);
  
  return categoriasSeccion;


}