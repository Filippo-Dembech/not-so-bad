import {
    Alert,
    Button,
    Snackbar,
    Typography,
} from "@mui/material";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import useEmblaCarousel from "embla-carousel-react";
import { questions } from "./questions";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import AutoHeight from "embla-carousel-auto-height";
import {
    getAllDays,
    getDay,
    getInitialDate,
    saveDay,
} from "./db";
import { dateToString, stringToDate } from "./utils/dates";
import { useSnackbar } from "./hooks/useSnackbar";
import LoadingWheel from "./ui/LoadingWheel";
import QuestionsForm from "./ui/QuestionsForm";

const options = {};

function App() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()]);

    const [day, setDay] = useState<Day | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [historyDays, setHistoryDays] = useState<Day[] | undefined>(
        undefined
    );

    const {
        isSuccess,
        hasNoAnswer,
        showNoAnswerSnackbar,
        showSuccessSnackbar,
        hideNoAnswerSnackbar,
        hideSuccessSnackbar,
    } = useSnackbar();

    useEffect(() => {
        async function initializeDay() {
            const day = await getInitialDate();
            const historyDays = await getAllDays();
            setDay(day);
            setHistoryDays(historyDays);
            setSelectedDay(stringToDate(day.date));
        }
        initializeDay();
    }, []);

    useEffect(() => {
        emblaApi?.reInit();
    }, [day, emblaApi]);

    if (!day) return <LoadingWheel />;

    return (
        <div style={{ padding: 20 }}>
            <Header />
            <Typography variant="subtitle1">
                This <strong>{day.date}</strong>
            </Typography>
            <QuestionsForm 
                emblaRef={emblaRef}
                setDay={setDay}
                day={day}
                emblaApi={emblaApi}
            />
            <div
                style={{ width: "80%", maxWidth: "400px", margin: "2rem auto" }}
            >
                <Button
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={async () => {
                        if (
                            day.questions.every(
                                (question) => question.answers.length === 0
                            )
                        ) {
                            showNoAnswerSnackbar();
                            return;
                        }
                        await saveDay(day);
                        showSuccessSnackbar();
                    }}
                >
                    Save
                </Button>
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
                        customInput={
                            <Button variant="outlined">HISTORY</Button>
                        }
                        portalId="root-portal" // this ensures that the calendar stays on top of other elements
                    />
                </div>
            </div>
            <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                onClose={hideSuccessSnackbar}
            >
                <Alert
                    severity="success"
                    sx={{ backgroundColor: "green" }}
                    variant="filled"
                    onClose={hideSuccessSnackbar}
                >
                    Day successfully saved!
                </Alert>
            </Snackbar>
            <Snackbar
                open={hasNoAnswer}
                autoHideDuration={3000}
                onClose={hideNoAnswerSnackbar}
            >
                <Alert
                    severity="warning"
                    variant="filled"
                    onClose={hideNoAnswerSnackbar}
                >
                    Please, answer to at least one question!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default App;
