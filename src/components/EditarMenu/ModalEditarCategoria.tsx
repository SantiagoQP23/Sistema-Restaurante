import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DialogActions, TextField, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, Typography } from '@mui/material/';
// MOdal

import { useForm } from 'react-hook-form';

import { categoriaStartCreated, categoriaStartUpdate } from '../../actions/categorias';

import { ICategoria, ISeccion } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';

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
  secciones: ISeccion[];
  idSeccion: number;
}

export const ModalEditarCategoria: FC<Props> = ({ categoria, closeModal, secciones, idSeccion }) => {

  const dispatch = useAppDispatch();
  const categoriaInitial = categoria ? categoria : initialForm(idSeccion);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: categoriaInitial,

  });


  async function onSubmit(form: FormData) {

    if (!form.idCategoria) {

      dispatch(categoriaStartCreated(form as ICategoria));
    } else {
      dispatch(categoriaStartUpdate(form as ICategoria));
    }

    // TODO Mostrar retroalimentacion
    closeModal();

  }


  return (
    <>
      <form onSubmit={ handleSubmit(onSubmit)}>

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
                minLength: {value: 2, message: 'Minimo 2 caracteres'}
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
          <Select
            labelId="label-seccion-categoria"
            
            label="Seccion"
            fullWidth
            margin='dense'
            disabled
            {
              ...register('idSeccion') 
            }
            error={!!errors.idSeccion}
            
            >

            {secciones.map(seccion => (

              <MenuItem key={seccion!.idSeccion} value={seccion.idSeccion!}>{seccion.nombreSeccion} </MenuItem>
            )


            )
            }

          </Select>

        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button type='submit'>{categoria ? "Guardar cambios" : "Añadir Categoria"}</Button>
        </DialogActions>
      </form>
    </>
  )
}

