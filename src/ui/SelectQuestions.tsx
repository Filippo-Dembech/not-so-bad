import { Box, Button, Checkbox, Typography } from "@mui/material";
import Header from "./Header";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import { useQuestions } from "../context/QuestionsContext";

export default function SelectQuestions() {
    const { language } = useLanguage();
    const { updateQuestions } = useQuestions()
    const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>(
        []
    );

    function toggleQuestionId(id: number) {
        if (selectedQuestionIds.includes(id)) {
            setSelectedQuestionIds((selectedQuestionIds) =>
                selectedQuestionIds.filter((questionId) => questionId !== id)
            );
        } else {
            setSelectedQuestionIds((selectedQuestionIds) => [
                ...selectedQuestionIds,
                id,
            ]);
        }
    }

    return (
        <Box
            padding="1.5rem"
            maxWidth="40rem"
            margin="0 auto"
        >
            <Header />
            <p>{language?.selectQuestionsText}</p>
            <Box
                display="flex"
                flexDirection="column"
                marginBottom="2rem"
                gap="1rem"
            >
                {language?.questions.map((question) => (
                    <Box
                        key={`${question.prompt}-${question.id}`}
                        display="flex"
                        alignItems="center"
                        borderRadius="1rem"
                        gap="1rem"
                        padding="0.5rem 1rem 0.5rem 0"
                        sx={{
                            cursor: "pointer",
                            bgcolor: selectedQuestionIds.includes(question.id)
                                ? "secondary.main"
                                : "secondary.light",
                        }}
                        onClick={() => toggleQuestionId(question.id)}
                    >
                        <Checkbox
                            checked={selectedQuestionIds.includes(question.id)}
                        />
                        <Typography
                            fontWeight={
                                selectedQuestionIds.includes(question.id)
                                    ? "bold"
                                    : "normal"
                            }
                        >
                            {question.prompt}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={async () => {
                    await updateQuestions(selectedQuestionIds)
                }}
            >
                Save Questions
            </Button>
        </Box>
    );
}
