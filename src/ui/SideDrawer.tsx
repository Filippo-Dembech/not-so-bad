import { Box, Button, Dialog, Drawer, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdHistory } from "react-icons/md";
import { useDrawer } from "../context/DrawerContext";
import DatePicker from "react-datepicker";
import type { Day } from "../types";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";

interface SideDrawerProps {
    isOpen: boolean;
    toggleFn: () => void;
    selectedDay: Date | undefined;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    historyDays: Day[] | undefined;
}

export default function SideDrawer({
    isOpen,
    toggleFn,
    selectedDay,
    setDay,
    setSelectedDay,
    historyDays,
}: SideDrawerProps) {
    const { language } = useLanguage();
    const {
        isHistoryOpen,
        isWhyOpen,
        isWarningOpen,
        open,
        close
    } = useDrawer();
    return (
        <Drawer
            open={isOpen}
            onClose={toggleFn}
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
                    onClick={() => open("history")}
                >
                    {language!.history}
                </Button>
                <Dialog
                    open={isHistoryOpen}
                    onClose={() => close("history")}
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
                            close("history")
                            toggleFn();
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
                        inline
                        portalId="root-portal" // this ensures that the calendar stays on top of other elements
                    />
                </Dialog>
                <Button
                    startIcon={<GoQuestion />}
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => open("why")}
                >
                    {language!.why}
                </Button>
                <Dialog
                    open={isWhyOpen}
                    onClose={() => close("why")}
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
                            {language!.description.map((paragraph) => (
                                <Typography variant="body1">
                                    {paragraph}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Dialog>
                <Button
                    startIcon={<TiWarningOutline />}
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => open("warning")}
                >
                    {language!.warningButton}
                </Button>
                <Dialog
                    open={isWarningOpen}
                    onClose={() => close("warning")}
                >
                    <Box padding={3}>
                        <Typography
                            variant="h2"
                            color="primary"
                        >
                            {language!.warningTitle}
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            marginTop={2}
                        >
                            {language!.warningText}
                        </Box>
                    </Box>
                </Dialog>
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
