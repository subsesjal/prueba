import { FoliosData } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function CrearCertificado() {
  return (
    <Layout title="Agregar Solicitud de Folios de certificado">
      <FoliosData solicitudType="certificado" />
    </Layout>
  );
}
