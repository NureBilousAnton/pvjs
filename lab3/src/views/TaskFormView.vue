<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasks'

const route = useRoute()
const router = useRouter()
const store = useTasksStore()

const isEdit = computed(() => !!route.params.id)
const existingTask = computed(() => store.tasks.find(t => t.id === Number(route.params.id)))
const today = new Date().toISOString().slice(0, 10)

const form = ref({
  title: '',
  description: '',
  category: 'Робота',
  priority: 'medium',
  deadline: '',
  done: false,
})

const errors = ref({})

onMounted(() => {
  if (isEdit.value) {
    if (!existingTask.value) {
      router.push('/tasks')
      return
    }
    form.value = { ...existingTask.value }
  }
})

function validate() {
  const e = {}
  if (!form.value.title.trim()) {
    e.title = "Назва є обов'язковою"
  }
  if (!isEdit.value && form.value.deadline && form.value.deadline < today) {
    e.deadline = 'Дедлайн не може бути у минулому'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

function save() {
  if (!validate()) return
  if (isEdit.value && existingTask.value) {
    store.updateTask(existingTask.value.id, { ...form.value })
    router.push(`/tasks/${existingTask.value.id}`)
  } else {
    store.addTask({ ...form.value })
    router.push('/tasks')
  }
}

const backPath = computed(() => isEdit.value ? `/tasks/${route.params.id}` : '/tasks')
</script>

<template>
  <div>
    <RouterLink :to="backPath" class="back-link">
      ← {{ isEdit ? 'Назад до деталей' : 'Назад до списку' }}
    </RouterLink>
    <h1>{{ isEdit ? 'Редагування задачі' : 'Нова задача' }}</h1>

    <form @submit.prevent="save" class="form">
      <div class="form-group">
        <label>Назва задачі</label>
        <input v-model="form.title" type="text" :class="{ 'input-error': errors.title }" placeholder="Введіть назву..." />
        <span v-if="errors.title" class="error-msg">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label>Опис</label>
        <textarea v-model="form.description" rows="3" placeholder="Необов'язково..."></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Категорія</label>
          <select v-model="form.category">
            <option>Робота</option>
            <option>Навчання</option>
            <option>Особисте</option>
          </select>
        </div>
        <div class="form-group">
          <label>Пріоритет</label>
          <select v-model="form.priority">
            <option value="high">Високий</option>
            <option value="medium">Середній</option>
            <option value="low">Низький</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Дедлайн</label>
          <input v-model="form.deadline" type="date" :class="{ 'input-error': errors.deadline }" />
          <span v-if="errors.deadline" class="error-msg">{{ errors.deadline }}</span>
        </div>
        <div v-if="isEdit" class="form-group">
          <label>Статус</label>
          <select v-model="form.done">
            <option :value="false">Активна</option>
            <option :value="true">Виконана</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <RouterLink :to="backPath" class="btn cancel-btn">Скасувати</RouterLink>
        <button type="submit" class="btn save-btn">{{ isEdit ? 'Зберегти зміни' : 'Створити' }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-size: 22px;
  margin: 0 0 24px;
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

.form {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #6c5ce7;
  background: #fff;
}

.input-error {
  border-color: #e55 !important;
}

.error-msg {
  font-size: 12px;
  color: #c00;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
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
}

.cancel-btn {
  background: #f0f0f0;
  color: #555;
}

.cancel-btn:hover {
  background: #e4e4e4;
}

.save-btn {
  background: #6c5ce7;
  color: #fff;
}

.save-btn:hover {
  background: #5a4bd1;
}
</style>
