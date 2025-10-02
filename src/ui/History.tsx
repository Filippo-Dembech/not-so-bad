import DatePicker from "react-datepicker";
import type { Day } from "../types";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useLanguage } from "../context/LanguageContext";

interface HistoryProps {
    selectedDay?: Date;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    historyDays?: Day[];
}

export default function History({
    selectedDay,
    setSelectedDay,
    setDay,
    historyDays,
}: HistoryProps) {
    const {language} = useLanguage();
    return (
        <div
            style={{
                position: "fixed",
                bottom: "1rem",
                left: "50%",
                zIndex: "999",
                transform: "translateX(-50%)", // because this <DatePicker> has a `transform` property set, <DatePicker> needs a `portalId` to stay on top of the UI
                backgroundColor: "white"
            }}
        >
            <DatePicker
                selected={selectedDay}
                calendarClassName="theme-light"
                onChange={async (date) => {
                    if (!date) return;
                    const newDay = await getDay(dateToString(date));
                    if (newDay) {
                        setDay(newDay);
                    } else {
                        setDay({
                            date: dateToString(date),
                            questions: language!.questions
                        });
                    }
                    setSelectedDay(date);
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
                customInput={<Button variant="outlined">{language!.history}</Button>}
                portalId="root-portal" // this ensures that the calendar stays on top of other elements
            />
        </div>
    );
}
