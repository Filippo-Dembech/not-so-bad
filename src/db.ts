import { openDB } from "idb";
import { type Day } from "./types";

const dbPromise = openDB("not-so-bad", 3, {
    upgrade(db, oldVersion) {
        if (oldVersion < 3) {
            for (const storeName of db.objectStoreNames) {
                db.deleteObjectStore(storeName);
            }
        }
        if (!db.objectStoreNames.contains("days")) {
            db.createObjectStore("days", { keyPath: "date" });
        }
        if (!db.objectStoreNames.contains("settings")) {
            db.createObjectStore("settings", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("questions")) {
            db.createObjectStore("questions", { keyPath: "id" });
        }
    },
});

export async function saveLanguage(language: string) {
    const db = await dbPromise;
    await db.put("settings", { key: "language", value: language });
}

export async function getLanguage() {
    const db = await dbPromise;
    const result = await db.get("settings", "language");
    return result?.value;
}

export async function saveDay(day: Day) {
    const db = await dbPromise;
    await db.put("days", day);
}

export async function getDay(date: string): Promise<Day | undefined> {
    const db = await dbPromise;
    return db.get("days", date);
}

export async function getAllDays(): Promise<Day[]> {
    const db = await dbPromise;
    return db.getAll("days");
}

export async function deleteDay(date: string): Promise<void> {
    const db = await dbPromise;
    await db.delete("days", date);
}

export async function deleteAnswer(
    day: Day,
    questionId: number,
    targetAnswer: string
) {
    const newDay: Day = {
        ...day,
        questions: day.questions.map((question) =>
            question.id !== questionId
                ? question
                : {
                      ...question,
                      answers: question.answers.filter(
                          (answer) => answer !== targetAnswer
                      ),
                  }
        ),
    };
    if (newDay.questions.every((question) => question.answers.length === 0)) {
        await deleteDay(newDay.date);
    } else {
        await saveDay(newDay);
    }
    // return `newDay` in order to sync the UI
    return newDay;
}

export async function deleteAllDays(): Promise<void> {
    const db = await dbPromise;
    const tx = db.transaction("days", "readwrite");
    const store = tx.objectStore("days");
    await store.clear();
    await tx.done;
}

export async function getAllQuestions() {
    const db = await dbPromise;
    return db.getAll("questions");
}

export async function saveQuestion(id: number) {
    const db = await dbPromise;
    const tx = db.transaction("questions", "readwrite");
    await tx.store.put({ id });
}

export async function updateQuestions(questionIds: number[]) {
    const db = await dbPromise;
    const tx = db.transaction("questions", "readwrite");
    const store = tx.objectStore("questions");

    // clear old data
    await store.clear();

    // insert new data
    for (const id of questionIds) {
        await store.put({ id });
    }

    await tx.done;
}

export async function deleteQuestionById(id: number) {
    const db = await dbPromise;
    const tx = db.transaction("questions", "readwrite");
    await tx.store.delete(id);
    await tx.done;
}
