<template>
  <div class="movie-card animate-fadeIn">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
      :alt="movie.Title"
    />
    <div class="info">
      <h2>{{ movie.Title }}</h2>
      <p>{{ movie.Year }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>
