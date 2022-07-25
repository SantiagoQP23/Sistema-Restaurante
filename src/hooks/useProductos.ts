import React, { useEffect, useState } from 'react'
import { ICategoria, IProducto } from '../interfaces';
import { CategoriasState, ProductosState, SeccionesState, selectCategorias, selectProductos, selectSecciones } from '../reducers';
import { getCategoriasByIdSeccion } from '../selectors/getCategoriasByIdSeccion';
import { getProductosByIdCategoria } from '../selectors/getProductosByIdCategoria';

import { useAppSelector } from './useRedux';


const menuInitial = {
  seccion: 2,
  categoria: 8
}


export const useProductos = (idSeccion: number = 2, idCategoria: number = 11) => {

  // Cargar menu
  const [menu, setMenu] = useState({ seccion: idSeccion, categoria: idCategoria });
  const { categoria, seccion } = menu;

  const [categoriasSeccion, setCategoriasSeccion] = useState<ICategoria[]>([]);
  const [productosCategoria, setProductosCategoria] = useState<IProducto[]>([]);

  const { secciones } = useAppSelector((selectSecciones));
  const { categorias } = useAppSelector((selectCategorias));
  const { productos } = useAppSelector((selectProductos));

  const cambiarSeccion = (seccion: number) => {
    setMenu({
      ...menu,
      seccion
    });
  };

  const cambiarCategoria = (categoria: number) => {
    setMenu({
      ...menu,
      categoria
    })
  }



  const cargarCategoriasBySeccion = (seccion: number) => {

    if (secciones.length > 0) {
      let categoriasSeccionActiva = getCategoriasByIdSeccion(secciones, seccion, categorias);

      if (categoriasSeccionActiva.length > 0) {
        setMenu({
          ...menu,
          categoria: categoriasSeccionActiva[0].idCategoria!
        })
      }


      setCategoriasSeccion(categoriasSeccionActiva);

    }

  }

  const cargarProductosByIdCategoria = (categoria: number) => {

    if (secciones.length > 0) {
      let productosCategoria = getProductosByIdCategoria(categorias, categoria, productos);

      setProductosCategoria(productosCategoria);

    }


  }
  
  useEffect(() => {
    cargarCategoriasBySeccion(seccion);
    
  }, [seccion])

  
  useEffect(() => {
    cargarProductosByIdCategoria(categoria)

  }, [categoria, productos])

/* 
  useEffect(() => {
    cargarCategoriasBySeccion(seccion);
    
  }, [secciones, categorias]) */
  
  
    useEffect(() => {
      cargarCategoriasBySeccion(seccion);
  
    }, [])



  return {
    secciones,
    categoriasSeccion,
    productosCategoria,
    cambiarSeccion,
    cambiarCategoria,
    seccion,
    categoria
  }


}
