import { Typography } from "@mui/material";
import type { Question } from "../types";

interface QuestionProps {
    question: Question;
}

export default function Question({ question }: QuestionProps) {
    return (
        <Typography
            variant="body1"
            fontWeight="bold"
            margin={3}
        >
            {question.prompt}
        </Typography>
    );
}
