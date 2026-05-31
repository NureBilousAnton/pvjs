import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import RegisterView from '../views/RegisterView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/events' },
    { path: '/events', component: EventListView },
    { path: '/events/:id', component: EventDetailView },
    { path: '/events/:id/register', component: RegisterView },
  ],
})
