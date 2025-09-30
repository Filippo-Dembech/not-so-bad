import { openDB } from "idb";
import { type Day } from "./types";
import { dateToString } from "./utils/dates";
import { questions } from "./questions";

export async function getInitialDate() {
    const days = await getAllDays();
    const today = dateToString(new Date());
    const result = days.find((day) => today == day.date);
    if (result) return result;
    return {
        date: today,
        questions: questions.map((question) => ({
            prompt: question,
            answers: [],
        })),
    };
}

const dbPromise = openDB("not-so-bad", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("days")) {
            db.createObjectStore("days", { keyPath: "date" });
        }
    },
});

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
    targetQuestion: string,
    targetAnswer: string
) {
    const newDay: Day = {
        ...day,
        questions: day.questions.map((question) =>
            question.prompt !== targetQuestion
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
