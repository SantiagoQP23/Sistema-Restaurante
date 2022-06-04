import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authSlice from '../reducers/authSlice';
import seccionesSlice from '../reducers/seccionesSlice';
import categoriasSlice from '../reducers/categoriasSlice';
import productosSlice from '../reducers/productosSlice';
import pedidosSlice from '../reducers/pedidosSlice';
import detallesSlice from '../reducers/detallesPedidoSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    secciones: seccionesSlice,
    categorias: categoriasSlice,
    productos: productosSlice,
    pedidos: pedidosSlice,
    detalles: detallesSlice
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
