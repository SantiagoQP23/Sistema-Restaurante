import {Card, CardContent, Typography, CardMedia} from '@mui/material/';
import { FC } from 'react';
import { IProducto } from '../../interfaces';


interface Props {
  producto: IProducto
}


export const Producto : FC<Props> = ({ producto }) => {
  return (
    < >

      <Card sx={{
        border: '1px solid #48e'
      }}>
     {/*  <CardMedia
        component="img"
        height="200"
        image="https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg"
        alt={producto.nombre}
      /> */}
        <CardContent>
          
          <Typography variant="h6" component="div">
            {producto.nombre}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {producto.precio}
          </Typography>
          <Typography variant="body2">
           {producto.descripcion}
          </Typography>
        </CardContent>

      </Card>

      {/* <Grid container spacing={1}>
          <Grid item xs={5} >
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6" >{producto.nombre}</Typography>
            <Typography variant="body2" >$ {producto.precio}</Typography>
            <Typography variant="subtitle2" >{producto.descripcion}</Typography>

          </Grid>

        </Grid> */}





      {/* 

      ESTO PUEDE SERVIR PARA UNA VENTANA MODAL PARA MOSTRAR MAS INFORMACIÓN DEL PRODUCTO
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://www.goya.com/media/6910/easy-seafood-and-rice.jpg?quality=80"
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {producto.nombre}
          </Typography>

          <Typography sx={{ height: 70 }} variant="body2" color="text.secondary">
            {producto.descripcion}
          </Typography>

          <Typography variant="h6" component="div" align='right'>
            $ {producto.precio}
          </Typography>

        </CardContent>

      </Card> */}
    </>
  );
}