import DatePicker from "react-datepicker";
import type { Day } from "../types";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { questions } from "../questions";
import { Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

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
    return (
        <div
            style={{
                position: "absolute",
                bottom: "1rem",
                left: "50%",
                transform: "translateX(-50%)", // because this <DatePicker> has a `transform` property set, <DatePicker> needs a `portalId` to stay on top of the UI
            }}
        >
            <DatePicker
                selected={selectedDay}
                onChange={async (date) => {
                    if (!date) return;
                    const newDay = await getDay(dateToString(date));
                    if (newDay) {
                        setDay(newDay);
                    } else {
                        setDay({
                            date: dateToString(date),
                            questions: questions.map((question) => ({
                                prompt: question,
                                answers: [],
                            })),
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
                customInput={<Button variant="outlined">HISTORY</Button>}
                portalId="root-portal" // this ensures that the calendar stays on top of other elements
            />
        </div>
    );
}
