import { Alert, Snackbar } from "@mui/material";

interface NoAnswerSnackbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NoAnswerSnackbar({
    isOpen,
    onClose,
}: NoAnswerSnackbarProps) {
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
                Please, answer to at least one question!
            </Alert>
        </Snackbar>
    );
}
