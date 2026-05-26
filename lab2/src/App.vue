<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageCard from './components/ImageCard.vue'

const images = ref([])
const isLoading = ref(false)
const error = ref(null)
const favorites = ref([])
const searchQuery = ref('')
const showFavorites = ref(false)

const filteredImages = computed(() => {
  let list = images.value

  if (showFavorites.value) {
    list = list.filter(img => favorites.value.includes(img.id))
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    list = list.filter(img => img.author.toLowerCase().includes(query))
  }

  return list
})

async function fetchImages() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20')

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`)
    }

    images.value = await response.json()
  } catch (e) {
    error.value = e.message || 'Не вдалося завантажити зображення'
  } finally {
    isLoading.value = false
  }
}

function toggleFavorite(id) {
  const index = favorites.value.indexOf(id)
  if (index === -1) {
    favorites.value.push(id)
  } else {
    favorites.value.splice(index, 1)
  }
}

onMounted(fetchImages)
</script>

<template>
  <div class="container">
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Пошук за автором"
      />
      <div class="view-toggle">
        <button :class="{ active: !showFavorites }" @click="showFavorites = false">Всі</button>
        <button :class="{ active: showFavorites }" @click="showFavorites = true">Обрані</button>
      </div>
    </div>

    <div v-if="isLoading" class="status-message">Завантаження...</div>

    <div v-else-if="error" class="status-message error">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="fetchImages">Спробувати ще раз</button>
    </div>

    <div v-else-if="filteredImages.length === 0" class="status-message">
      Нічого не знайдено
    </div>

    <div v-else class="gallery">
      <ImageCard
        v-for="(image, index) in filteredImages"
        :key="image.id"
        :image="image"
        :index="index + 1"
        :isFavorite="favorites.includes(image.id)"
        @toggleFavorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 32px auto;
  padding: 0 16px;
  font-family: system-ui, sans-serif;
}

.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.view-toggle {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.view-toggle button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s, color 0.15s;
}

.view-toggle button.active {
  background: #6c5ce7;
  color: #fff;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 720px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

.status-message {
  text-align: center;
  padding: 48px 0;
  color: #666;
  font-size: 15px;
}

.status-message.error {
  color: #c00;
}

.retry-btn {
  margin-top: 12px;
  padding: 8px 20px;
  background: #6c5ce7;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
