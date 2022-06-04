
import { Card, CardContent, Container, Divider } from '@mui/material';

// Componentes
import { ListProductos, Secciones, Categorias } from '../components/Menu/';

import { useProductos } from '../hooks/useProductos';
import { PageTitleWrapper, PageTitle} from '../components/ui/';

export const Menu = () => {

  const {
    secciones,
    categoriasSeccion,
    productosCategoria,
    cambiarSeccion,
    cambiarCategoria,
    seccion,
    categoria } = useProductos();

  return (
    < >

      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">

        {
          secciones.length === 0 && (
            <h6>No se encontraron secciones</h6>
          )
        }


        <Card>


          {/* SECCIONES */}
          <Secciones
            secciones={secciones}
            seccion={seccion}
            cambiarSeccion={cambiarSeccion}
          />

          <Divider />
          <CardContent>

            {/* CATEGORIAS */}

            <Categorias
              categorias={categoriasSeccion}
              categoria={categoria}
              cambiarCategoria={cambiarCategoria}
            />

            <ListProductos
              productos={productosCategoria}
            />
          </CardContent>
        </Card>
      </Container>

    </>
  )
}

