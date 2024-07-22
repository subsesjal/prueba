import { Grid, IconButton, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonsForm, Context, DefaultModal } from '@siiges-ui/shared';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function SolicitudesActions({ id, estatus }) {
  const { session, setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [consultLink, setConsultLink] = useState(`/solicitudes/detallesSolicitudes/${id}`);
  const [showButtons, setShowButtons] = useState({
    consultar: true,
    editar: false,
    eliminar: false,
    ver: false,
  });

  useEffect(() => {
    switch (session.rol) {
      case 'representante':
        setShowButtons({
          ver: true,
          consultar: true,
          editar: estatus === 1 || estatus === 200,
          eliminar: estatus === 1 || estatus === 200,
        });
        break;
      case 'control_documental':
        setConsultLink(`/solicitudes/detallesSolicitudes/${id}/recepcionFormatos`);
        setShowButtons({
          consultar: estatus === 3,
          editar: estatus === 2,
          eliminar: false,
        });
        break;
      default:
        setShowButtons({ consultar: true, editar: false, eliminar: false });
        break;
    }
  }, [session.rol]);

  const handleDelete = () => {
    setOpen(false);
    setNoti({
      open: true,
      message: `Funcionalidad pendiente, intento eliminar solicitud: ${id}`,
      type: 'error',
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {showButtons.ver && (
          <Grid item xs={4}>
            <Link
              href={`/solicitudes/detallesSolicitudes/${id}/consultarSolicitud`}
              passHref
            >
              <IconButton aria-label="ver">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Link>
          </Grid>
        )}
        {showButtons.consultar && (
          <Grid item xs={4}>
            <Link href={consultLink} passHref>
              <IconButton aria-label="consultar">
                <ListAltIcon />
              </IconButton>
            </Link>
          </Grid>
        )}
        {showButtons.editar && (
          <Grid item xs={4}>
            <Link
              href={`/solicitudes/detallesSolicitudes/${id}/editarSolicitud`}
              passHref
            >
              <IconButton aria-label="editar">
                <EditIcon />
              </IconButton>
            </Link>
          </Grid>
        )}
        {showButtons.eliminar && (
          <Grid item xs={4}>
            <IconButton aria-label="eliminar" onClick={() => setOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <DefaultModal title="Eliminar solicitud" open={open} setOpen={setOpen}>
        <Typography>
          ¿Está seguro que quiere eliminar esta solicitud?
        </Typography>
        <ButtonsForm cancel={() => setOpen(false)} confirm={handleDelete} />
      </DefaultModal>
    </>
  );
}

SolicitudesActions.propTypes = {
  id: PropTypes.number.isRequired,
  estatus: PropTypes.number.isRequired,
};

export default SolicitudesActions;
