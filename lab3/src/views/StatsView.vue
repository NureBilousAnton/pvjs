<script setup>
import { useTasksStore } from '../stores/tasks'

const store = useTasksStore()

function fmtDate(d) {
  if (!d) return '—'
  const [, m, day] = d.split('-')
  return `${day}.${m}`
}
</script>

<template>
  <div>
    <h1>Статистика</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{{ store.stats.total }}</span>
        <span class="stat-label">Всього задач</span>
      </div>
      <div class="stat-card active">
        <span class="stat-value">{{ store.stats.active }}</span>
        <span class="stat-label">Активних</span>
      </div>
      <div class="stat-card done">
        <span class="stat-value">{{ store.stats.done }}</span>
        <span class="stat-label">Виконано</span>
      </div>
      <div class="stat-card overdue">
        <span class="stat-value">{{ store.stats.overdue }}</span>
        <span class="stat-label">Прострочено</span>
      </div>
    </div>

    <div v-if="store.upcomingDeadlines.length" class="upcoming">
      <h2>Найближчі дедлайни (наступні 3 дні)</h2>
      <ul class="upcoming-list">
        <li v-for="task in store.upcomingDeadlines" :key="task.id" class="upcoming-item">
          <RouterLink :to="`/tasks/${task.id}`" class="upcoming-title">{{ task.title }}</RouterLink>
          <div class="upcoming-right">
            <span class="badge category">{{ task.category }}</span>
            <span class="upcoming-date">{{ fmtDate(task.deadline) }}</span>
          </div>
        </li>
      </ul>
    </div>
    <p v-else class="no-upcoming">Немає задач з дедлайном протягом 3 днів</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 22px;
  margin-bottom: 20px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fafafa;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #333;
}

.stat-card.active .stat-value { color: #6c5ce7; }
.stat-card.done .stat-value   { color: #4caf50; }
.stat-card.overdue .stat-value { color: #e53935; }

.stat-label {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

.upcoming {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
}

.upcoming-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.upcoming-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.upcoming-item:last-child {
  border-bottom: none;
}

.upcoming-title {
  font-size: 14px;
  color: #222;
  text-decoration: none;
}

.upcoming-title:hover {
  color: #6c5ce7;
  text-decoration: underline;
}

.upcoming-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.upcoming-date {
  font-size: 13px;
  color: #888;
  min-width: 40px;
  text-align: right;
}

.no-upcoming {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}
</style>
