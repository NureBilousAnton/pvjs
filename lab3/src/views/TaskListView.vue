<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskItem from '../components/TaskItem.vue'

const store = useTasksStore()

const search = ref('')
const categoryFilter = ref('')
const priorityFilter = ref('')
const sortBy = ref('deadline')

const CATEGORIES = ['Робота', 'Навчання', 'Особисте']
const PRIORITIES = [
  { value: 'high', label: 'Високий' },
  { value: 'medium', label: 'Середній' },
  { value: 'low', label: 'Низький' },
]
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

const filteredTasks = computed(() => {
  let result = store.tasks

  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(q))
  }
  if (categoryFilter.value) {
    result = result.filter(t => t.category === categoryFilter.value)
  }
  if (priorityFilter.value) {
    result = result.filter(t => t.priority === priorityFilter.value)
  }

  result = [...result].sort((a, b) => {
    if (sortBy.value === 'priority') {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    }
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return a.deadline.localeCompare(b.deadline)
  })

  return result
})
</script>

<template>
  <div>
    <div class="toolbar">
      <div class="filters">
        <select v-model="categoryFilter">
          <option value="">Усі категорії</option>
          <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="priorityFilter">
          <option value="">Усі пріоритети</option>
          <option v-for="p in PRIORITIES" :key="p.value" :value="p.value">{{ p.label }}</option>
        </select>
        <select v-model="sortBy">
          <option value="deadline">Сортування: дедлайн</option>
          <option value="priority">Сортування: пріоритет</option>
        </select>
      </div>
      <RouterLink to="/tasks/new" class="add-btn">+ Додати задачу</RouterLink>
    </div>

    <div class="search-row">
      <input v-model="search" type="text" placeholder="Пошук за назвою..." class="search-input" />
    </div>

    <ul v-if="filteredTasks.length" class="task-list">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </ul>
    <p v-else class="empty">Задачі відсутні</p>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filters select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  background: #fff;
  cursor: pointer;
}

.add-btn {
  padding: 8px 16px;
  background: #6c5ce7;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.add-btn:hover {
  background: #5a4bd1;
}

.search-row {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 32px 0;
}
</style>
