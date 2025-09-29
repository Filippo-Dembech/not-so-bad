import { openDB } from 'idb'
import { type Day } from './types'

const dbPromise = openDB('not-so-bad', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('days')) {
      db.createObjectStore('days', { keyPath: 'date' })
    }
  },
})

export async function saveDay(day: Day) {
  const db = await dbPromise
  await db.put('days', day)
}

export async function getDay(date: string): Promise<Day | undefined> {
  const db = await dbPromise
  return db.get('days', date)
}

export async function getAllDays(): Promise<Day[]> {
  const db = await dbPromise
  return db.getAll('days')
}

export async function deleteDay(date: string) {
  const db = await dbPromise
  await db.delete('days', date)
}