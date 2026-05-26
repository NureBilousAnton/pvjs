<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleFavorite'])
</script>

<template>
  <div class="card">
    <div class="card-img-wrap">
      <img
        :src="`https://picsum.photos/id/${image.id}/400/300`"
        :alt="image.author"
        loading="lazy"
      />
    </div>
    <div class="card-footer">
      <div class="card-info">
        <span class="author">{{ image.author }}</span>
        <span class="image-id">#{{ index }}</span>
      </div>
      <button
        class="fav-btn"
        :class="{ active: isFavorite }"
        @click="emit('toggleFavorite', image.id)"
        :title="isFavorite ? 'Видалити з обраних' : 'Додати до обраних'"
      >
        ★
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.card-img-wrap {
  aspect-ratio: 4 / 3;
  background: #f0f0f0;
  overflow: hidden;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  gap: 8px;
}

.card-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.author {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-id {
  font-size: 11px;
  color: #999;
}

.fav-btn {
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  color: #ccc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.fav-btn.active {
  color: #fff;
  background: #6c5ce7;
  border-color: #6c5ce7;
}

.fav-btn:hover:not(.active) {
  border-color: #6c5ce7;
  color: #6c5ce7;
}
</style>
