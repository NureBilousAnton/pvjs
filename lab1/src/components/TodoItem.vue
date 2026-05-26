<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <li class="todo-item">
    <button class="toggle-btn" :class="{ done: todo.done }" @click="emit('toggle', todo.id)"></button>
    <span class="todo-text" :class="{ done: todo.done }">{{ todo.text }}</span>
    <button class="delete-btn" @click="emit('delete', todo.id)">Видалити</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
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
  background: #555;
  border-color: #555;
}

.todo-text {
  flex: 1;
  font-size: 15px;
}

.todo-text.done {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 8px;
}

.delete-btn:hover {
  color: #c00;
}
</style>
