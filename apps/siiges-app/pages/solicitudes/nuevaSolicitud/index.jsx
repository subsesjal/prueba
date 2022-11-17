import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  ModuleHeader,
  DatosGenerales,
  Plantel,
  PlanEstudios,
  Anexos,
  EvaluacionCurricular,
  PlataformaEducativa,
} from '@siiges-ui/solicitudes';

const stepsEscolarizada = [
  'Plan de estudios',
  'Datos generales',
  'Plantel',
  'Anexos',
  'Evaluacion curricular',
];

const stepsNoEscolarizada = [
  'Plan de estudios',
  'Datos generales',
  'Plantel',
  'Plataforma educativa',
  'Anexos',
  'Evaluacion curricular',
];

function newRequest() {
  const router = useRouter();
  const { query } = router;
  const { modalidad } = query;
  const [module, setModule] = useState(0);
  const nextModule = () => {
    setModule(module + 1);
  };

  if (modalidad === 'escolarizada') {
    return (
      <Layout type={false}>
        <ModuleHeader
          steps={stepsEscolarizada}
          type="Nueva solicitud"
          date="22 de Agosto 2022"
          nextModule={nextModule}
          module={module}
        />
        {module === 0 && <PlanEstudios />}
        {module === 1 && <DatosGenerales />}
        {module === 2 && <Plantel />}
        {module === 3 && <Anexos />}
        {module === 4 && <EvaluacionCurricular />}
      </Layout>
    );
  }
  return (
    <Layout type={false}>
      <ModuleHeader
        steps={stepsNoEscolarizada}
        type="Nueva solicitud"
        date="22 de Agosto 2022"
        nextModule={nextModule}
        module={module}
      />
      {module === 0 && <PlanEstudios />}
      {module === 1 && <DatosGenerales />}
      {module === 2 && <Plantel />}
      {module === 3 && <PlataformaEducativa />}
      {module === 4 && <Anexos />}
      {module === 5 && <EvaluacionCurricular />}
    </Layout>
  );
}

export default newRequest;