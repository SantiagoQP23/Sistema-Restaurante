import { ChangeEvent, useState } from 'react'

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
  Typography, useTheme, Tooltip, IconButton, Card, CardHeader,
  TablePagination,
  Box,
  Pagination
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { IUsuario } from '../../interfaces';
import { Label } from '../ui';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../reducers/authSlice';
import { useSelector } from 'react-redux';



const getStatusLabel = (estado: number): JSX.Element => {
  const map = [
    {
      text: 'Offline',
      color: 'error'
    },
    {
      text: 'Online',
      color: 'success'
    },
    {
      text: 'Pending',
      color: 'warning'
    }
  ];

  const { text, color }: any = map[estado];

  return <Label color={color}>{text}</Label>;
};

export const UsuariosTable = () => {

  const theme = useTheme();

  const { usuarios } = useSelector(selectAuth);

  const usuario: IUsuario = {
    idUsuario: 1,
    nombreUsuario: 'santiago',
    nombres: 'Santiago Quirumbay',
    cargo: {
      nombreCargo: 'Mesero',
      idCargo: 1,
      descripcion: ''
    }
  }

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<number[]>([]);

  //const [usuarios, setUsuarios] = useState<IUsuario[]>([usuario]);

  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < usuarios.length;

  const selectedAllCryptoOrders = selectedCryptoOrders.length === usuarios.length;

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? usuarios.map((usuario) => usuario.idUsuario!)
        : []
    );
  };

  return (
    <Card >
      <CardHeader title="Usuarios" />

      <TableContainer sx={{maxWidth: "100%" }} >
        <Table sx={{minWidth: "max-content" }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={selectedAllCryptoOrders}
                indeterminate={selectedSomeCryptoOrders}
                onChange={handleSelectAllCryptoOrders}
              />
            </TableCell> */}
              <TableCell>Id</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>aa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {usuarios.map(usuario => (
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

                <TableCell align="center">
                  {getStatusLabel(1)}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Editar usuario" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar usuario" arrow>
                    <IconButton
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

            ))}


          </TableBody>

        </Table>

      </TableContainer>
      <Box p={2}>
        <Pagination count={5} variant="outlined"
         
        />
      </Box>

                      
    </Card>

  )
}
