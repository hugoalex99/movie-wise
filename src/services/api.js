import axios from 'axios';

const apiKey = 'ca76b230'; // substitua pela sua chave da OMDb
const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
});

export const searchMovies = async (query) => {
  try {
    const response = await api.get('', {
      params: {
        s: query,
        apikey: apiKey,
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};
