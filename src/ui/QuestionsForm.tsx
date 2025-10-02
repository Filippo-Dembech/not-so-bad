import type { EmblaViewportRefType } from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { Box, TextField, Typography } from "@mui/material";
import type { Day } from "../types";
import { useState, type CSSProperties } from "react";
import { usePrevNextButtons } from "../hooks/usePrevNextButtons";
import { NextButton, PrevButton } from "./CarouselButtons";
import { DotButton } from "./DotButton";
import { useDotButton } from "../hooks/useDotButton";
import Answer from "./Answer";
import { deleteAnswer } from "../db";
import { useLanguage } from "../context/LanguageContext";

interface QuestionsFormProps {
    emblaRef: EmblaViewportRefType;
    emblaApi: EmblaCarouselType | undefined;
    setDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    day: Day;
}

export default function QuestionsForm({
    emblaRef,
    emblaApi,
    setDay,
    day,
}: QuestionsFormProps) {
    const [answer, setAnswer] = useState("");
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);
    
    const {language} = useLanguage()
    
    const sectionStyle: CSSProperties = {
        border: "2px solid #7FB993",
        borderRadius: 20,
        paddingBottom: "2rem",
        margin: "2rem auto"
    }

    return (
        <section className="embla theme-light" style={sectionStyle}>
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
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setDay((day) => ({
                                            ...day!,
                                            questions: day!.questions.map((q) =>
                                                q.id === question.id
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
                                    .find((q) => q.id === question.id)
                                    ?.answers.map((answer, i) => (
                                        <Answer
                                            key={`${answer}-${i}`}
                                            text={answer}
                                            onDelete={async () => {
                                                const newDay =
                                                    await deleteAnswer(
                                                        day,
                                                        question.id,
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
    );
}
