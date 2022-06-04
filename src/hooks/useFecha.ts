import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { pedidoStartSetFecha } from '../actions/pedidos';
import { obtenerFechaActual } from '../helpers/fecha';
import { selectPedidos } from '../reducers/';
import { useAppDispatch } from './useRedux';


const parsearFecha = (textFecha: string) : string => {
    // Se debe mostrar solo los pedidos del dia actual
    let fecha = new Date(textFecha); //Fecha actual
  
    let mes: string | number = fecha.getMonth() + 1; //obteniendo mes
    let dia: string | number = fecha.getDate() ; //obteniendo dia
    let anio = fecha.getFullYear(); //obteniendo año

    if (dia < 10)
      dia = '0' + dia; //agrega cero si el menor de 10

    if (mes < 10)
      mes = '0' + mes; //agrega cero si el menor de 10

    return `${anio}-${mes}-${dia}`;
  
}

export const useFecha = () => {

  const { fecha } = useSelector(selectPedidos);
  const dispatch = useAppDispatch();

  const setFecha = (fecha: string = '') => {
    const fechaActual = obtenerFechaActual();

    
    console.log('estableciendo la fecha: ', fecha)
     fecha === ''
      ?  dispatch(pedidoStartSetFecha(fechaActual))
      :  dispatch( pedidoStartSetFecha( parsearFecha(fecha) ));
  }


  return { fecha, setFecha }
}
