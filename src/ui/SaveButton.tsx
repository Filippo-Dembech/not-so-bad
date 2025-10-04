import { Button } from "@mui/material";
import type { Day } from "../types";
import { saveDay } from "../db";
import { useLanguage } from "../context/LanguageContext";
import type { CSSProperties } from "react";

interface SaveButtonProps {
    day: Day;
    showSuccess: () => void;
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>;
}

export default function SaveButton({
    day,
    showSuccess,
    setHistoryDays,
}: SaveButtonProps) {
    const { language } = useLanguage();
    const hasNoAnswer = day.questions.every(
        (question) => question.answers.length === 0
    );
    const buttonStyle: CSSProperties = {
        width: "80%",
        maxWidth: "400px",
        margin: "2rem auto 5rem",
        display: "block",
    };

    async function saveMemories() {
        await saveDay(day);
        setHistoryDays((historyDays) =>
            historyDays ? [...historyDays, day] : [day]
        );
        showSuccess();
    }
    return (
        <Button
            variant="contained"
            style={buttonStyle}
            disabled={hasNoAnswer}
            disableElevation
            fullWidth
            onClick={saveMemories}
        >
            {language!.saveButton}
        </Button>
    );
}
