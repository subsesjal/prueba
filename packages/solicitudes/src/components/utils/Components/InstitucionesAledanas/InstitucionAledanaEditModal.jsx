import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import handleEdit from '../../submitEditInstitucionAledana';
import PlantelContext from '../../Context/plantelContext';
import errorDatosInstitucionAledanas from '../../sections/errors/errorDatosInstitucionAledanas';

export default function InstitucionAledanaEditModal({
  open,
  hideModal,
  edit,
  rowItem,
}) {
  const {
    setInstitucionesAledanas,
    formInstitucionesAledanas,
    setFormInstitucionesAledanas,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    plantelId,
  } = useContext(PlantelContext);

  const { setNoti, setLoading } = useContext(Context);

  useEffect(() => {
    if (rowItem) {
      setFormInstitucionesAledanas(rowItem);
    }
  }, []);

  const errorsInstitucionAledana = errorDatosInstitucionAledanas(
    formInstitucionesAledanas,
    setError,
    error,
  );

  useEffect(() => {
    if (errorsInstitucionAledana !== undefined) {
      setErrors(errorsInstitucionAledana);
    }
  }, [error]);

  const handleOnChange = (e) => {
    console.log(formInstitucionesAledanas);
    const { name, value } = e.target;
    setFormInstitucionesAledanas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsInstitucionAledana[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = () => {
    handleEdit(
      formInstitucionesAledanas,
      setFormInstitucionesAledanas,
      setInitialValues,
      setInstitucionesAledanas,
      hideModal,
      errors,
      setNoti,
      plantelId,
      setLoading,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            value={formInstitucionesAledanas.nombre || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tiempo"
            label="Tiempo"
            name="tiempo"
            auto="tiempo"
            type="time"
            value={formInstitucionesAledanas.tiempo || ''}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.tiempo}
            required
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Guardar"
            alt="Guardar"
            onclick={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

InstitucionAledanaEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    nombre: PropTypes.string,
    tiempo: PropTypes.string,
  }).isRequired,
};
