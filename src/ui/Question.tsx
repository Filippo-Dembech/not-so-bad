import { Typography } from "@mui/material";
import type { Question } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface QuestionProps {
    question: Question;
}

export default function Question({ question }: QuestionProps) {
    const { language } = useLanguage()
    return (
        <Typography
            variant="body1"
            fontWeight="bold"
            margin={3}
        >
            {language?.questions[question.id - 1].prompt}
        </Typography>
    );
}
