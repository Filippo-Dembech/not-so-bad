import { Alert, Snackbar } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

interface NoAnswerSnackbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NoAnswerSnackbar({
    isOpen,
    onClose,
}: NoAnswerSnackbarProps) {
    const {language} = useLanguage()
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert
                severity="warning"
                variant="filled"
                onClose={onClose}
            >
                {language.noAnswer}
            </Alert>
        </Snackbar>
    );
}
