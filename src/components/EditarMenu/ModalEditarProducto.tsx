import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, TextField, Select, MenuItem,
  InputAdornment, Typography, CircularProgress, Grid, InputLabel,

} from '@mui/material/';

import { AttachMoney } from '@mui/icons-material';

import { productoStartCreated, productoStartUpdate } from '../../actions/productos';

import { Controller, useForm } from 'react-hook-form';

import { ICategoria, IProducto } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';
import { selectCategorias } from '../../reducers';





const initialForm = (idCategoria: number) => {

  console.log("Añadiendo en la categoria: ", idCategoria);
  return {
    nombre: "",
    precio: 0,
    descripcion: "",
    idCategoria
  }
}

interface FormData {
  idProducto?: number;
  nombre: string;
  precio: number;
  descripcion: string;
  idCategoria: number;
}


interface Props {
  producto: IProducto | null,
  closeModal: () => void;
  categorias: ICategoria[];
  idCategoria: number;
}


export const ModalEditarProducto: FC<Props> = ({ producto, closeModal, categorias }) => {

  const dispatch = useAppDispatch();

  const {categoriaActiva} = useSelector(selectCategorias);


  const productoInitial = producto ? producto : initialForm(categoriaActiva!.idCategoria!);

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
    defaultValues: productoInitial
  });

  // Actualizar o crear un producto
  async function onSubmit(form: FormData) {


    if (!form.idProducto) {

      dispatch(productoStartCreated(form as IProducto))

    } else {

      dispatch(productoStartUpdate(form as IProducto))
    }

    closeModal();

  }

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>


        <DialogTitle>{producto ? producto.nombre : "Añadir Producto"}

        </DialogTitle>


        <DialogContent>
          <DialogContentText>
            Datos del producto
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre del producto"
            type="text"
            fullWidth
            variant="standard"
            {
            ...register('nombre', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Minimo 2 caracteres' },


            })
            }
            helperText={<Typography color="red">{errors.nombre?.message} </ Typography>}
          />

          <TextField
            label="Precio"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            margin='dense'
            fullWidth
            type='number'
            {
            ...register('precio', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'El valor debe ser mayor a 0' },


            })
            }
            helperText={<Typography color="red">{errors.precio?.message} </ Typography>}

          />

          <TextField
            label="Descripcion del producto"
            margin="dense"
            multiline
            rows={4}
            fullWidth
            {
            ...register('descripcion', {
              required: 'Este campo es requerido',
              minLength: { value: 10, message: 'Minimo 10 caracteres' },


            })
            }
            helperText={<Typography color="red">{errors.descripcion?.message} </ Typography>}

          />


          <Controller
            name='idCategoria'
            control={control}
            render={({ field: { onChange, onBlur, value } }) =>
            <>
              <InputLabel id='select-categoria'>Categoria</InputLabel>
              <Select
                label="select-categoria"
                margin='dense'
                fullWidth
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!errors.idCategoria}
              >
                {
                  categorias.map(categoria => (
                    <MenuItem key={categoria.idCategoria!} value={categoria.idCategoria!}>{categoria.nombreCategoria}</MenuItem>

                  ))
                }
              </Select>
                </>
            }


          />





        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button type='submit' disabled={Object.keys(errors).length !== 0} >{producto ? "Guardar los cambios" : "Añadir producto"}</Button>
        </DialogActions>


      </form>
    </>
  )
}


