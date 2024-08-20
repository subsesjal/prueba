import {
  Grid, IconButton, Typography, TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import { ButtonsForm, Context, DefaultModal } from '@siiges-ui/shared';

function SolicitudesActions({ id, estatus }) {
  const { session, setNoti } = useContext(Context);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [comments, setComments] = useState('');
  const [consultLink, setConsultLink] = useState(`/solicitudes/detallesSolicitudes/${id}`);
  const [showButtons, setShowButtons] = useState({
    consultar: true,
    editar: false,
    eliminar: false,
    descargar: false,
  });

  useEffect(() => {
    switch (session.rol) {
      case 'representante':
        setShowButtons({
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
          descargar: estatus === 10,
        });
        break;
      default:
        setShowButtons({
          consultar: true, editar: false, eliminar: false,
        });
        break;
    }
  }, [session.rol]);

  const handleDelete = () => {
    setOpenDelete(false);
    setNoti({
      open: true,
      message: `Funcionalidad pendiente, intento eliminar solicitud: ${id}`,
      type: 'error',
    });
  };

  const handleDownload = () => {
    setOpenDownload(false);
    setNoti({
      open: true,
      message: `Solicitud: ${id} descargada con comentarios: ${comments}`,
      type: 'success',
    });
  };

  return (
    <>
      <Grid container spacing={2}>
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
            <IconButton aria-label="eliminar" onClick={() => setOpenDelete(true)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
        {showButtons.descargar && (
          <Grid item xs={4}>
            <IconButton aria-label="descargar" onClick={() => setOpenDownload(true)}>
              <PrintIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <DefaultModal title="Eliminar solicitud" open={openDelete} setOpen={setOpenDelete}>
        <Typography>
          ¿Está seguro que quiere eliminar esta solicitud?
        </Typography>
        <ButtonsForm cancel={() => setOpenDelete(false)} confirm={handleDelete} confirmText="Confirmar" />
      </DefaultModal>
      <DefaultModal title="Descargar solicitud" open={openDownload} setOpen={setOpenDownload}>
        <Typography>
          ¿Está seguro que quiere descargar esta solicitud con los siguientes comentarios?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          label="Comentarios"
        />
        <ButtonsForm cancel={() => setOpenDownload(false)} confirm={handleDownload} confirmText="Descargar" />
      </DefaultModal>
    </>
  );
}

SolicitudesActions.propTypes = {
  id: PropTypes.number.isRequired,
  estatus: PropTypes.number.isRequired,
};

export default SolicitudesActions;
