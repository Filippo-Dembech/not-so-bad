import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./CarouselButtons";
import { usePrevNextButtons } from "./usePrevNextButtons";
import { useDotButton } from "./useDotButton";
import { DotButton } from "./DotButton";
import { questions } from "./questions";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import Answer from "./ui/Answer";
import AutoHeight from "embla-carousel-auto-height";
import {
    deleteAnswer,
    getAllDays,
    getDay,
    getInitialDate,
    saveDay,
} from "./db";
import { dateToString, stringToDate } from "./utils/dates";
import { useSnackbar } from "./hooks/useSnackbar";

const options = {};

function App() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const [day, setDay] = useState<Day | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [historyDays, setHistoryDays] = useState<Day[] | undefined>(
        undefined
    );
    const [answer, setAnswer] = useState("");

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
            //sampleDays.forEach(async (sampleDay) => await saveDay(sampleDay))
        }
        initializeDay();
    }, []);

    useEffect(() => {
        emblaApi?.reInit();
    }, [day, emblaApi]);

    if (!day)
        return (
            <CircularProgress
                color="secondary"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        );

    return (
        <div style={{ padding: 20 }}>
            <Header />
            <Typography variant="subtitle1">
                This <strong>{day.date}</strong>
            </Typography>
            <section className="embla theme-light">
                <div
                    className="embla__viewport"
                    ref={emblaRef}
                >
                    <div className="embla__container">
                        {questions.map((question) => (
                            <div
                                className="embla__slide"
                                key={question}
                                style={{ textAlign: "center" }}
                            >
                                <div style={{ width: "80%", margin: "auto" }}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        margin={3}
                                    >
                                        {question}
                                    </Typography>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            setDay((day) => ({
                                                ...day!,
                                                questions: day!.questions.map(
                                                    (q) =>
                                                        q.prompt === question
                                                            ? {
                                                                  ...q,
                                                                  answers: [
                                                                      ...q.answers,
                                                                      answer,
                                                                  ],
                                                              }
                                                            : q
                                                ),
                                            }));
                                        }}
                                    >
                                        <TextField
                                            color="secondary"
                                            label="Type here..."
                                            value={answer}
                                            onChange={(e) => {
                                                setAnswer(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.code === "Tab") {
                                                    onNextButtonClick();
                                                }
                                                if (
                                                    e.code === "Tab" &&
                                                    e.shiftKey
                                                ) {
                                                    onPrevButtonClick();
                                                }
                                            }}
                                            fullWidth
                                        />
                                    </form>
                                </div>
                                <Box
                                    width="80%"
                                    margin="auto"
                                    gap={2}
                                    display="flex"
                                    flexDirection="column"
                                    marginTop={4}
                                >
                                    {day.questions
                                        .find((q) => q.prompt === question)
                                        ?.answers.map((answer, i) => (
                                            <Answer
                                                key={`${answer}-${i}`}
                                                text={answer}
                                                onDelete={async () => {
                                                    const newDay =
                                                        await deleteAnswer(
                                                            day,
                                                            question,
                                                            answer
                                                        );
                                                    setDay(newDay);
                                                }}
                                            />
                                        ))}
                                </Box>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__controls">
                    <div className="embla__buttons">
                        <PrevButton
                            onClick={() => {
                                setAnswer("");
                                onPrevButtonClick();
                            }}
                            disabled={prevBtnDisabled}
                        />
                        <NextButton
                            onClick={() => {
                                setAnswer("");
                                onNextButtonClick();
                            }}
                            disabled={nextBtnDisabled}
                        />
                    </div>
                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => {
                                    setAnswer("");
                                    onDotButtonClick(index);
                                }}
                                className={"embla__dot".concat(
                                    index === selectedIndex
                                        ? " embla__dot--selected"
                                        : ""
                                )}
                            />
                        ))}
                    </div>
                </div>
            </section>
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
