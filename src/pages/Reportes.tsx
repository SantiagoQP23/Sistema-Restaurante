import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Container, FormControl, Grid, Tab, Tabs, TextField } from '@mui/material';

import { PageTitle } from '../components/ui';
import { PageTitleWrapper } from '../components/ui/PageTitleWraper';

import { useFecha } from '../hooks/useFecha';

import { parsearFecha } from '../helpers/fecha';
import { Meseros } from '../components/reportes';

export const Reportes = () => {

  const { fecha, setFecha } = useFecha();
  const [modo, setModo] = useState(1)

  const navigate = useNavigate();

  const cambiarFecha = (fecha: Date) => {

    // la fecha se guarda como string
    setFecha(parsearFecha(fecha));

    navigate(`?fecha=${parsearFecha(fecha)}`);

  }

  const cambiarModo = (value: number) => {
    setModo(value);
  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Reportes' subHeading='Análisis para toma de decisiones'></PageTitle>
      </PageTitleWrapper>

      <Container maxWidth='lg'>

        <Tabs
          value={modo}
          onChange={(e, value) => cambiarModo(value)}
          variant="scrollable"
          textColor='primary'
          scrollButtons="auto"
          indicatorColor='primary'
        >
          <Tab key={1} label={"Diario"} value={1} wrapped/>
          <Tab key={2} label={"Semanal"} value={2} wrapped/>
          <Tab key={3} label={"Mensual"} value={3} wrapped/>
          <Tab key={4} label={"Anual"} value={4} wrapped/>

        </Tabs>




        <Grid item xs={6} lg={3}>
          <FormControl fullWidth color='primary'>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <MobileDatePicker
                label="Fecha"
                inputFormat="dd/MM/yyyy"
                value={new Date(`${fecha}T21:11:54`)}
                onChange={(value) => cambiarFecha(value as Date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

          </FormControl>

        </Grid>

        <Meseros modo={modo} fecha={fecha} />



      </Container>
 



    </>
  )
}
