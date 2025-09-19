import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Question } from './types';


interface MyDB extends DBSchema {
  days: {
    key: number;
    value: {
        id: number,
        date: string,
        questions: Question[]
    };
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('my-database', 1, {
      upgrade(db) {
        db.createObjectStore('days', { keyPath: 'id', autoIncrement: true });
      },
    });
  }
  return dbPromise;
};

