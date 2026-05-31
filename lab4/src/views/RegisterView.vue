<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '../composables/useEvents.js'
import { useRegistration } from '../composables/useRegistration.js'
import EventCard from '../components/EventCard.vue'

const route = useRoute()
const router = useRouter()
const { findEvent } = useEvents()

const eventId = Number(route.params.id)
const event = computed(() => findEvent(eventId))

const { register, isLoading, isRegistered } = useRegistration(eventId)

if (!event.value) {
  router.push('/events')
}

const form = ref({ name: '', email: '' })
const errors = ref({})

function validate() {
  const e = {}

  if (!form.value.name.trim()) {
    e.name = "Ім'я є обов'язковим"
  }

  if (!form.value.email.trim()) {
    e.email = 'Email є обов\'язковим'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    e.email = 'Введіть коректний email'
  } else if (isRegistered(form.value.email)) {
    e.email = 'Цей email вже зареєстровано на цю подію'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

function submit() {
  if (!validate()) return

  register(form.value.name.trim(), form.value.email.trim())
  router.push(`/events/${eventId}`)
}
</script>

<template>
  <div v-if="event">
    <RouterLink to="/events" class="back-link">← Назад</RouterLink>

    <div class="register-layout">
      <div class="register-left">
        <EventCard :event="event" size="lg" rounded />
        <div class="event-meta">
          <h2>{{ event.title }}</h2>
          <p class="event-date">{{ event.date }}</p>
          <p class="event-desc">{{ event.description }}</p>
        </div>
      </div>

      <div class="register-right">
        <h2 class="form-heading">Реєстрація</h2>
        <p class="form-sub">Заповніть форму і ми надішлемо підтвердження на вашу пошту</p>

        <form @submit.prevent="submit" class="form">
          <div class="field">
            <input
              v-model="form.name"
              type="text"
              placeholder="Ім'я"
              :class="{ 'input-error': errors.name }"
              :disabled="isLoading"
            />
            <span v-if="errors.name" class="err">{{ errors.name }}</span>
          </div>

          <div class="field">
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              :class="{ 'input-error': errors.email }"
              :disabled="isLoading"
            />
            <span v-if="errors.email" class="err">{{ errors.email }}</span>
          </div>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Реєстрація...' : 'Зареєструватися' }}
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
.back-link {
  display: inline-block;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
  transition: color 0.15s;
}
.back-link:hover { color: var(--text-h); }

.register-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 640px) {
  .register-layout { grid-template-columns: 1fr; }
}

.register-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-meta h2 { font-size: 20px; margin-bottom: 4px; }

.event-date {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 6px;
}

.event-desc {
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
}

.register-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-heading { font-size: 22px; }

.form-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: -8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input {
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-h);
  font-size: 14px;
  width: 100%;
  transition: border-color 0.15s;
}

input:focus {
  outline: none;
  border-color: var(--accent);
}

input:disabled { opacity: 0.6; }

input::placeholder { color: var(--text-muted); }

.input-error { border-color: var(--danger) !important; }

.err {
  font-size: 12px;
  color: var(--danger);
}

.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 12px;
  margin-top: 4px;
}
</style>
