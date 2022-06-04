import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import { productoStartDelete } from '../../actions/productos';

import { IProducto } from '../../interfaces';
import { useAppDispatch } from '../../hooks/useRedux';


interface Props {
  producto: IProducto;
  closeModal: () => void;
}


export const ModalEliminarProducto: FC<Props> = ({ producto, closeModal }) => {

  const dispatch = useAppDispatch();

  const eliminarProducto = () => {

    dispatch(productoStartDelete(producto))
    closeModal();
  }
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {`¿Esta seguro de eliminar el producto ${producto.nombre}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          El producto será eliminado permanentemente
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={() => eliminarProducto()} >
          Aceptar
        </Button>
      </DialogActions>

    </>
  )
}

