import { FC } from 'react'


import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { categoriaStartDelete } from '../../actions/categorias';
import { ICategoria } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';


interface Props{
  categoria: ICategoria;
  closeModal: () => void;
}


export const ModalEliminarCategoria: FC<Props> = ({categoria, closeModal}) => {
  const dispatch = useAppDispatch();

  const eliminarCategoria = (idCategoria: number) => {

    dispatch( categoriaStartDelete(idCategoria) )
    closeModal()
  
  }
  return (
    <>
      <DialogTitle id="alert-dialog-title">
          {`¿Esta seguro de eliminar la categoría ${categoria.nombreCategoria}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La categoría será eliminada permanentemente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={() => eliminarCategoria(categoria.idCategoria!)} >
            Aceptar
          </Button>
        </DialogActions>
    </>
  )
}

