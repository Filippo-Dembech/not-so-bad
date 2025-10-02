import { Button } from "@mui/material";
import type { Day } from "../types";
import { saveDay } from "../db";
import { useLanguage } from "../context/LanguageContext";

interface SaveButtonProps {
    day: Day;
    showSuccess: () => void;
    showNoAnswer: () => void;
}

export default function SaveButton({
    day,
    showNoAnswer,
    showSuccess,
}: SaveButtonProps) {
    const {language} = useLanguage();
    return (
        <Button
            variant="contained"
            disabled={day.questions.every(question => question.answers.length === 0)}
            disableElevation
            fullWidth
            onClick={async () => {
                if (
                    day.questions.every(
                        (question) => question.answers.length === 0
                    )
                ) {
                    showNoAnswer();
                    return;
                }
                await saveDay(day);
                showSuccess();
            }}
        >
            {language.saveButton}
        </Button>
    );
}
