<script setup>
import { useEvents } from '../composables/useEvents.js'
import EventCard from '../components/EventCard.vue'

defineOptions({ name: 'EventListView' })

const { events } = useEvents()
</script>

<template>
  <div>
    <ul class="events-grid">
      <li v-for="event in events" :key="event.id" class="event-item">
        <EventCard :event="event" size="sm" />
        <div class="event-body">
          <span class="event-type">{{ event.type }}</span>
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-date">{{ event.date }}</p>
          <p class="event-desc">{{ event.description }}</p>
          <div class="event-actions">
            <RouterLink :to="`/events/${event.id}`" class="btn btn-ghost">Деталі</RouterLink>
            <RouterLink :to="`/events/${event.id}/register`" class="btn btn-primary">Реєстрація</RouterLink>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .events-grid { grid-template-columns: 1fr; }
}

.event-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.event-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.event-type {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
  display: block;
}

.event-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 4px;
}

.event-date {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 8px;
}

.event-desc {
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
  flex: 1;
  margin-bottom: 16px;
}

.event-actions {
  display: flex;
  gap: 8px;
}
</style>
