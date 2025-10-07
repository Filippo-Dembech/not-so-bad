import { Button, TextField, type SxProps } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useState, type CSSProperties } from "react";
import type { Question } from "../types";
import { useDays } from "../context/DaysContext";
import type { Theme } from "@emotion/react";

interface QuestionInputProps {
    question: Question;
    setAnswerFieldFocused: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QuestionInput({ question, setAnswerFieldFocused }: QuestionInputProps) {
    const { language } = useLanguage();
    const { addAnswerTo } = useDays();
    const [answer, setAnswer] = useState("");

    function saveAnswerTo(question: Question) {
        addAnswerTo(question, answer);
        setAnswer("");
    }

    const formStyle: CSSProperties = {
        display: "flex",
    };

    const buttonStyle: SxProps<Theme> = {
        fontSize: "0.6rem",
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#48976c",
    };

    return (
        <form
            style={formStyle}
            onSubmit={(e) => {
                e.preventDefault();
                saveAnswerTo(question);
            }}
        >
            <TextField
                onFocus={() => setAnswerFieldFocused(true)}
                onBlur={() => setAnswerFieldFocused(false)}
                color="secondary"
                label={language!.textFieldPlaceholder}
                autoComplete="off"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                disableElevation
                color="primary"
                sx={buttonStyle}
                onClick={() => saveAnswerTo(question)}
            >
                {language?.addButton}
            </Button>
        </form>
    );
}
