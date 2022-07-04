import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

// Redux
import { 
  categoriaStartLoad, 
  productoStartLoad, 
  seccionStartLoad,
  usuarioStartLoad } from '../actions/';

// Pages
import { 
  AniadirProductos, 
  EditarPedido, 
  Inicio, 
  EditarMenu, 
  Menu, 
  PedidosPendientes, 
  PedidosLayout, 
  Error404, 
  Perfil, 
  Usuarios
 } from '../pages/';

// Componentes
import { Layout } from '../components/ui/';
import { Pedidos } from '../components/Pedidos/';
import { EditarSecciones, EditarCategorias, EditarProductos } from '../components/EditarMenu';

// Sockets
import { SocketProvider } from '../context/SocketContext';
import { useAppDispatch } from '../hooks/useRedux';


export const AppRouter = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(seccionStartLoad());
    dispatch(categoriaStartLoad());
    dispatch(productoStartLoad());
    dispatch(usuarioStartLoad());
  }, [dispatch]);


  return (
    <>
      <SocketProvider>

        <Layout >

          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/inicio' element={<Inicio />} />

            <Route path="/menu/editar/*" element={<EditarMenu />}>
              <Route path="" element={<EditarSecciones />} />
              <Route path=":seccion" element={<EditarCategorias />} />
              <Route path=":seccion/:categoria" element={<EditarProductos />} />
            </Route>


            <Route path="/menu" element={<Menu />} />

            <Route path="/pedidos/*" element={<PedidosLayout />}>
              <Route index element={<Pedidos />} />
              <Route path="editar/:idPedido" element={<EditarPedido />} />
              <Route path="editar/:idPedido/productos" element={<AniadirProductos />} />
              <Route path='pendientes' element={<PedidosPendientes />} />
            </Route>

            <Route path="*" element={<Error404 />} />

          <Route path="/usuarios" element={<Usuarios />} />

          </Routes>



        </Layout>
      </SocketProvider>

    </>
  )
}
