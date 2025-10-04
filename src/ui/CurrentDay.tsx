import { Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useDays } from "../context/DaysContext";

export default function CurrentDay() {
    const { language } = useLanguage();
    const {currentDay} = useDays();
    return (
        <Typography variant="subtitle1">
            {language!.titleDay} <strong>{currentDay!.date}</strong>
        </Typography>
    );
}
