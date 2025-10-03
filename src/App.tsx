import {
    Box,
    Button,
    Dialog,
    Drawer,
    Typography,
} from "@mui/material";
import html2pdf from "html2pdf.js";
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
                <Button
                    style={{
                        position: "fixed",
                        bottom: "1rem",
                        right: "1rem",
                        background: "white",
                        zIndex: 999,
                    }}
                    variant="outlined"
                    onClick={async () => {
                        const days = await getAllDays();
                        const sortedDays = days.sort((a, b) => stringToDate(a.date).getTime() - stringToDate(b.date).getTime())
                        const options = {
                            margin: 0.5,
                            filename: "not-so-bad.pdf",
                            html2canvas: { scale: 2 },
                            jsPDF: {
                                unit: "in",
                                format: "letter",
                                oriantation: "portrait",
                            },
                        };

                        let html;

                        if (sortedDays.length === 0) {
                            html = `
                                <h1 style="color: #2A5C3D">Not So Bad</h1>
                                <p style="color: gray; font-style: italic">${language.noDay}</p>
                            `;
                        } else {
                            html = `
                            <h1 style="color: #2A5C3D">Not So Bad</h1>
                            ${sortedDays.map(
                                    (day) =>
                                        `
                                    <div style="position:relative">
                                        <img style="position: absolute; top: 0; right: 0" src="data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPy0tPgo8c3ZnIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGl0bGUiPgogIDx0aXRsZSBpZD0idGl0bGUiPlNlbGYtaW1wcm92ZSBpY29uOiBoZWFydC1wbGFudCB3aXRoIHVwd2FyZCBhcnJvdyBhbmQgc3BhcmtsZXM8L3RpdGxlPgoKICA8IS0tIFNpbmdsZSBncmVlbiBjb2xvciAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmcgeyBmaWxsOiAjMmVjYzcxOyBzdHJva2U6ICMyZWNjNzE7IHN0cm9rZS13aWR0aDogMzsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyB9CiAgICAgIC5nLWZpbGwgeyBmaWxsOiAjMmVjYzcxOyBzdHJva2U6IG5vbmU7IH0KICAgICAgLmctc3Ryb2tlIHsgZmlsbDogbm9uZTsgc3Ryb2tlOiAjMmVjYzcxOyBzdHJva2Utd2lkdGg6IDQ7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CgogIDwhLS0gSGVhcnQgYmFzZSAoYWN0cyBsaWtlICJ0aGUgZ29vZCBpbiB5b3VyIGxpZmUiKSAtLT4KICA8cGF0aCBjbGFzcz0iZy1maWxsIiBkPSIKICAgIE02NCA4NgogICAgQzY0IDg2IDM2IDYyIDM2IDQ0CiAgICBDMzYgMzIgNDYgMjQgNjAgMjgKICAgIEM2NCAzMCA2OCAzMCA3MiAyOAogICAgQzg2IDI0IDk2IDMyIDk2IDQ0CiAgICBDOTYgNjIgNjggODYgNjggODYKICAgIFoiPjwvcGF0aD4KCiAgPCEtLSBTdGVtIC8gYXJyb3cgYm9keSByaXNpbmcgZnJvbSBoZWFydCAtLT4KICA8cGF0aCBjbGFzcz0iZy1zdHJva2UiIGQ9Ik02NCA2NCBMNjQgMjgiPjwvcGF0aD4KCiAgPCEtLSBBcnJvdyBoZWFkIC0tPgogIDxwYXRoIGNsYXNzPSJnIiBkPSJNNTYgMzYgTDY0IDI0IEw3MiAzNiBMNjQgMzIgWiI+PC9wYXRoPgoKICA8IS0tIExlZnQgbGVhZiAtLT4KICA8cGF0aCBjbGFzcz0iZy1maWxsIiBkPSJNNTAgNTAKICAgIEM0NCA0NCAzNiA0MCAzNCA0OAogICAgQzM0IDQ4IDQwIDU0IDQ4IDU0CiAgICBDNTAgNTQgNTIgNTIgNTAgNTAKICAgIFoiPjwvcGF0aD4KCiAgPCEtLSBSaWdodCBsZWFmIC0tPgogIDxwYXRoIGNsYXNzPSJnLWZpbGwiIGQ9Ik03OCA1MAogICAgQzg0IDQ0IDkyIDQwIDk0IDQ4CiAgICBDOTQgNDggODggNTQgODAgNTQKICAgIEM3OCA1NCA3NiA1MiA3OCA1MAogICAgWiI+PC9wYXRoPgoKICA8IS0tIFNwYXJrbGVzICh0aHJlZSBzbWFsbCBzaGFwZXMgdG8gc3VnZ2VzdCAiZ29vZCB0aGluZ3MiKSAtLT4KICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOCwxOCkgc2NhbGUoMC45KSI+CiAgICA8cGF0aCBkPSJNNiAwIEw4IDQgTDEyIDYgTDggOCBMNiAxMiBMNCA4IEwwIDYgTDQgNCBaIj48L3BhdGg+CiAgPC9nPgoKICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NiwyMCkgc2NhbGUoMC43KSI+CiAgICA8cGF0aCBkPSJNNiAwIEw4IDQgTDEyIDYgTDggOCBMNiAxMiBMNCA4IEwwIDYgTDQgNCBaIj48L3BhdGg+CiAgPC9nPgoKICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAsODQpIHNjYWxlKDAuOCkiPgogICAgPHBhdGggZD0iTTYgMCBMOCA0IEwxMiA2IEw4IDggTDYgMTIgTDQgOCBMMCA2IEw0IDQgWiI+PC9wYXRoPgogIDwvZz4KPC9zdmc+Cg==" />
                                        <h2 style="color: #3B7A57; border-radius: 0 20px 20px 0; background-color: #CFF0DD; padding: 0.5rem 2rem">${
                                            day.date
                                        }</h2>
                                        <div style="padding: 0 2rem">
                                        ${day.questions
                                            .map(
                                                (question) =>
                                                    `
                                                <div>
                                                    <p style="font-weight: bold">${
                                                        question.prompt
                                                    }</p>
                                                    <ul style="list-style: none">
                                                        ${question.answers
                                                            .map(
                                                                (answer) =>
                                                                    `
                                                                <li style="display: flex; align-items: center; font-style: italic">
                                                                    <span style="color: gray; padding-right: 1rem">-</span>
                                                                    ${answer}
                                                                </li>
                                                            `
                                                            )
                                                            .join(" ")}
                                                    </ul>
                                                </div>
                                            `
                                            )
                                            .join(" ")}
                                        </div>
                                    <div>
                                    <div class="page-break"></div>
                                `
                                )
                                .join(" ")}
                        `;
                        }
                        html2pdf().set(options).from(html).save();
                    }}
                >
                    {language.savePdf}
                </Button>
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
