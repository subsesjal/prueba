import React from 'react';
import DocentesButtons from '../../../utils/Components/DocentesButtons';

const columns = (docentesTable, setDocentesList) => [
  { field: 'nombre', headerName: 'Nombre', width: 350 },
  { field: 'tipoDocente', headerName: 'Tipo de docente', width: 230 },
  { field: 'formacion', headerName: 'Formación profesional', width: 180 },
  { field: 'asignatura', headerName: 'Asignatura', width: 170 },
  { field: 'experiencia', headerName: 'Experiencia', width: 680 },
  {
    field: 'tipoContratacion',
    headerName: 'Contratacion',
    width: 150,
  },
  {
    field: 'antiguedad',
    headerName: 'Antiguedad',
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <DocentesButtons
        id={params.id}
        docentesList={docentesTable}
        setDocentesList={setDocentesList}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;
