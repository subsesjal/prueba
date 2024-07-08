import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import handleCreate from '../../submitNewAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { grados } from '../../Mocks/mockAsignaturas';
import errorDatosAsignaturasFormacion from '../../sections/errors/errorDatosAsignaturasFormacion';

export default function AsignaturasFormacionCreateModal({
  open,
  hideModal,
  title,
}) {
  const {
    setAsignaturasFormacionList,
    setAsignaturasTotalList,
    formAsignaturasFormacion,
    setFormAsignaturasFormacion,
    asignaturasTotalList,
    setError,
    error,
    setErrors,
    initialValues,
    setInitialValues,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const { setLoading } = useContext(Context);

  const errorsAsignatura = errorDatosAsignaturasFormacion(
    formAsignaturasFormacion,
    setError,
    error,
  );

  useEffect(() => {
    if (errorsAsignatura !== undefined) {
      setErrors(errorsAsignatura);
    }

    // Set the default value for gradoId to 25
    setFormAsignaturasFormacion((prevForm) => ({
      ...prevForm,
      gradoId: 25,
    }));
  }, [error, setFormAsignaturasFormacion, setErrors]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturasFormacion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (
      errorsAsignatura[name]
      && typeof errorsAsignatura[name] === 'function'
    ) {
      if (value !== initialValue || value === '') {
        errorsAsignatura[name]();
      }
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = () => {
    const matchingGrade = grados.optativa.find(
      (grade) => grade.id === formAsignaturasFormacion.gradoId,
    );
    const updatedFormAsignaturas = matchingGrade
      ? { ...formAsignaturasFormacion, grado: matchingGrade.nombre }
      : { ...formAsignaturasFormacion };

    handleCreate(
      updatedFormAsignaturas,
      setFormAsignaturasFormacion,
      setInitialValues,
      setAsignaturasFormacionList,
      hideModal,
      setNoti,
      2,
      setLoading,
      setAsignaturasTotalList,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            value={formAsignaturasFormacion.nombre || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.nombre}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="clave"
            label="Clave"
            name="clave"
            auto="clave"
            value={formAsignaturasFormacion.clave || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.clave}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="creditos"
            label="Créditos"
            name="creditos"
            auto="creditos"
            value={formAsignaturasFormacion.creditos || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="academia"
            label="Academia"
            name="academia"
            auto="academia"
            value={formAsignaturasFormacion.academia || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.academia}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            title="Seriacion"
            name="seriacion"
            value={formAsignaturasFormacion.seriacion || ''}
            options={asignaturasTotalList || []}
            onchange={handleOnChange}
            textValue
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasDocente"
            label="Horas docente"
            name="horasDocente"
            auto="horasDocente"
            value={formAsignaturasFormacion.horasDocente || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horasDocente}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasIndependiente"
            label="Horas independiente"
            name="horasIndependiente"
            auto="horasIndependiente"
            value={formAsignaturasFormacion.horasIndependiente || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            errorMessage={error.horasIndependiente}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          >
            Cancelar
          </ButtonStyled>
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Guardar"
            alt="Guardar"
            onclick={handleOnSubmit}
          >
            Confirmar
          </ButtonStyled>
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

AsignaturasFormacionCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
