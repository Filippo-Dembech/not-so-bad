import { Box, Button, TextField, Typography } from "@mui/material";
import type { Question } from "../types";
import { useEffect, useState, type CSSProperties } from "react";
import { usePrevNextButtons } from "../hooks/usePrevNextButtons";
import { NextButton, PrevButton } from "./CarouselButtons";
import { DotButton } from "./DotButton";
import { useDotButton } from "../hooks/useDotButton";
import Answer from "./Answer";
import { deleteAnswer } from "../db";
import { useLanguage } from "../context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import AutoHeight from "embla-carousel-auto-height";
import { useDays } from "../context/DaysContext";

const options = {};

export default function QuestionsForm() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()]);
    const [answer, setAnswer] = useState("");
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const { language } = useLanguage();
    const { currentDay, setDay, setHistoryDays } = useDays()

    useEffect(() => {
        emblaApi?.reInit();
    }, [currentDay, emblaApi]);

    const sectionStyle: CSSProperties = {
        border: "2px solid #7FB993",
        borderRadius: 20,
        paddingBottom: "2rem",
        margin: "2rem auto",
    };

    function addAnswerTo(question: Question) {
        if (!answer) return;
        setDay((day) => ({
            ...day!,
            questions: day!.questions.map((q) =>
                q.id === question.id
                    ? {
                          ...q,
                          answers: [...q.answers, answer],
                      }
                    : q
            ),
        }));
        setAnswer("")
    }

    return (
        <section
            className="embla theme-light"
            style={sectionStyle}
        >
            <div
                className="embla__viewport"
                ref={emblaRef}
            >
                <div className="embla__container">
                    {language!.questions.map((question) => (
                        <div
                            className="embla__slide"
                            key={question.id}
                            style={{ textAlign: "center" }}
                        >
                            <div style={{ width: "80%", margin: "auto" }}>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    margin={3}
                                >
                                    {question.prompt}
                                </Typography>
                                <form
                                    style={{
                                        display: "flex",
                                    }}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        addAnswerTo(question);
                                    }}
                                >
                                    <TextField
                                        color="secondary"
                                        label={language!.textFieldPlaceholder}
                                        autoComplete="off"
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
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        color="primary"
                                        sx={{ fontSize: "0.6rem", color: "white", fontWeight: "bold", backgroundColor: "#48976c"}}
                                        onClick={() => addAnswerTo(question)}
                                    >
                                        {language?.addButton}
                                    </Button>
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
                                {currentDay!.questions
                                    .find((q) => q.id === question.id)
                                    ?.answers.slice().reverse().map((answer, i) => (
                                        <Answer
                                            key={`${answer}-${i}`}
                                            text={answer}
                                            onDelete={async () => {
                                                const newDay =
                                                    await deleteAnswer(
                                                        currentDay!,
                                                        question.id,
                                                        answer
                                                    );
                                                if (newDay.questions.every(question => question.answers.length === 0)) {
                                                    setHistoryDays(historyDays => historyDays?.filter(historyDay => historyDay.date !== newDay.date))
                                                }
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
    );
}
