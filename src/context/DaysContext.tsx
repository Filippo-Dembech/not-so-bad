/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Day, Question } from "../types";
import { useLanguage } from "./LanguageContext";
import {
    deleteAllDays,
    deleteAnswer,
    getAllDays,
    getDay,
    saveDay,
} from "../db";
import { dateToString } from "../utils/dates";
import type { FileData } from "../ui/Import";

interface DaysContextType {
    currentDay?: Day;
    setCurrentDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    historyDays?: Day[];
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>;
    addAnswerTo: (question: Question, answer: string) => void;
    deleteAnswerFrom: (question: Question, answer: string) => void;
    createDay: (date: string) => Day;
    overwriteDays: (days: FileData) => void;
    addAnswers: (days: FileData) => void;
}

const DaysContext = createContext<DaysContextType | undefined>(undefined);

interface DaysProviderProps {
    children: ReactNode;
}

function DaysProvider({ children }: DaysProviderProps) {
    const [currentDay, setCurrentDay] = useState<Day | undefined>(undefined);
    const [historyDays, setHistoryDays] = useState<Day[] | undefined>(
        undefined
    );

    const { language } = useLanguage();

    const createDay = useCallback(
        (date: string): Day => ({
            date,
            questions: language!.questions.map((question) => ({
                id: question.id,
                answers: [],
            })),
        }),
        [language]
    );

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB, return
        async function getInitialDay(): Promise<Day> {
            const days = await getAllDays();
            const today = dateToString(new Date());
            const dbDay = days.find((day) => today == day.date);
            return dbDay || createDay(today);
        }
        async function initializeDay() {
            const initialDay = await getInitialDay();
            const historyDays = await getAllDays();
            setCurrentDay(initialDay);
            setHistoryDays(historyDays);
        }
        initializeDay();
    }, [createDay, language]);

    function addAnswerTo(question: Question, answer: string) {
        if (!answer) return;
        setCurrentDay((day) => ({
            ...day!,
            questions: day!.questions.map((q) =>
                q.id === question.id
                    ? {
                          ...q,
                          answers: [...q.answers, answer],
                      }
                    : q
            ),
        }));
    }

    async function deleteAnswerFrom(question: Question, answer: string) {
        const newDay = await deleteAnswer(currentDay!, question.id, answer);
        if (
            newDay.questions.every((question) => question.answers.length === 0)
        ) {
            setHistoryDays((historyDays) =>
                historyDays?.filter(
                    (historyDay) => historyDay.date !== newDay.date
                )
            );
        }
        setCurrentDay(newDay);
    }

    async function overwriteDays(days: FileData) {
        await deleteAllDays();
        days.forEach(async (day) => await saveDay(day));
        const day = await getDay(currentDay!.date);
        const allDays = await getAllDays();
        if (day) {
            setCurrentDay(day);
        } else {
            setCurrentDay(createDay(currentDay!.date));
        }
        setHistoryDays(allDays);
    }

    async function addAnswers(days: FileData) {
        const dbDays = await getAllDays();
        if (dbDays.length > 0) {
            const updatedDays = [];
            // Update all days that are present in the DB
            for (const day of dbDays) {
                const updatedDay = {
                    ...day,
                    questions: day.questions.map((question) => ({
                        ...question,
                        answers: [
                            ...question.answers,
                            ...(days.find((newDay) => newDay.date === day.date)
                                ?.questions[question.id - 1].answers || []),
                        ],
                    })),
                };
                updatedDays.push(updatedDay);
                await saveDay(updatedDay);
            }
            // Add all days that are not present in the DB
            for (const day of days) {
                if (!dbDays.some(dbDay => dbDay.date === day.date)) {
                    await saveDay(day);
                    updatedDays.push(day);
                }
            }
            setHistoryDays(updatedDays);

        } else {
            overwriteDays(days);
            setHistoryDays(days);
        }
    }

    return (
        <DaysContext.Provider
            value={{
                currentDay,
                historyDays,
                setCurrentDay,
                setHistoryDays,
                addAnswerTo,
                createDay,
                deleteAnswerFrom,
                overwriteDays,
                addAnswers,
            }}
        >
            {children}
        </DaysContext.Provider>
    );
}

function useDays() {
    const context = useContext(DaysContext);
    if (!context)
        throw new Error("useDays() must be used within a <DaysProvider>");
    return context;
}

export { DaysProvider, useDays };
