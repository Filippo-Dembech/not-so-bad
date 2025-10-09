import { Box, Button, Typography } from "@mui/material";
import { useQuestions } from "../context/QuestionsContext";
import { useLanguage } from "../context/LanguageContext";

interface ConfirmChangeProps {
    closeDialog: () => void
}

export default function ConfirmChange({closeDialog}: ConfirmChangeProps) {
    const { language } = useLanguage()
    const {deleteAllQuestions} = useQuestions();
   return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                {language?.changeQuestionsButton}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                <Typography>{language?.changeQuestionsText}</Typography>
                <Box
                    display="flex"
                    gap={1}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={deleteAllQuestions}
                        disableElevation
                    >
                        {language?.changeQuestionsYes}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={closeDialog}
                        disableElevation
                    >
                        {language?.changeQuestionsNo}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}