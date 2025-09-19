// db.ts
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
  users: {
    key: number;
    value: { id: number; name: string; age: number };
    indexes: { 'by-name': string };
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('my-database', 1, {
      upgrade(db) {
        const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by-name', 'name');
      },
    });
  }
  return dbPromise;
};
