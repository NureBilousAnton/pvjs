import { ref } from 'vue'

const EVENTS = [
  {
    id: 1,
    title: 'Vue Meetup',
    type: 'Мітап',
    date: '2026-06-01',
    tagline: 'Talks, networking and snacks — meet other Vue devs.',
    description: 'Зустріч Vue-розробників у дружній атмосфері. Доповіді, нетворкінг і закуски.',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  },
  {
    id: 2,
    title: 'Frontend Conf',
    type: 'Конференція',
    date: '2026-06-12',
    tagline: 'Performance, accessibility, modern tooling.',
    description: 'Повний день доповідей про продуктивність, доступність і сучасні інструменти фронтенду.',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
  },
  {
    id: 3,
    title: 'Hackathon',
    type: 'Хакатон',
    date: '2026-07-20',
    tagline: 'All rows to build something awesome with mentors and prizes.',
    description: '48 годин, щоб побудувати щось неймовірне — ментори, призи та незабутній досвід.',
    gradient: 'linear-gradient(135deg, #b45309 0%, #f97316 100%)',
  },
]

export function useEvents() {
  const events = ref(EVENTS)

  function findEvent(id) {
    return events.value.find(e => e.id === Number(id)) ?? null
  }

  return { events, findEvent }
}
