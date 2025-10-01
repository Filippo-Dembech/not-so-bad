import { Alert, Snackbar } from "@mui/material";

interface SuccessSnackbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessSnackbar({
    isOpen,
    onClose,
}: SuccessSnackbarProps) {
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
                Day successfully saved!
            </Alert>
        </Snackbar>
    );
}
