import { getToken } from '@siiges-ui/shared';

export default function submitRepresentante(validations, sections, setNoti, setLoading) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form } = validations;
  const token = getToken();

  fetch(`${url}/api/v1/usuarios/${form[sections].id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[sections]),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then(
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: '¡Éxito, no hubo problemas en esta sección!',
          type: 'success',
        });
      }, 1000),
    )
    .catch((err) => {
      console.error('Error:', err);
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: '¡Hubo un problema, revise que los campos estén correctos!',
          type: 'error',
        });
      }, 1000);
    });
}
