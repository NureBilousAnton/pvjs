<script setup>
</script>

<template>
  <nav class="nav">
    <RouterLink to="/events" class="nav-brand">Події</RouterLink>
    <RouterLink to="/events" class="nav-link">Список подій</RouterLink>
  </nav>

  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive :include="['EventListView']">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
}

.nav-brand {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-h);
  letter-spacing: -0.5px;
}

.nav-link {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.15s;
}

.nav-link:hover {
  color: var(--text-h);
}

main {
  padding-bottom: 48px;
}
</style>
