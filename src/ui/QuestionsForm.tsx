import { Box } from "@mui/material";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrevNextButtons } from "../hooks/usePrevNextButtons";
import { NextButton, PrevButton } from "./CarouselButtons";
import { DotButton } from "./DotButton";
import { useDotButton } from "../hooks/useDotButton";
import Answer from "./Answer";
import useEmblaCarousel from "embla-carousel-react";
import AutoHeight from "embla-carousel-auto-height";
import { useDays } from "../context/DaysContext";
import Question from "./Question";
import QuestionInput from "./QuestionInput";

const options = {};

export default function QuestionsForm() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()]);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const { currentDay, deleteAnswerFrom } = useDays();
    const currentDayRef = useRef(currentDay);
    const [isAnswerFieldFocused, setIsAnswerFieldFocused] = useState(false);

    useEffect(() => {
        function keydownCallback(e: globalThis.KeyboardEvent) {
            if (!isAnswerFieldFocused) {
                if (e.key === "ArrowRight") onNextButtonClick();
                if (e.key === "ArrowLeft") onPrevButtonClick();
            }
        }
        window.addEventListener("keydown", keydownCallback);
        return () => window.removeEventListener("keydown", keydownCallback);
    }, [onNextButtonClick, onPrevButtonClick, isAnswerFieldFocused]);

    useEffect(() => {
        emblaApi?.reInit();
        if (currentDay?.date !== currentDayRef.current?.date) {
            emblaApi?.scrollTo(0);
            currentDayRef.current = currentDay;
        }
    }, [currentDay, emblaApi]);

    const sectionStyle: CSSProperties = {
        border: "2px solid #7FB993",
        borderRadius: 20,
        paddingBottom: "2rem",
        margin: "2rem auto",
    };

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
                    {currentDay!.questions.map((question) => (
                        <div
                            className="embla__slide"
                            key={question.id}
                            style={{ textAlign: "center" }}
                        >
                            <Box
                                width="80%"
                                margin="auto"
                            >
                                <Question question={question} />
                                <QuestionInput
                                    setAnswerFieldFocused={
                                        setIsAnswerFieldFocused
                                    }
                                    question={question}
                                />
                            </Box>
                            <Box
                                width="80%"
                                margin="auto"
                                gap={2}
                                display="flex"
                                flexDirection="column"
                                marginTop={4}
                            >
                                {question.answers
                                    .slice()
                                    .reverse()
                                    .map((answer, i) => (
                                        <Answer
                                            key={`${answer}-${i}`}
                                            text={answer}
                                            onDelete={() =>
                                                deleteAnswerFrom(
                                                    question,
                                                    answer
                                                )
                                            }
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
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => {
                                onDotButtonClick(index);
                            }}
                            className={`embla__dot ${
                                (currentDay?.questions[index].answers || [])
                                    .length > 0
                                    ? "embla__dot--answered"
                                    : ""
                            }`.concat(
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
