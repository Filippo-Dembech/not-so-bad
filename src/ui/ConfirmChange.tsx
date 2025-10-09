import { Box, Button, Typography } from "@mui/material";
import { useQuestions } from "../context/QuestionsContext";

interface ConfirmChangeProps {
    closeDialog: () => void
}

export default function ConfirmChange({closeDialog}: ConfirmChangeProps) {
    const {deleteAllQuestions} = useQuestions();
   return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                Change Questions
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                <Typography>Are you sure you want to change questions?</Typography>
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
                        Yes
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={closeDialog}
                        disableElevation
                    >
                        No
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}