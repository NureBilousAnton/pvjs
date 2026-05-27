<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../stores/tasks'

const props = defineProps({
  task: { type: Object, required: true },
})

const store = useTasksStore()

const PRIORITY_LABELS = { high: 'Високий', medium: 'Середній', low: 'Низький' }
const today = new Date().toISOString().slice(0, 10)

const isOverdue = computed(() => !props.task.done && !!props.task.deadline && props.task.deadline < today)

function fmtDate(d) {
  if (!d) return ''
  const [, m, day] = d.split('-')
  return `${day}.${m}`
}
</script>

<template>
  <li class="task-item" :class="{ overdue: isOverdue, done: task.done }">
    <button class="toggle-btn" :class="{ done: task.done }" @click="store.toggleTask(task.id)"></button>
    <div class="task-main">
      <span class="task-title">{{ task.title }}</span>
      <div class="task-meta">
        <span class="badge category">{{ task.category }}</span>
        <span class="badge priority" :class="task.priority">{{ PRIORITY_LABELS[task.priority] }}</span>
        <span v-if="task.deadline" class="deadline" :class="{ overdue: isOverdue }">
          {{ isOverdue ? 'прострочено до' : 'до' }} {{ fmtDate(task.deadline) }}
        </span>
      </div>
    </div>
    <div class="actions">
      <RouterLink :to="`/tasks/${task.id}/edit`" class="icon-btn" title="Редагувати">✏</RouterLink>
      <RouterLink :to="`/tasks/${task.id}`" class="icon-btn" title="Деталі">👁</RouterLink>
      <button class="icon-btn delete" @click="store.deleteTask(task.id)" title="Видалити">✕</button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
}

.task-item.overdue {
  border-color: #fca5a5;
  background: #fff8f8;
}

.task-item.done {
  opacity: 0.6;
}

.toggle-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background 0.2s, border-color 0.2s;
}

.toggle-btn.done {
  background: #4caf50;
  border-color: #4caf50;
}

.task-main {
  flex: 1;
  min-width: 0;
}

.task-title {
  display: block;
  font-size: 15px;
  margin-bottom: 4px;
}

.task-item.done .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.deadline {
  font-size: 12px;
  color: #888;
}

.deadline.overdue {
  color: #c00;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 2px;
  align-items: center;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 7px;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.15s;
}

.icon-btn:hover {
  background: #f0f0f0;
}

.icon-btn.delete:hover {
  color: #c00;
  background: #fff0f0;
}
</style>
