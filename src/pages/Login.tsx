import { Grid, Box, TextField, Typography, FormControl, FormLabel, FormHelperText, Button, Link, Paper, Avatar, FormControlLabel, Checkbox } from '@mui/material';

import { startLogin } from '../reducers';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



const initialForm = {
  nombreUsuario: '',
  password: ''
}

interface FormData {
  nombreUsuario: string;
  password: string;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Santiago Quirumbay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const Login = () => {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: initialForm
  });


  const handleLogin = (form: FormData) => {
    console.log("Iniciando sesión")
    dispatch(startLogin(form.nombreUsuario, form.password));

  }

  return (
    <>
      <Box >
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Nombre de usuario"
                  error={!!errors.nombreUsuario}
                  {
                  ...register('nombreUsuario', {
                    required: 'Por favor, ingrese su nombre de usuario',
                    minLength: { value: 2, message: 'Nombre no valido' }
                  })
                  }
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  {
                  ...register('password', {
                    required: 'Por favor, ingrese su contraseña',
                    minLength: { value: 2, message: 'Contraseña no valida' }
                  })
                  }


                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
          {/*  <Grid item xs={12} md={6} >
            <Box sx={{ height: '100%', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


              <form onSubmit={handleSubmit(handleLogin)} >

                <FormControl
                  fullWidth
                  sx={{ width: 300 }}
                >
                  <FormLabel>
                    <Typography variant="h5" color="initial" align='center'>Iniciar Sesión</Typography>
                  </FormLabel>

                  <TextField
                    id="outlined-basic"
                    label="Nombre de usuario"
                    variant="outlined"
                    margin='dense'
                    error={!!errors.nombreUsuario}
                    {
                    ...register('nombreUsuario', {
                      required: 'Por favor, ingrese su nombre de usuario',
                      minLength: { value: 2, message: 'Nombre no valido' }
                    })
                    }

                  />

                  <TextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    error={!!errors.password}
                    {
                    ...register('password', {
                      required: 'Por favor, ingrese su contraseña',
                      minLength: { value: 2, message: 'Contraseña no valida' }
                    })
                    }
                    className='input-login'
                    margin='dense'

                    name='password'
                  />
                  <Button type='submit' variant="contained">
                    Iniciar Sesión
                  </Button>

                  <FormHelperText color='danger'>{errors.nombreUsuario?.message}</FormHelperText>
                  <FormHelperText color='danger'>{errors.password?.message}</FormHelperText>
                </FormControl>
              </form>

            </Box>

          </Grid> */}
        </Grid>
      </Box>

    </>
  )
}

