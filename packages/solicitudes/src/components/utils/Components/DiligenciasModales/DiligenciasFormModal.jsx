import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import {
  DefaultModal,
  Context,
  Input,
  validateField,
  ButtonSimple,
  InputTime,
} from '@siiges-ui/shared';
import handleEdit from '../../submitEditDiligencias';
import handleCreate from '../../submitNewDiligencias';
import DatosGeneralesContext from '../../Context/datosGeneralesContext';
import errorDatosDiligencias from '../../sections/errors/errorDatosDiligencias';

export default function DiligenciasFormModal({
  open,
  hideModal,
  mode,
  title,
  id,
}) {
  const {
    diligencias,
    setDiligencias,
    setDiligenciasRows,
    formDiligencias,
    setFormDiligencias,
    setError,
    error,
  } = useContext(DatosGeneralesContext);
  const { setNoti, setLoading } = useContext(Context);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (mode !== 'create' && diligencias) {
      const rowItem = diligencias.find((item) => item.id === id);

      if (rowItem) {
        const rowItemValues = {
          solicitudId: rowItem.solicitudId,
          personaId: rowItem.personaId,
          horaInicio: rowItem.horaInicio,
          horaFin: rowItem.horaFin,
          persona: {
            nombre: rowItem.persona.nombre,
            apellidoPaterno: rowItem.persona.apellidoPaterno,
            apellidoMaterno: rowItem.persona.apellidoMaterno,
            tituloCargo: rowItem.persona.tituloCargo,
            correoPrimario: rowItem.persona.correoPrimario,
            telefono: rowItem.persona.telefono,
            celular: rowItem.persona.celular,
          },
        };
        setFormDiligencias(rowItemValues);
        if (mode === 'consult') {
          setDisabled(true);
        }
      } else {
        setNoti({
          open: true,
          message: 'No se encontró esta diligencia',
          type: 'error',
        });
      }
    }
  }, [diligencias, mode, id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDiligencias((prevData) => {
      if (
        name === 'nombre'
        || name === 'apellidoPaterno'
        || name === 'apellidoMaterno'
        || name === 'tituloCargo'
        || name === 'correoPrimario'
        || name === 'telefono'
        || name === 'celular'
      ) {
        return {
          ...prevData,
          persona: {
            ...prevData.persona,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    const combinedFields = {
      ...formDiligencias.persona,
      horaInicio: formDiligencias.horaInicio,
      horaFin: formDiligencias.horaFin,
    };
    if (formDiligencias && formDiligencias.persona) {
      validateField(combinedFields, name, setError, errorDatosDiligencias);
    }
  };

  const handleOnSubmit = () => {
    const allFieldsValid = Object.keys(error).every((key) => !error[key]);
    if (allFieldsValid) {
      setLoading(true);
      if (mode === 'edit') {
        handleEdit(
          formDiligencias,
          setDiligencias,
          setDiligenciasRows,
          hideModal,
          setNoti,
          id,
          setLoading,
        );
      } else {
        handleCreate(
          formDiligencias,
          setDiligencias,
          setDiligenciasRows,
          hideModal,
          setNoti,
          setLoading,
        );
      }
    } else {
      setNoti({
        message: 'Please correct the errors before submitting.',
        type: 'error',
      });
    }
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.nombre}
            value={formDiligencias?.persona?.nombre ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoPaterno"
            label="Primer Apellido"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.apellidoPaterno}
            value={formDiligencias?.persona?.apellidoPaterno ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoMaterno"
            label="Segundo Apellido"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.apellidoMaterno}
            value={formDiligencias?.persona?.apellidoMaterno ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tituloCargo"
            label="Cargo"
            name="tituloCargo"
            auto="tituloCargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.tituloCargo}
            value={formDiligencias?.persona?.tituloCargo ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correoPrimario"
            label="Correo"
            name="correoPrimario"
            auto="correoPrimario"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.correoPrimario}
            value={formDiligencias?.persona?.correoPrimario ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="telefono"
            label="Teléfono"
            name="telefono"
            auto="telefono"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.telefono}
            value={formDiligencias?.persona?.telefono ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="celular"
            label="Celular"
            name="celular"
            auto="celular"
            onchange={handleOnChange}
            value={formDiligencias?.persona?.celular ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <InputTime
            id="horaInicio"
            label="Hora Inicio"
            name="horaInicio"
            auto="horaInicio"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.horaInicio}
            value={formDiligencias?.horaInicio ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <InputTime
            id="horaFin"
            label="Hora Fin"
            name="horaFin"
            auto="horaFin"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            errorMessage={error.horaFin}
            value={formDiligencias?.horaFin ?? ''}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={9.7}>
          <ButtonSimple
            text="Cancelar"
            alt="Cancelar"
            design="cancel"
            onClick={hideModal}
            align="right"
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonSimple
            text="Guardar"
            alt="Guardar"
            onClick={handleOnSubmit}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DiligenciasFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['create', 'edit', 'consult']).isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
