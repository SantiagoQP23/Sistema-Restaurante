import {
  Box, Button, Card, CardHeader, Container, Grid, InputLabel, MenuItem,
  Select, TextField
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form'

import { PageTitleWrapper, PageTitle } from '../components/ui'
import { UsuariosTable } from '../components/usuarios/';
import { IUsuario } from '../interfaces'
import { fetchConToken } from '../helpers/fetch';
import { useDispatch } from 'react-redux';
import { usuarioStartAdd } from '../actions/auth';
import { useAppDispatch } from '../hooks/useRedux';


const initialForm: IUsuario = {
  idUsuario: 0,
  nombreUsuario: '',
  nombres: '',
  password: '',
  idCargo: 1,
  cargo: {
    idCargo: 1,
    nombreCargo: '',
    descripcion: ''
  }
}

export const Usuarios = () => {

  const { register, handleSubmit, formState: { errors }, control } = useForm<IUsuario>({
    defaultValues: initialForm
  })

  const dispatch = useAppDispatch();

  const handleOnSubmit = async (usuario: IUsuario) => {
    console.log('Creando el usuario');

    dispatch(usuarioStartAdd(usuario));

  }


  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Usuarios' subHeading='Agregue, actualice o elimine usuarios' />
      </PageTitleWrapper>

      <Container maxWidth="lg" >

        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1} >

          <Grid item xs={12} md={6}>

            <UsuariosTable />
          </Grid>
          <Grid item xs={12} md={6}>

            <Card>
              <CardHeader title="Registrar usuarios" />


              <Box p={1} component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} >
                    <TextField
                      fullWidth
                      label="Nombres"
                      required
                      error={!!errors.nombres}
                      type='text'
                      {
                      ...register('nombres', {
                        required: 'Por favor ingrese el nombre',
                        minLength: { value: 5, message: 'Nombre no válido' }
                      })
                      }
                      variant="outlined" />

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='text'
                      label="Nombre de usuario"
                      required
                      error={!!errors.nombreUsuario}

                      {
                      ...register('nombreUsuario', {
                        required: 'Por favor ingrese el nombre',
                        minLength: { value: 5, message: 'Nombre no válido' }
                      })
                      }
                      variant="outlined" />

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contraseña"
                      required
                      error={!!errors.password}
                      type="password"
                      {
                      ...register('password', {
                        required: 'Por favor, ingrese una contraseña',
                        minLength: { value: 5, message: 'Contraseña no válida' }
                      })
                      }
                      variant="outlined" />

                  </Grid>

                  <Controller
                    name="idCargo"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) =>

                      <Grid item xs={12}>
                        <InputLabel id="select-cargo">Cargo</InputLabel>
                        <Select
                          labelId="select-cargo"
                          fullWidth
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Mesero</MenuItem>
                          <MenuItem value={3}>Despachador</MenuItem>

                        </Select>
                      </Grid>
                    }
                  />
                </Grid>

                <Button
                  type='submit'
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >Crear usuario</Button>

              </Box>


            </Card>
          </Grid>



        </Grid>


      </Container>

    </>

  )
}
