import { Routes, Route } from 'react-router-dom';

// Material UI
import { FC } from 'react';

import Typography from '@mui/material/Typography';

// Pages
import {EditarSecciones, EditarCategorias, EditarProductos} from '../components/EditarMenu/';

interface Props {
  children?: React.ReactNode;
}


export const EditarMenu: FC<Props> = ({ children }) => {

  return (
    <>

      <Typography variant="h6" color="initial">EDITAR MENÚ</Typography>
      {children}
      <Routes>
        <Route path="/" element={<EditarSecciones />} />
        <Route path="/:nombreSeccion" element={<EditarCategorias />} />
        <Route path="/:nombreSeccion/:nombreCategoria" element={<EditarProductos />} />
      </Routes>

    </>
  );
}

