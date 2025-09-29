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
import { usePrevNextButtons, PrevButton, NextButton } from "./CarouselButtons";
import { useDotButton } from "./useDotButton";
import { DotButton } from "./useDotButton";
import { questions } from "./questions";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import Answer from "./ui/Answer";
import AutoHeight from "embla-carousel-auto-height";
import { deleteAnswer, getAllDays, getDay, getInitialDate, saveDay } from "./db";
import { dateToString, stringToDate } from "./utils/dates";

const options = {};

const sampleDays: Day[] = [
  {
    date: "03/09/2025",
    questions: [
      { prompt: "What obstacles did you tackle today?", answers: ["Debugged a stubborn bug"] },
      { prompt: "What made you smile today?", answers: ["A funny meme in the team chat"] },
      { prompt: "What did you learn today?", answers: ["How to use JS optional chaining better"] },
      { prompt: "How did you help someone (or yourself) today?", answers: ["Helped a colleague with CSS layout"] },
      { prompt: "What's one thing you'd love to repeat tomorrow?", answers: ["Morning run"] },
    ]
  },
  {
    date: "07/09/2025",
    questions: [
      { prompt: "What obstacles did you tackle today?", answers: ["Fixed a deployment issue"] },
      { prompt: "What made you smile today?", answers: ["Coffee spill, then laughter with a friend"] },
      { prompt: "What did you learn today?", answers: ["Basics of React context API"] },
      { prompt: "How did you help someone (or yourself) today?", answers: ["Explained a tricky function to a teammate"] },
      { prompt: "What's one thing you'd love to repeat tomorrow?", answers: ["Cycling after work"] },
    ]
  },
  {
    date: "12/09/2025",
    questions: [
      { prompt: "What obstacles did you tackle today?", answers: ["Solved a tough algorithm problem"] },
      { prompt: "What made you smile today?", answers: ["Cute dog outside the office"] },
      { prompt: "What did you learn today?", answers: ["New VSCode shortcut"] },
      { prompt: "How did you help someone (or yourself) today?", answers: ["Reviewed a teammate’s PR"] },
      { prompt: "What's one thing you'd love to repeat tomorrow?", answers: ["Evening meditation"] },
    ]
  },
  {
    date: "18/09/2025",
    questions: [
      { prompt: "What obstacles did you tackle today?", answers: ["Refactored some messy code"] },
      { prompt: "What made you smile today?", answers: ["Random compliment from a coworker"] },
      { prompt: "What did you learn today?", answers: ["TypeScript types tricks"] },
      { prompt: "How did you help someone (or yourself) today?", answers: ["Helped a teammate understand closures"] },
      { prompt: "What's one thing you'd love to repeat tomorrow?", answers: ["Gym session"] },
    ]
  },
  {
    date: "25/09/2025",
    questions: [
      { prompt: "What obstacles did you tackle today?", answers: ["Fixed a failing test suite"] },
      { prompt: "What made you smile today?", answers: ["Watched a funny clip online"] },
      { prompt: "What did you learn today?", answers: ["Material UI theming"] },
      { prompt: "How did you help someone (or yourself) today?", answers: ["Explained JS promises to a friend"] },
      { prompt: "What's one thing you'd love to repeat tomorrow?", answers: ["Morning cycling routine"] },
    ]
  },
];


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
    const [isSnackOpen, setIsSnackOpen] = useState(false);

    useEffect(() => {
        async function initializeDay() {
            const day = await getInitialDate();
            const historyDays = await getAllDays();
            setDay(day);
            setHistoryDays(historyDays);
            setSelectedDay(stringToDate(day.date))
            sampleDays.forEach(async (sampleDay) => await saveDay(sampleDay))
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
                                    <TextField
                                        color="secondary"
                                        label="Type here..."
                                        value={answer}
                                        onChange={(e) => {
                                            setAnswer(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                setDay((day) => ({
                                                    ...day!,
                                                    questions:
                                                        day!.questions.map(
                                                            (q) =>
                                                                q.prompt ===
                                                                question
                                                                    ? {
                                                                          ...q,
                                                                          answers:
                                                                              [
                                                                                  ...q.answers,
                                                                                  answer,
                                                                              ],
                                                                      }
                                                                    : q
                                                        ),
                                                }));
                                            }
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
                        await saveDay(day);
                        setIsSnackOpen(true);
                    }}
                >
                    Save
                </Button>
                <div
                    style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <DatePicker
                        selected={selectedDay}
                        onChange={async (date) => {
                            if (!date) return;
                            const newDay = await getDay(dateToString(date));
                            if (newDay) setDay(newDay);
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
                    />
                </div>
            </div>
            <Snackbar
                open={isSnackOpen}
                autoHideDuration={3000}
                onClose={() => setIsSnackOpen(false)}
            >
                <Alert
                    severity="success"
                    sx={{ backgroundColor: "green" }}
                    variant="filled"
                    onClose={() => setIsSnackOpen(false)}
                >
                    Day successfully saved!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default App;
