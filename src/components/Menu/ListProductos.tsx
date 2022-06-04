import { FC } from 'react';

import {Grid, Box} from '@mui/material/';

import {Producto} from './Producto';

import { IProducto } from '../../interfaces';
interface Props {
  productos: IProducto[]
}

export const ListProductos: FC<Props> = ({ productos  }) => {

  return (

    <>
      <Grid container spacing={1}>

        {
          productos.length > 0 && (

            productos.map((p) => (
              <Grid key={p.idProducto} item xs={12} md={12} lg={4} xl={3}>
                <Box sx={{ border: '1px solid #ddd' }} mt={1}>

                  <Producto key={p.idProducto} producto={p} />
                </Box>
              </Grid>
            ))

          )
        }
      </Grid>

    </>

  );
};
