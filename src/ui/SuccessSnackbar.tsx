import { Alert, Snackbar } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

interface SuccessSnackbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessSnackbar({
    isOpen,
    onClose,
}: SuccessSnackbarProps) {
    const {language} = useLanguage()
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert
                severity="success"
                sx={{ backgroundColor: "#2A5C3D" }}
                variant="filled"
                onClose={onClose}
            >
                {language.success}
            </Alert>
        </Snackbar>
    );
}
