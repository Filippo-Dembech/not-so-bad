import { Button } from "@mui/material";
import type { Day } from "../types";
import { saveDay } from "../db";
import { useLanguage } from "../context/LanguageContext";

interface SaveButtonProps {
    day: Day;
    showSuccess: () => void;
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>
}

export default function SaveButton({
    day,
    showSuccess,
    setHistoryDays
}: SaveButtonProps) {
    const {language} = useLanguage();
    return (
        <Button
            variant="contained"
            disabled={day.questions.every(question => question.answers.length === 0)}
            disableElevation
            fullWidth
            onClick={async () => {
                await saveDay(day);
                setHistoryDays(historyDays => historyDays ? [ ...historyDays, day ] : [ day ])
                showSuccess();
            }}
        >
            {language!.saveButton}
        </Button>
    );
}
