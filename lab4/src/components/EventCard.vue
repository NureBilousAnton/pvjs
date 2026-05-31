<script setup>
defineProps({
  event: { type: Object, required: true },
  size: { type: String, default: 'sm' },
  rounded: { type: Boolean, default: false },
})
</script>

<template>
  <div class="event-banner" :class="[size, { rounded }]" :style="{ background: event.gradient }">
    <h2 class="banner-title">{{ event.title }}</h2>
    <p class="banner-tagline">{{ event.tagline }}</p>
  </div>
</template>

<style scoped>
.event-banner {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 12px 12px 0 0;
}

.event-banner.rounded {
  border-radius: 12px;
}

.event-banner.sm {
  min-height: 130px;
}

.event-banner.lg {
  min-height: 240px;
}

.banner-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
}

.banner-tagline {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  line-height: 1.4;
}
</style>
