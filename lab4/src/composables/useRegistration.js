import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

const STORAGE_KEY = 'pvjs-lab4-registrations'

const allRegistrations = useLocalStorage(STORAGE_KEY, {})

// Shared toast so EventDetailView can display it after optimistic navigation
const toast = ref(null)

function fakeApiRegister() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('Сервер тимчасово недоступний. Спробуйте ще раз.'))
      } else {
        resolve()
      }
    }, 1200)
  })
}

function showToast(type, message) {
  toast.value = { type, message }
  setTimeout(() => { toast.value = null }, 3500)
}

export function useRegistration(eventId) {
  const registrations = computed(() => allRegistrations.value[eventId] ?? [])

  const isLoading = ref(false)

  async function register(name, email) {
    const prev = [...(allRegistrations.value[eventId] ?? [])]
    const entry = { name, email, registeredAt: new Date().toISOString() }

    allRegistrations.value = { ...allRegistrations.value, [eventId]: [...prev, entry] }
    isLoading.value = true

    try {
      await fakeApiRegister()
      showToast('success', `${name}, вас успішно зареєстровано!`)
    } catch (err) {
      allRegistrations.value = { ...allRegistrations.value, [eventId]: prev }
      showToast('error', err.message)
    } finally {
      isLoading.value = false
    }
  }

  function isRegistered(email) {
    return registrations.value.some(r => r.email.toLowerCase() === email.toLowerCase())
  }

  return { registrations, isLoading, toast, register, isRegistered }
}
