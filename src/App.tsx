import { Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import AutoHeight from "embla-carousel-auto-height";
import { getAllDays, getInitialDate } from "./db";
import { stringToDate } from "./utils/dates";
import { useSnackbar } from "./hooks/useSnackbar";
import LoadingWheel from "./ui/LoadingWheel";
import QuestionsForm from "./ui/QuestionsForm";
import SaveButton from "./ui/SaveButton";
import History from "./ui/History";
import SuccessSnackbar from "./ui/SuccessSnackbar";
import NoAnswerSnackbar from "./ui/NoAnswerSnackbar";

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
                <SaveButton
                    day={day}
                    showSuccess={showSuccessSnackbar}
                    showNoAnswer={showNoAnswerSnackbar}
                />
                <History
                    setDay={setDay}
                    setSelectedDay={setSelectedDay}
                    historyDays={historyDays}
                    selectedDay={selectedDay}
                />
            </div>
            <SuccessSnackbar
                isOpen={isSuccess}
                onClose={hideSuccessSnackbar}
            />
            <NoAnswerSnackbar
                isOpen={hasNoAnswer}
                onClose={hideNoAnswerSnackbar}
            />
        </div>
    );
}

export default App;
