import { Box, Typography } from "@mui/material";
import { useQuestions } from "../context/QuestionsContext";
import { useLanguage } from "../context/LanguageContext";

export default function Questions() {
    const { questions } = useQuestions();
    const { language } = useLanguage()

    if (questions?.length === 0) return <p>Loading...</p>;

    return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                {language?.currentQuestions}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                marginTop="1rem"
                gap="1rem"
            >
                <Typography>{language?.currentQuestionsText}:</Typography>
                {questions?.reverse().map((question) => (
                    <Box
                        key={`${language!.questions[question.id - 1].prompt}-${question.id}`}
                        display="flex"
                        alignItems="center"
                        borderRadius="1rem"
                        gap="1rem"
                        padding="0.5rem 1rem 0.5rem"
                        sx={{
                            bgcolor: "secondary.light",
                        }}
                    >
                        <Typography>{language!.questions[question.id - 1].prompt}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
