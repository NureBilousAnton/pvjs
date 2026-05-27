<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskItem from '../components/TaskItem.vue'

const store = useTasksStore()
const newTask = ref('')

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  store.addTask(text)
  newTask.value = ''
}
</script>

<template>
  <div>
    <h1>Менеджер задач</h1>

    <div class="input-row">
      <input
        v-model="newTask"
        type="text"
        placeholder="Нова задача..."
        @keyup.enter="addTask"
      />
      <button class="add-btn" @click="addTask">Додати</button>
    </div>

    <div class="filters">
      <button :class="{ active: store.filter === 'all' }" @click="store.setFilter('all')">Всі</button>
      <button :class="{ active: store.filter === 'active' }" @click="store.setFilter('active')">Активні</button>
      <button :class="{ active: store.filter === 'done' }" @click="store.setFilter('done')">Виконані</button>
    </div>

    <ul v-if="store.filteredTasks.length" class="task-list">
      <TaskItem v-for="task in store.filteredTasks" :key="task.id" :task="task" />
    </ul>
    <p v-else class="empty">Задачі відсутні</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 22px;
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  padding: 8px 16px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background: #5a4bd1;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filters button {
  padding: 5px 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
}

.filters button.active {
  background: #6c5ce7;
  color: white;
  border-color: #6c5ce7;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty {
  color: #999;
  font-size: 14px;
}
</style>
