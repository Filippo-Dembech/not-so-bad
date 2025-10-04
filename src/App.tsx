import { Box, Typography } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import useEmblaCarousel from "embla-carousel-react";
import Header from "./ui/Header";
import { useEffect, useState } from "react";
import { type Day } from "./types";
import AutoHeight from "embla-carousel-auto-height";
import { getAllDays } from "./db";
import { dateToString, stringToDate } from "./utils/dates";
import { useSnackbar } from "./hooks/useSnackbar";
import LoadingWheel from "./ui/LoadingWheel";
import QuestionsForm from "./ui/QuestionsForm";
import SaveButton from "./ui/SaveButton";
import SuccessSnackbar from "./ui/SuccessSnackbar";
import { useLanguage } from "./context/LanguageContext";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Footer from "./ui/Footer";
import SavePDFButton from "./ui/SavePDFButton";
import SideDrawer from "./ui/SideDrawer";
import { DrawerProvider } from "./context/DrawerContext";

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
        showSuccessSnackbar,
        hideSuccessSnackbar,
    } = useSnackbar();

    const { language } = useLanguage();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB, return
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
                <Header />
                <RxHamburgerMenu
                    style={{ cursor: "pointer", scale: 2 }}
                    onClick={() => setIsDrawerOpen(true)}
                />
            </Box>
            <DrawerProvider>
                <SideDrawer
                    isOpen={isDrawerOpen}
                    toggleFn={setIsDrawerOpen}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    setDay={setDay}
                    historyDays={historyDays}
                />
            </DrawerProvider>
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
                />
            </div>
            <SuccessSnackbar
                isOpen={isSuccess}
                onClose={hideSuccessSnackbar}
            />
            <Footer />
            <SavePDFButton />
        </div>
    );
}

export default App;
