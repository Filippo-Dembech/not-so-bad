/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Day, Question } from "../types";
import { useLanguage } from "./LanguageContext";
import { getAllDays } from "../db";
import { dateToString } from "../utils/dates";

interface DaysContextType {
    currentDay?: Day;
    setCurrentDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    historyDays?: Day[];
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>;
    addAnswerTo: (question: Question, answer: string) => void;
    createDay: (date: string) => Day;
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
    
    function createDay(date: string): Day {
        return {
            date: date,
            questions: language!.questions.map((question) => ({
                id: question.id,
                answers: [],
            })),
        };
    }

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB, return
        async function getInitialDay(): Promise<Day> {
            const days = await getAllDays();
            const today = dateToString(new Date());
            const result = days.find((day) => today == day.date);
            if (result) return result;
            return createDay(today)
        }
        async function initializeDay() {
            const day = await getInitialDay();
            const historyDays = await getAllDays();
            setCurrentDay(day);
            setHistoryDays(historyDays);
        }
        initializeDay();
    }, [language]);

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

    return (
        <DaysContext.Provider
            value={{
                currentDay,
                historyDays,
                setCurrentDay,
                setHistoryDays,
                addAnswerTo,
                createDay
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
