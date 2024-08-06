export default function errorDatosNewInstitucion(form, setError, error) {
  const errors = {
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: '¡Nombre de institución incorrecto!' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    razonSocial: () => {
      if (form.razonSocial === undefined || form.razonSocial === '') {
        setError({ ...error, razonSocial: '¡Razón social inválida!' });
        return false;
      }
      setError({ ...error, razonSocial: '' });
      return true;
    },
  };

  return errors;
}
