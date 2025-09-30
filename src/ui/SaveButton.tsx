import { Button } from "@mui/material";
import type { Day } from "../types";
import { saveDay } from "../db";

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
    return (
        <Button
            variant="contained"
            disableElevation
            fullWidth
            onClick={async () => {
                if (
                    day.questions.every(
                        (question) => question.answers.length === 0
                    )
                ) {
                    alert("no answer");
                    showNoAnswer();
                    return;
                }
                alert("success");
                await saveDay(day);
                showSuccess();
            }}
        >
            Save
        </Button>
    );
}
