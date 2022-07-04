import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button } from '@mui/material/'

// Iconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

// Servicios
import { getCategoriasByIdSeccion } from '../../selectors/';

// Component
import { Categoria, Modal, ModalEditarCategoria, ModalEliminarCategoria } from './';

import { useModal } from '../../hooks/useModal';
import { ICategoria } from '../../interfaces';
import {  selectCategorias, selectSecciones } from '../../reducers';


export function EditarCategorias() {

  // Se busca por nombre en el URL
  let { nombreSeccion } = useParams();

  const { seccionActiva } = useSelector(selectSecciones);


  //TODO Sino se envia el nombre de la seccion redireccionar a menu

  const { categorias } = useSelector(selectCategorias);
  const { secciones } = useSelector(selectSecciones);

  const [categoriasSeccion, setCategoriasSeccion] = useState<ICategoria[]>([]);

  const [idSeccion, setIdSeccion] = useState<number>(0);
  // La categoria que se va a editar en el modal
  const [categoria, setCategoria] = useState<ICategoria | null>(null);

  const [actualizar, setActualizar] = useState(false)

  const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
  const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);


  let rutaAtras = "/menu/editar";

  const getSeccion = (nombreSeccion: string) => {

    const seccion = secciones.find(seccion => seccion.nombreSeccion === nombreSeccion);
    return seccion;

  }

  const establecerCategorias = () => {

    let seccion = getSeccion(nombreSeccion!);

    if (seccion) {

      setCategoriasSeccion(getCategoriasByIdSeccion(secciones, seccion.idSeccion!, categorias));

      setIdSeccion(seccion.idSeccion!);

    } else {
      // TODO Redireccionar 
    }
  }





  // Abrir el modal de editar
  const editarCategoria = (categoria: ICategoria | null) => {

    setCategoria(categoria);
    openModalEditar();
  }

  // Abrir el modal de eliminar
  const eliminarCategoria = (categoria: ICategoria) => {
    setCategoria(categoria);
    openModalEliminar();
  }


  useEffect(() => {

    console.log("Cambios en la seccion")
    establecerCategorias();

    setActualizar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorias])

  useEffect(() => {

    establecerCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>

      <Box mb={2} display='flex' justifyContent='space-between'>


        <Link to={rutaAtras}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} >
          </Button>
        </Link>

        <Typography align="center" variant="h6" color="initial">{nombreSeccion}</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => editarCategoria(null)}>
          Añadir
        </Button>

      </Box>
      {
        categorias.length === 0 && (
          <Typography variant='subtitle1'>Aún no se han ingresado categorias</Typography>
        )
      }

      <Box minHeight={"70vh"}>
        <Grid container rowSpacing={1} spacing={1}>
          {
            categoriasSeccion.length > 0 && categoriasSeccion.map(categoria => (
              <Categoria
                key={categoria.idCategoria}
                categoria={categoria}
                nombreSeccion={nombreSeccion!}
                editarCategoria={editarCategoria}
                eliminarCategoria={eliminarCategoria}
              />

            ))
          }
        </Grid>

      </Box>

      <Link to={rutaAtras}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} >Atras
        </Button>
      </Link>


      <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalEditarCategoria

          categoria={categoria}
          closeModal={closeModalEditar}
          secciones={secciones}
          idSeccion={idSeccion}
        />
      </Modal>

      <Modal open={isOpenEliminar} closeModal={closeModalEliminar}>
        <ModalEliminarCategoria
          categoria={categoria!}
          closeModal={closeModalEliminar}

        />
      </Modal>





    </>
  )
}

export default EditarCategorias
