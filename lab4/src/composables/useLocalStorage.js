import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored !== null ? JSON.parse(stored) : defaultValue)

  watch(value, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return value
}
