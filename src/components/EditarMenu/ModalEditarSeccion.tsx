import { FC } from 'react'
import { useDispatch } from 'react-redux';


// Material UI
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography} from '@mui/material/';

import { seccionStartCreated, seccionStartUpdate } from '../../actions/secciones';
import { ISeccion } from '../../interfaces/productos';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useRedux';


const initialForm = {
  nombreSeccion: ""
}
interface FormData {
  idSeccion?: number;
  nombreSeccion: string;
}



interface Props {
  seccion: ISeccion;
  closeModal: () => void;
}

export const ModalEditarSeccion: FC<Props> = ({ seccion = initialForm, closeModal }) => {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: seccion,
    
  })


  // Actualizar o crear una seccion
  async function onSubmit(form: FormData) {

    if (!form.idSeccion) {
      dispatch(seccionStartCreated(form as ISeccion));
    } else {
      dispatch(seccionStartUpdate(form as ISeccion));
    }
    closeModal();
  }

  return (
    <>
      <form onSubmit={ handleSubmit(onSubmit)}>

        <DialogTitle >{seccion ? seccion.nombreSeccion : "Añadir seccion"} </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Datos de la sección
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la sección"
            type="text"
            fullWidth
            variant="standard"
            {
              ...register('nombreSeccion', {
                required: 'Este campo es requerido',
                minLength: {value: 2, message: 'Minimo 2 caracteres'}
              })
            }
            error={!!errors.nombreSeccion}
            helperText={<Typography color="red">{errors.nombreSeccion?.message}</Typography>}
          />

          <TextField
            id="descripcion-seccion"
            label="Descripcion de la sección"
            margin="dense"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            disabled
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button type='submit'>{seccion ? "Guardar cambios" : "Añadir sección"}</Button>
        </DialogActions>

      </form>

    </>
  )
}
