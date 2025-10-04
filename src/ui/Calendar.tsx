import DatePicker from "react-datepicker";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { useLanguage } from "../context/LanguageContext";
import { useDays } from "../context/DaysContext";
import type { Day } from "../types";
import { useState } from "react";

interface CalendarProps {
    onSelect: () => void;
}

export default function Calendar({ onSelect }: CalendarProps) {
    const { language } = useLanguage();
    const { currentDay, setDay, historyDays } = useDays();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(stringToDate(currentDay!.date))
    return (
        <DatePicker
            selected={selectedDate}
            calendarClassName="theme-light"
            onChange={async (date) => {
                if (!date) return;
                const dbDay = await getDay(dateToString(date));
                if (dbDay) {
                    setDay(dbDay);
                } else {
                    const newDay: Day = {
                        date: dateToString(date),
                        questions: language!.questions,
                    }
                    setDay(newDay);
                }
                setSelectedDate(date);
                onSelect();
            }}
            dayClassName={(date) =>
                historyDays?.some(
                    (day) =>
                        stringToDate(day.date).toDateString() ===
                        date.toDateString()
                )
                    ? "highlight"
                    : ""
            }
            inline
            portalId="root-portal" // this ensures that the calendar stays on top of other elements
        />
    );
}
