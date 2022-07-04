import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

// Material UI
import { Container } from '@mui/material';


// Pages
import { EditarSecciones, EditarCategorias, EditarProductos } from '../components/EditarMenu/';
import { PageTitle, PageTitleWrapper } from '../components/ui';

interface Props {
  children?: React.ReactNode;
}


export const EditarMenu: FC<Props> = ({ children }) => {

  return (
    <>

      <PageTitleWrapper >
        <PageTitle heading='Editar menú' />
      </PageTitleWrapper>

      <Container maxWidth="lg">

        <Routes>
          <Route path="/" element={<EditarSecciones />} />
          <Route path="/:nombreSeccion" element={<EditarCategorias />} />
          <Route path="/:nombreSeccion/:nombreCategoria" element={<EditarProductos />} />
        </Routes>
      </Container>

    </>
  );
}

