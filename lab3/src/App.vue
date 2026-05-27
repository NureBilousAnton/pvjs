<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <span class="brand">Task Manager</span>
    <div class="nav-links">
      <RouterLink to="/tasks">Задачі</RouterLink>
      <RouterLink to="/stats">Статистика</RouterLink>
    </div>
  </nav>

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 52px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.brand {
  font-weight: 600;
  font-size: 16px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  padding-bottom: 2px;
}

.nav-links a.router-link-active {
  color: #6c5ce7;
  font-weight: 500;
  border-bottom: 2px solid #6c5ce7;
}

.main {
  max-width: 800px;
  margin: 32px auto;
  padding: 0 16px;
}
</style>
