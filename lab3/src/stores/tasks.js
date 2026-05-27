import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'pvjs-tasks'

export const useTasksStore = defineStore('tasks', () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  const tasks = ref(saved ? JSON.parse(saved) : [])
  let nextId = tasks.value.reduce((max, t) => Math.max(max, t.id), 0) + 1

  watch(tasks, val => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  function todayStr() {
    return new Date().toISOString().slice(0, 10)
  }

  const activeTasks = computed(() => tasks.value.filter(t => !t.done))
  const doneTasks = computed(() => tasks.value.filter(t => t.done))
  const overdueTasks = computed(() =>
    tasks.value.filter(t => !t.done && t.deadline && t.deadline < todayStr())
  )
  const countByCategory = computed(() => {
    const counts = {}
    for (const t of tasks.value) {
      counts[t.category] = (counts[t.category] || 0) + 1
    }
    return counts
  })
  const upcomingDeadlines = computed(() => {
    const now = todayStr()
    const d = new Date()
    d.setDate(d.getDate() + 3)
    const limit = d.toISOString().slice(0, 10)
    return tasks.value
      .filter(t => !t.done && t.deadline && t.deadline >= now && t.deadline <= limit)
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
  })

  const stats = computed(() => ({
    total: tasks.value.length,
    active: activeTasks.value.length,
    done: doneTasks.value.length,
    overdue: overdueTasks.value.length,
  }))

  function addTask(data) {
    tasks.value.push({ id: nextId++, done: false, ...data })
  }

  function updateTask(id, data) {
    const task = tasks.value.find(t => t.id === id)
    if (task) Object.assign(task, data)
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  return {
    tasks,
    activeTasks, doneTasks, overdueTasks, countByCategory, upcomingDeadlines, stats,
    addTask, updateTask, deleteTask, toggleTask,
  }
})
