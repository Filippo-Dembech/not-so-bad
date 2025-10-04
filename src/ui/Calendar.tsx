import DatePicker from "react-datepicker";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { useDays } from "../context/DaysContext";
import type { Day } from "../types";
import { useState } from "react";

interface CalendarProps {
    onSelect: () => void;
}

export default function Calendar({ onSelect }: CalendarProps) {
    const { currentDay, setCurrentDay, historyDays, createDay } = useDays();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        stringToDate(currentDay!.date)
    );

    async function getCurrentDay(date: Date): Promise<Day> {
        const dbDay = await getDay(dateToString(date));
        if (dbDay) return dbDay;
        return createDay(dateToString(date))
    }

    return (
        <DatePicker
            selected={selectedDate}
            calendarClassName="theme-light"
            onChange={async (date) => {
                if (!date) return;
                setCurrentDay(await getCurrentDay(date));
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
