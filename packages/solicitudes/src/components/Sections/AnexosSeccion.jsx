import { Grid, Typography } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function AnexosSeccion({ disabled, id, type }) {
  const [fileURLs, setFileURLs] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const fileData = [
    'IDENTIFICACION_REPRESENTANTE',
    'COMPROBANTE_PAGO_RVOE',
    'FOTOGRAFIA_INMUEBLE',
    'CONSTANCIA_INFEJAL',
    'LICENCIA_MUNICIPAL',
    'DICTAMEN_IMPI',
    'SECRETARIA_SALUD',
    'COMPROBANTE_TELEFONO',
    'PROYECTO_VINCULACION',
    'PLAN_MEJORA',
    'FORMA_MIGRATORIA',
    'PROGRAMA_SUPERACION',
  ].map((tipoDocumento) => ({
    entidadId: id,
    tipoEntidad: 'SOLICITUD',
    tipoDocumento,
  }));

  useEffect(() => {
    if (type === 'editar' && id) {
      fileData.forEach((fileInfo, index) => {
        GetFile(fileInfo, (url, err) => {
          if (!err) {
            setFileURLs((currentURLs) => {
              const updatedURLs = [...currentURLs];
              updatedURLs[index] = url;
              return updatedURLs;
            });
          }
        });
      });
    }
  }, [type, id]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Anexos</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="IDENTIFICACION_REPRESENTANTE"
            id={id}
            url={fileURLs[0] || ''}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled={disabled}
            label="Identificación oficial con fotografía de la persona física, o acta constitutiva de la persona moral y poder de su Representante Legal"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="COMPROBANTE_PAGO_RVOE"
            id={id}
            url={fileURLs[1] || ''}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled={disabled}
            label="Comprobante de pago"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="FOTOGRAFIA_INMUEBLE"
            id={id}
            url={fileURLs[2] || ''}
            setUrl={(url) => handleFileLoaded(2, url)}
            disabled={disabled}
            label="Fotografías inmuebles"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="CONSTANCIA_INFEJAL"
            id={id}
            url={fileURLs[3] || ''}
            setUrl={(url) => handleFileLoaded(3, url)}
            disabled={disabled}
            label="Constancia INFEJAL"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="LICENCIA_MUNICIPAL"
            id={id}
            url={fileURLs[4] || ''}
            setUrl={(url) => handleFileLoaded(4, url)}
            disabled={disabled}
            label="Licencia municipal"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="DICTAMEN_IMPI"
            id={id}
            url={fileURLs[5] || ''}
            setUrl={(url) => handleFileLoaded(5, url)}
            disabled={disabled}
            label="Dictamen del Instituto Mexicano de Propiedad Intelectual (IMPI)"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="SECRETARIA_SALUD"
            id={id}
            url={fileURLs[6] || ''}
            setUrl={(url) => handleFileLoaded(6, url)}
            disabled={disabled}
            label="Aviso funcionamiento de Secretaría de Salud ó Carta bajo protesta de decir verdad de NO venta de alimentos."
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="COMPROBANTE_TELEFONO"
            id={id}
            url={fileURLs[7] || ''}
            setUrl={(url) => handleFileLoaded(7, url)}
            disabled={disabled}
            label="Comprobante de línea telefónica"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PROYECTO_VINCULACION"
            id={id}
            url={fileURLs[8] || ''}
            setUrl={(url) => handleFileLoaded(8, url)}
            disabled={disabled}
            label="Proyecto de vinculación y movilidad"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PLAN_MEJORA"
            id={id}
            url={fileURLs[9] || ''}
            setUrl={(url) => handleFileLoaded(9, url)}
            disabled={disabled}
            label="Plan de mejora"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="FORMA_MIGRATORIA"
            id={id}
            url={fileURLs[10] || ''}
            setUrl={(url) => handleFileLoaded(10, url)}
            disabled={disabled}
            label="Formas de migratorias de los profesores"
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="SOLICITUD"
            tipoDocumento="PROGRAMA_SUPERACION"
            id={id}
            url={fileURLs[11] || ''}
            setUrl={(url) => handleFileLoaded(11, url)}
            disabled={disabled}
            label="Programa de superación"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

AnexosSeccion.defaultProps = {
  id: null,
  type: null,
};

AnexosSeccion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.number,
  type: PropTypes.string,
};
