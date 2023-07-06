import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8008',
});

//request on graph route

export async function graphConverter(data: FormData) {
  const response = await api.post('/api/v1/graphs', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.content;
}
