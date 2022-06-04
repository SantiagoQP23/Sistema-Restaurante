export function obtenerFechaActual() {

  // Se debe mostrar solo los pedidos del dia actual
  var fecha = new Date(); //Fecha actual
  
  var mes: string | number = fecha.getMonth() + 1; //obteniendo mes
  var dia: string | number = fecha.getDate() ; //obteniendo dia
  var anio = fecha.getFullYear(); //obteniendo año
  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
  if (mes < 10)
    mes = '0' + mes; //agrega cero si el menor de 10

  return `${anio}-${mes}-${dia}`;

}


export const parsearFecha = (textFecha: string | Date) : string => {
  // Se debe mostrar solo los pedidos del dia actual
  let fecha = new Date(textFecha); //Fecha actual

  let mes: string | number = fecha.getMonth() + 1; //obteniendo mes
  let dia: string | number = fecha.getDate() + 1; //obteniendo dia
  let anio = fecha.getFullYear(); //obteniendo año

  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10

  if (mes < 10)
    mes = '0' + mes; //agrega cero si el menor de 10

  return `${anio}-${mes}-${dia}`;

}
