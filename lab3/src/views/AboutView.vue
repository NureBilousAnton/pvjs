<script setup>
import { useTasksStore } from '../stores/tasks'

const store = useTasksStore()
</script>

<template>
  <div>
    <h1>Про застосунок</h1>
    <p>Менеджер задач побудований на Vue 3, Pinia та Vue Router.</p>

    <div class="stats">
      <div class="stat-card">
        <span class="stat-value">{{ store.stats.total }}</span>
        <span class="stat-label">Всього</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ store.stats.active }}</span>
        <span class="stat-label">Активних</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ store.stats.done }}</span>
        <span class="stat-label">Виконаних</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 22px;
  margin-bottom: 12px;
}

p {
  color: #555;
  margin-bottom: 24px;
}

.stats {
  display: flex;
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #6c5ce7;
}

.stat-label {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}
</style>
