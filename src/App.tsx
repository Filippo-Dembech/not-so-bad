import { Box, Button, TextField, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons, PrevButton, NextButton } from "./CarouselButtons";
import { useDotButton } from "./useDotButton";
import { DotButton } from "./useDotButton";
import { questions } from "./questions";
import { getCurrentDay } from "./utils/getCurrentDay";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import { dateToString } from "./utils/dates";
import Answer from "./ui/Answer";
import AutoHeight from "embla-carousel-auto-height";

const options = {}

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

    const [day, setDay] = useState<Day>(() => ({
        date: dateToString(new Date()),
        questions: questions.map((question) => ({
            prompt: question,
            answers: [],
        })),
    }));

    const [answer, setAnswer] = useState("");

    useEffect(() => {
        emblaApi?.reInit();
    }, [day, emblaApi])

    useEffect(() => {
        console.log(day);
    });
    

    return (
        <div style={{ padding: 20 }}>
            <Header />
            <Typography variant="subtitle1">
                This <strong>{getCurrentDay()}</strong>
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
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                            if (e.key === "Enter") {
                                                setDay((day) => ({
                                                    ...day,
                                                    questions:
                                                        day.questions.map((q) =>
                                                            q.prompt ===
                                                            question
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
                                            }
                                            if (e.code === "Tab") {
                                                onNextButtonClick();
                                            }
                                            if (e.code === "Tab" && e.shiftKey) {
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
            <div style={{ width: "80%", maxWidth: "400px", margin: "2rem auto"}}>
                <Button
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {

                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default App;
