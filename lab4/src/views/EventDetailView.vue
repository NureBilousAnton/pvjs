<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '../composables/useEvents.js'
import { useRegistration } from '../composables/useRegistration.js'
import EventCard from '../components/EventCard.vue'

const route = useRoute()
const router = useRouter()
const { findEvent } = useEvents()

const eventId = Number(route.params.id)
const event = computed(() => findEvent(eventId))

const { registrations, toast } = useRegistration(eventId)

if (!event.value) {
  router.push('/events')
}
</script>

<template>
  <div v-if="event">
    <RouterLink to="/events" class="back-link">← Назад</RouterLink>

    <div class="detail-layout">
      <EventCard :event="event" size="lg" rounded />

      <div class="detail-info">
        <h1>{{ event.title }}</h1>
        <p class="detail-date">{{ event.date }}</p>
        <p class="detail-desc">{{ event.description }}</p>
        <RouterLink :to="`/events/${eventId}/register`" class="btn btn-primary">
          Зареєструватися →
        </RouterLink>
      </div>
    </div>

    <div class="participants-section">
      <p class="section-label">Зареєстровані учасники</p>
      <ul v-if="registrations.length" class="participants-list">
        <li v-for="r in registrations" :key="r.email" class="participant-item">
          <span class="participant-name">{{ r.name }}</span>
          <span class="participant-email">{{ r.email }}</span>
        </li>
      </ul>
      <p v-else class="empty-text">Поки що ніхто не зареєструвався. Будь першим!</p>
    </div>
  </div>
  <Teleport to="body">
    <div v-if="toast" class="toast-fixed" :class="toast.type">
      {{ toast.message }}
    </div>
  </Teleport>
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

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  margin-bottom: 40px;
  align-items: start;
}

@media (max-width: 640px) {
  .detail-layout { grid-template-columns: 1fr; }
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-info h1 { font-size: 32px; }

.detail-date {
  font-size: 13px;
  color: var(--accent);
}

.detail-desc {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
}

.participants-section {
  border-top: 1px solid var(--border);
  padding-top: 28px;
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.participants-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.participant-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.participant-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
}

.participant-email {
  font-size: 13px;
  color: var(--text-muted);
}

.empty-text {
  font-size: 14px;
  color: var(--text-muted);
}
</style>
