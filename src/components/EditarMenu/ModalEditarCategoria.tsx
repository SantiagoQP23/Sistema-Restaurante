import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DialogActions, TextField, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, Typography, InputLabel } from '@mui/material/';
// MOdal

import { Controller, useForm } from 'react-hook-form';

import { categoriaStartCreated, categoriaStartUpdate } from '../../actions/categorias';

import { ICategoria, ISeccion } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';
import { selectSecciones } from '../../reducers';

const initialForm = (idSeccion: number) => {
  return {
    nombreCategoria: "",
    idSeccion
  }
}

interface FormData {
  idCategoria?: number;
  nombreCategoria: string;
  idSeccion: number;
}


interface Props {
  categoria: ICategoria | null;
  closeModal: () => void;
}

export const ModalEditarCategoria: FC<Props> = ({ categoria, closeModal }) => {

  const dispatch = useAppDispatch();

  const { seccionActiva, secciones } = useSelector(selectSecciones);

  const categoriaInitial = categoria ? categoria : initialForm(seccionActiva!.idSeccion!);

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
    defaultValues: categoriaInitial,

  });


  async function onSubmit(form: FormData) {

    if (!form.idCategoria) {

      dispatch(categoriaStartCreated(form as ICategoria));
    } else {
      dispatch(categoriaStartUpdate(form as ICategoria));
    }

    closeModal();

  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <DialogTitle> {categoria ? categoria.nombreCategoria : "Añadir Categoria"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Datos de la categoria
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Categoria"
            type="text"
            fullWidth
            variant="standard"
            {
            ...register('nombreCategoria', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Minimo 2 caracteres' }
            })
            }
            error={!!errors.nombreCategoria}
            helperText={<Typography variant="body1" color="red">{errors.nombreCategoria?.message}</Typography>}


          />

          <TextField
            id="descripcion-seccion"
            label="Descripcion de la Categoria"
            margin="dense"

            multiline
            rows={4}
            defaultValue=""
            fullWidth

          />

          <Controller
            name='idSeccion'
            control={control}
            render={({ field: { onChange, onBlur, value } }) =>
              <>
                <InputLabel id='select-seccion'>Seccion</InputLabel>
                <Select
                  labelId="select-seccion"

                  label="Seccion"
                  fullWidth
                  margin='dense'
                  disabled
               
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={!!errors.idSeccion}

                >

                  {secciones.map(seccion => (

                    <MenuItem key={seccion!.idSeccion} value={seccion.idSeccion!}>{seccion.nombreSeccion} </MenuItem>
                  )


                  )
                  }

                </Select>
              </>
            }

          />










        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button type='submit'>{categoria ? "Guardar cambios" : "Añadir Categoria"}</Button>
        </DialogActions>
      </form>
    </>
  )
}

