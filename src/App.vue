<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <img
        src="https://t2.tudocdn.net/687837?w=1920" 
        alt="Filmes em destaque"
        class="hero-poster"
      />
      <div class="overlay">
        <h1>🎬 Movie Wise</h1>
        <p>Descubra os melhores filmes</p>
      </div>
    </section>


    <!-- Navbar -->
    <nav class="navbar">
      <h2 class="navbar-title">🎬 Movie Wise</h2>
      <SearchBar @search="handleSearch" @clear="handleClear" />
    </nav>

    <!-- Seção de filmes -->
    <section class="top-movies">
      <h3>{{ sectionTitle }}</h3>

      <!-- Mensagem de não encontrado -->
      <div v-if="movies.length === 0" class="no-results">
        <p>Nenhum filme encontrado</p>
        <button class="retry-btn" @click="handleClear">Tentar novamente</button>
      </div>

      <div v-else class="carousel-container">
        <button class="nav-btn left" @click="scrollLeft">‹</button>
        <div class="movie-scroll" ref="scrollContainer">
          <MovieCard
            v-for="m in movies.slice(0,20)"
            :key="m.imdbID"
            :movie="m"
          />
        </div>
        <button class="nav-btn right" @click="scrollRight">›</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchBar from './components/SearchBar.vue';
import MovieCard from './components/MovieCard.vue';
import { onMounted, ref } from 'vue';
import { useMovies } from './composables/useMovies';

const { movies, featuredMovie, fetchMovies, fetchTopMovies, fetchFeaturedMovie } = useMovies();
const scrollContainer = ref(null);
const sectionTitle = ref('Top Filmes');

const scrollLeft = () => {
  scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
};
const scrollRight = () => {
  scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
};

const handleSearch = async (query) => {
  if (query.trim()) {
    await fetchMovies(query);
    sectionTitle.value = 'Busca de Filmes';
  }
};

const handleClear = () => {
  fetchTopMovies();
  sectionTitle.value = 'Top Filmes';
};

onMounted(() => {
  fetchFeaturedMovie();
  fetchTopMovies();
});
</script>
