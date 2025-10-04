import DatePicker from "react-datepicker";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { useLanguage } from "../context/LanguageContext";
import { useDays } from "../context/DaysContext";

interface CalendarProps {
    onSelect: () => void;
}

export default function Calendar({ onSelect }: CalendarProps) {
    const { language } = useLanguage();
    const { selectedDate, setDay, setSelectedDate, historyDays } = useDays();
    return (
        <DatePicker
            selected={selectedDate}
            calendarClassName="theme-light"
            onChange={async (date) => {
                if (!date) return;
                const newDay = await getDay(dateToString(date));
                if (newDay) {
                    setDay(newDay);
                } else {
                    setDay({
                        date: dateToString(date),
                        questions: language!.questions,
                    });
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
