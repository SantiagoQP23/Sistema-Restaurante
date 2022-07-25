import { FC, useEffect, useState } from 'react';
import { fetchConToken } from '../../helpers/fetch';
import { PageTitle, PageTitleWrapper } from '../ui';


import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Typography, useTheme, Tooltip, IconButton, Card, CardHeader,
  TablePagination,
  Box,
  Pagination
} from '@mui/material';
import { IUsuario } from '../../interfaces';
import { IPedido } from '../../interfaces/pedidos';


interface Props {
  modo: number;
  fecha: string;

}

interface IUsuarioReporte extends IUsuario {
  pedidos: IPedido[];
}

export const Meseros: FC<Props> = ({ modo, fecha }) => {

  const [meseros, setMeseros] = useState<IUsuarioReporte[]>([]);


  const cargarMeserosPorDia = async () => {

    const resp = await fetchConToken('pedidos/meseros/dia/?fecha=' + fecha);

    const body = await resp.json();

    console.log(resp);
    if (resp.ok) {
      setMeseros(body.meseros);
      console.log("Respueta: ", body);
    }

  }


  const cargarMeseros = async () => {

    // Cargar por día
    if (modo === 1) {

      cargarMeserosPorDia();

    }
  }

  useEffect(() => {

    cargarMeseros();

  }, [fecha])

 






  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Meseros' subHeading=''></PageTitle>
      </PageTitleWrapper>

      {
        meseros.length <= 0 && (
          <Typography variant='h6'>Hoy no se han creado pedidos</Typography>
        )
      }
      {
        meseros.length >= 1 && (
          <TableContainer sx={{ maxWidth: "100%" }} >
            <Table sx={{ minWidth: "max-content" }}>
              <TableHead>
                <TableRow>

                  <TableCell>Id</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {meseros.map(usuario => (
                  <TableRow key={usuario.idUsuario}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >

                        {usuario.idUsuario}
                      </Typography>

                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >

                        {usuario.nombres}
                      </Typography>

                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >

                        {usuario.cargo.nombreCargo}
                      </Typography>

                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {usuario.pedidos.length}
                      </Typography>

                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {
                          //TODO Hacer la suma del total de los pedidos
                        }
                        {usuario.pedidos[0].total}
                      </Typography>

                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>


            </Table>
          </TableContainer>

        )
      }




    </>





  )
}
