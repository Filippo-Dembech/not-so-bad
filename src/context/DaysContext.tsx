/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Day } from "../types";
import { useLanguage } from "./LanguageContext";
import { getAllDays } from "../db";
import { dateToString, stringToDate } from "../utils/dates";

interface DaysContextType {
    currentDay?: Day;
    selectedDate?: Date;
    historyDays?: Day[];
    setDay: React.Dispatch<React.SetStateAction<Day | undefined>>
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>
}

const DaysContext = createContext<DaysContextType | undefined>(undefined);

interface DaysProviderProps {
    children: ReactNode;
}

function DaysProvider({ children }: DaysProviderProps) {
    const [day, setDay] = useState<Day | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined
    );
    const [historyDays, setHistoryDays] = useState<Day[] | undefined>(
        undefined
    );

    const { language } = useLanguage();

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB, return
        async function getInitialDay() {
            const days = await getAllDays();
            const today = dateToString(new Date());
            const result = days.find((day) => today == day.date);
            if (result) return result;
            return {
                date: today,
                questions: language!.questions,
            };
        }
        async function initializeDay() {
            const day = await getInitialDay();
            const historyDays = await getAllDays();
            setDay(day);
            setHistoryDays(historyDays);
            setSelectedDate(stringToDate(day.date));
        }
        initializeDay();
    }, [language]);

    return (
        <DaysContext.Provider
            value={{ currentDay: day, selectedDate, historyDays, setDay, setSelectedDate, setHistoryDays }}
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
