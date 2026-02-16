import { ref } from 'vue';
import { searchMovies } from '../services/api';

export function useMovies() {
  const movies = ref([]);
  const loading = ref(false);
  const featuredMovie = ref(null);

  // Busca em tempo real (quando o usuário digita na barra de busca)
  const fetchMovies = async (query) => {
    if (!query) {
      movies.value = [];
      return;
    }
    loading.value = true;
    movies.value = await searchMovies(query);
    loading.value = false;
  };

  // Busca inicial para Top Filmes (exemplo: Avengers)
  const fetchTopMovies = async () => {
    loading.value = true;
    movies.value = await searchMovies('Avengers');
    loading.value = false;
  };

  // Busca inicial para Hero (filme destaque, exemplo: Batman)
  const fetchFeaturedMovie = async () => {
    const result = await searchMovies('Batman');
    featuredMovie.value = result[0]; // pega o primeiro resultado
  };

  return {
    movies,
    loading,
    featuredMovie,
    fetchMovies,
    fetchTopMovies,
    fetchFeaturedMovie,
  };
}
