import { openDB } from "idb";
import { type Day } from "./types";

const dbPromise = openDB("not-so-bad", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("days")) {
            db.createObjectStore("days", { keyPath: "date" });
        }
    },
});

export async function saveLanguage() {
    
}

export async function getLanguage() {
    
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
    if (newDay.questions.every(question => question.answers.length === 0)) {
        await deleteDay(newDay.date)
    } else {
        await saveDay(newDay);
    }
    // return `newDay` in order to sync the UI
    return newDay;
}
