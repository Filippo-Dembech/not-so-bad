import { Typography } from "@mui/material";
import type { Day } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface CurrentDayProps {
    day: Day;
}

export default function CurrentDay({ day }: CurrentDayProps) {
    const { language } = useLanguage();
    return (
        <Typography variant="subtitle1">
            {language!.titleDay} <strong>{day.date}</strong>
        </Typography>
    );
}
