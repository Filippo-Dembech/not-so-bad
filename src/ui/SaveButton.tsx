import { Button } from "@mui/material";
import { saveDay } from "../db";
import { useLanguage } from "../context/LanguageContext";
import type { CSSProperties } from "react";
import { useDays } from "../context/DaysContext";

interface SaveButtonProps {
    showSuccess: () => void;
}

export default function SaveButton({ showSuccess }: SaveButtonProps) {
    const { language } = useLanguage();
    const { currentDay, setHistoryDays } = useDays();
    const hasNoAnswer = currentDay!.questions.every(
        (question) => question.answers.length === 0
    );
    const buttonStyle: CSSProperties = {
        width: "80%",
        maxWidth: "400px",
        margin: "2rem auto 5rem",
        display: "block",
    };

    async function saveMemories() {
        await saveDay(currentDay!);
        setHistoryDays((historyDays) =>
            historyDays ? [...historyDays, currentDay!] : [currentDay!]
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
