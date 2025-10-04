import { Box, Drawer, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdHistory } from "react-icons/md";
import DatePicker from "react-datepicker";
import type { Day } from "../types";
import { getDay } from "../db";
import { dateToString, stringToDate } from "../utils/dates";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";
import Logo from "./Logo";
import DrawerButton from "./DrawerButton";

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
                <Logo />
                <DrawerButton
                    icon={<MdHistory />}
                    dialogContent={(closeDialog) => (
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
                                closeDialog();
                                toggleFn();
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
                    )}
                >
                    {language!.history}
                </DrawerButton>
                <DrawerButton
                    icon={<GoQuestion />}
                    dialogContent={() => (
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
                    )}
                >
                    {language!.why}
                </DrawerButton>
                <DrawerButton
                    icon={<TiWarningOutline />}
                    dialogContent={() => (
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
                    )}
                >
                    {language!.warningButton}
                </DrawerButton>
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
