import { defineStore } from 'pinia';
import { searchMovies } from '../services/api';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
  }),
  actions: {
    async fetchMovies(query) {
      if (!query) {
        this.movies = [];
        return;
      }
      this.loading = true;
      this.movies = await searchMovies(query);
      this.loading = false;
    },
  },
});
