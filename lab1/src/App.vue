<script setup>
import { ref, computed } from 'vue'
import TodoList from './components/TodoList.vue'

const todos = ref([])
const newTask = ref('')
const filter = ref('all')

let nextId = 1

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.done)
  if (filter.value === 'done') return todos.value.filter(t => t.done)
  return todos.value
})

function addTask() {
  const text = newTask.value.trim()
  if (!text) return

  todos.value.push({ id: nextId++, text, done: false })
  newTask.value = ''
}

function toggleTask(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function deleteTask(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="container">
    <h1>Список задач TO-DO List</h1>

    <div class="input-row">
      <input
        v-model="newTask"
        type="text"
        placeholder="Введіть задачу"
        @keyup.enter="addTask"
      />
      <button class="add-btn" @click="addTask">Додати</button>
    </div>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Всі</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Активні</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Виконані</button>
    </div>

    <TodoList
      :todos="filteredTodos"
      @toggle="toggleTask"
      @delete="deleteTask"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 560px;
  margin: 40px auto;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

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
</style>
