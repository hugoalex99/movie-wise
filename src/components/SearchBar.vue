<template>
  <div class="search-bar">
    <input
      ref="searchInput"
      type="text"
      v-model="query"
      placeholder="Buscar filmes..."
      @input="onInput"
    />
    <!-- Botão X -->
    <button
      v-if="query && !loading"
      class="clear-btn"
      @click="clearInput"
      type="button"
    >
      ×
    </button>
    <!-- Spinner -->
    <span v-if="loading" class="spinner"></span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search', 'clear']);
const query = ref('');
const searchInput = ref(null);
const loading = ref(false);
let debounceTimer = null;

const onInput = () => {
  clearTimeout(debounceTimer);
  if (query.value.trim()) {
    loading.value = true;
    debounceTimer = setTimeout(async () => {
      emit('search', query.value);
      loading.value = false;
    }, 300);
  } else {
    emit('clear');
    loading.value = false;
  }
};

const clearInput = () => {
  query.value = '';
  searchInput.value.focus();
  emit('clear');
  loading.value = false;
};
</script>
