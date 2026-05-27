<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasks'

const route = useRoute()
const router = useRouter()
const store = useTasksStore()

const PRIORITY_LABELS = { high: 'Високий', medium: 'Середній', low: 'Низький' }
const today = new Date().toISOString().slice(0, 10)

const task = computed(() => store.tasks.find(t => t.id === Number(route.params.id)))
const isOverdue = computed(() =>
  task.value && !task.value.done && task.value.deadline && task.value.deadline < today
)

function fmtDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}.${m}.${y}`
}

function handleDelete() {
  store.deleteTask(task.value.id)
  router.push('/tasks')
}
</script>

<template>
  <div v-if="task">
    <RouterLink to="/tasks" class="back-link">← Назад до списку</RouterLink>
    <h1>{{ task.title }}</h1>

    <div class="badges">
      <span class="badge category">{{ task.category }}</span>
      <span class="badge priority" :class="task.priority">{{ PRIORITY_LABELS[task.priority] }} пріоритет</span>
      <span v-if="isOverdue" class="overdue-label">Прострочено до {{ fmtDate(task.deadline) }}</span>
    </div>

    <div class="detail-grid">
      <div class="detail-card">
        <span class="label">Статус</span>
        <span class="value">{{ task.done ? 'Виконана' : 'Активна' }}</span>
      </div>
      <div class="detail-card">
        <span class="label">Категорія</span>
        <span class="value">{{ task.category }}</span>
      </div>
      <div class="detail-card">
        <span class="label">Дедлайн</span>
        <span class="value" :class="{ overdue: isOverdue }">{{ fmtDate(task.deadline) }}</span>
      </div>
    </div>

    <div v-if="task.description" class="description-block">
      <span class="label">Опис</span>
      <p class="description-text">{{ task.description }}</p>
    </div>

    <div class="actions">
      <RouterLink :to="`/tasks/${task.id}/edit`" class="btn edit-btn">✏ Редагувати</RouterLink>
      <button class="btn delete-btn" @click="handleDelete">✕ Видалити</button>
    </div>
  </div>

  <div v-else>
    <RouterLink to="/tasks" class="back-link">← Назад до списку</RouterLink>
    <p class="not-found">Задачу не знайдено</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
}

.back-link {
  display: inline-block;
  color: #6c5ce7;
  font-size: 14px;
  margin-bottom: 16px;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.badges {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.overdue-label {
  font-size: 13px;
  color: #c00;
  font-weight: 500;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.label {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.value {
  font-size: 16px;
  font-weight: 500;
}

.value.overdue {
  color: #c00;
}

.description-block {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
  margin-bottom: 24px;
}

.description-text {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 9px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.edit-btn {
  background: #6c5ce7;
  color: #fff;
}

.edit-btn:hover {
  background: #5a4bd1;
}

.delete-btn {
  background: #fff;
  color: #c00;
  border: 1px solid #fca5a5;
}

.delete-btn:hover {
  background: #fff0f0;
}

.not-found {
  color: #999;
  font-size: 16px;
  text-align: center;
  padding: 40px 0;
}
</style>
