import { Box, TextField, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons, PrevButton, NextButton } from "./CarouselButtons";
import { useDotButton } from "./useDotButton";
import { DotButton } from "./useDotButton";

function getCurrentDay() {
    const date = new Date();
    const day = date.getDay().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}

const questions = [
    "What obstacles did you tackle today?",
    "What made you smile today?",
    "What did you learn today?",
    "How did you help someone (or yourself) today?",
    "What's one thing you'd love to repeat tomorrow?",
];

function App() {
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <div style={{ padding: 20 }}>
            <Typography
                color="primary"
                variant="h1"
            >
                Not So Bad
            </Typography>
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
                                        margin={3}
                                    >
                                        {question}
                                    </Typography>
                                    <TextField
                                        color="secondary"
                                        label="Type here..."
                                        fullWidth
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Box
                        width="80%"
                        margin="auto"
                        gap={1}
                        display="flex"
                        flexDirection="column"
                        marginTop={4}
                    >
                        
                    </Box>
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
                                onClick={() => onDotButtonClick(index)}
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
        </div>
    );
}

export default App;
