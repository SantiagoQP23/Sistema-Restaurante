import { ShoppingBagTwoTone } from '@mui/icons-material';
import { Box, Card, Typography, useTheme, styled, Avatar } from '@mui/material';
import { FC } from 'react';
import { IPedido } from '../../interfaces';



const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

interface Props{
  pedidos: IPedido[];
}

export const ContadorPedidos:FC<Props> = ({pedidos}) => {

  const theme = useTheme();

  return (
    <Card sx={{mb: 1}}>
      <Box px={2} py={2} display="flex" alignItems="flex-start">
      {/*   <AvatarPrimary>
          <ShoppingBagTwoTone />
        </AvatarPrimary> */}
        <Box pl={2} flex={1}>

          <Box display="flex" justifyContent='center'>
            <Box pr={6}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{pedidos.length}</Typography>
            </Box>
            <Box pr={6}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Activos
              </Typography>
              <Typography variant="h2">{pedidos.filter(p => p.estado).length}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Entregados
              </Typography>
              <Typography variant="h2">{pedidos.filter(p => !p.estado).length}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
