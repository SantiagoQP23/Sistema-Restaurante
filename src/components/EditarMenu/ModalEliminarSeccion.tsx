import { FC } from 'react'
import { useDispatch } from 'react-redux';


// material UI
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { seccionStartDelete } from '../../actions/secciones';

import { ISeccion } from '../../interfaces';

import { useAppDispatch } from '../../hooks/useRedux';

interface Props{
  seccion: ISeccion;
  closeModal: () => void;
}


export const ModalEliminarSeccion: FC<Props> = ({seccion, closeModal}) => {

  const dispatch = useAppDispatch();
  
  const eliminarSeccion = (idSeccion: number) => {

    dispatch( seccionStartDelete(idSeccion) );

    closeModal();
  }



  return (
    <>
       <DialogTitle id="alert-dialog-title">
          {`¿Esta seguro de eliminar la sección ${seccion.nombreSeccion}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La seccion será eliminada permanentemente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={() => eliminarSeccion(seccion.idSeccion!)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
    </>
  )
}

