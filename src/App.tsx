import {
    Box,
    Button,
    Dialog,
    Drawer,
    Typography,
} from "@mui/material";
import { TiWarningOutline } from 'react-icons/ti'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import useEmblaCarousel from "embla-carousel-react";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import AutoHeight from "embla-carousel-auto-height";
import { getAllDays, getDay } from "./db";
import { dateToString, stringToDate } from "./utils/dates";
import { useSnackbar } from "./hooks/useSnackbar";
import LoadingWheel from "./ui/LoadingWheel";
import QuestionsForm from "./ui/QuestionsForm";
import SaveButton from "./ui/SaveButton";
import SuccessSnackbar from "./ui/SuccessSnackbar";
import NoAnswerSnackbar from "./ui/NoAnswerSnackbar";
import { useLanguage } from "./context/LanguageContext";
import { MdHistory } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import LanguagesSelect from "./ui/LanguagesSelect";
import Footer from "./ui/Footer";
import SavePDFButton from "./ui/SavePDFButton";

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

    const { language } = useLanguage();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isWhyOpen, setIsWhyOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB return
        async function getInitialDay() {
            const days = await getAllDays();
            const today = dateToString(new Date());
            const result = days.find((day) => today == day.date);
            if (result) return result;
            return {
                date: today,
                questions: language!.questions,
            };
        }
        async function initializeDay() {
            const day = await getInitialDay();
            const historyDays = await getAllDays();
            setDay(day);
            setHistoryDays(historyDays);
            setSelectedDay(stringToDate(day.date));
        }
        initializeDay();
    }, [language]);

    useEffect(() => {
        emblaApi?.reInit();
    }, [day, emblaApi]);

    if (!day || !language) return <LoadingWheel />;

    return (
        <div style={{ padding: "1.5rem" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <SavePDFButton />
                <Header />
                <RxHamburgerMenu
                    style={{ cursor: "pointer", scale: 2 }}
                    onClick={() => setIsDrawerOpen(true)}
                />
            </Box>
            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box
                    padding="1rem"
                    display="flex"
                    flexDirection="column"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/not-so-bad-icon.svg`}
                        alt="icon"
                        width={100}
                        style={{ display: "block", margin: "0 auto" }}
                    />
                    <Button
                        startIcon={<MdHistory />}
                        style={{ justifyContent: "flex-start" }}
                        onClick={() => setIsHistoryOpen(true)}
                    >
                        {language.history}
                    </Button>
                    <Dialog
                        open={isHistoryOpen}
                        onClose={() => setIsHistoryOpen(false)}
                        sx={{
                            "& .MuiPaper-root": {
                                borderRadius: "20px",
                            },
                        }}
                    >
                        <DatePicker
                            selected={selectedDay}
                            calendarClassName="theme-light"
                            onChange={async (date) => {
                                if (!date) return;
                                const newDay = await getDay(dateToString(date));
                                if (newDay) {
                                    setDay(newDay);
                                } else {
                                    setDay({
                                        date: dateToString(date),
                                        questions: language!.questions,
                                    });
                                }
                                setSelectedDay(date);
                                setIsHistoryOpen(false);
                                setIsDrawerOpen(false);
                            }}
                            dayClassName={(date) =>
                                historyDays?.some(
                                    (day) =>
                                        stringToDate(
                                            day.date
                                        ).toDateString() === date.toDateString()
                                )
                                    ? "highlight"
                                    : ""
                            }
                            inline
                            portalId="root-portal" // this ensures that the calendar stays on top of other elements
                        />
                    </Dialog>
                    <Button
                        startIcon={<GoQuestion />}
                        style={{ justifyContent: "flex-start" }}
                        onClick={() => setIsWhyOpen(true)}
                    >
                        {language.why}
                    </Button>
                    <Dialog
                        open={isWhyOpen}
                        onClose={() => setIsWhyOpen(false)}
                    >
                        <Box padding={3}>
                            <Typography
                                variant="h2"
                                color="primary"
                            >
                                Not So Bad
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                marginTop={2}
                            >
                                {language.description.map((paragraph) => (
                                    <Typography variant="body1">
                                        {paragraph}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Dialog>
                    <Button
                        startIcon={<TiWarningOutline/>}
                        style={{ justifyContent: "flex-start" }}
                        onClick={() => setIsWarningOpen(true)}
                    >
                        {language.warningButton}
                    </Button>
                    <Dialog
                        open={isWarningOpen}
                        onClose={() => setIsWarningOpen(false)}
                    >
                        <Box padding={3}>
                            <Typography
                                variant="h2"
                                color="primary"
                            >
                                {language.warningTitle}
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                marginTop={2}
                            >
                                {language.warningText}
                            </Box>
                        </Box>
                    </Dialog>
                    <LanguagesSelect />
                </Box>
            </Drawer>
            <Typography variant="subtitle1">
                {language.titleDay} <strong>{day.date}</strong>
            </Typography>
            <QuestionsForm
                setHistoryDays={setHistoryDays}
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
                    setHistoryDays={setHistoryDays}
                    showSuccess={showSuccessSnackbar}
                    showNoAnswer={showNoAnswerSnackbar}
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
            <Footer />
        </div>
    );
}

export default App;
