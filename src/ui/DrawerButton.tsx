import { Box, Button, Dialog, type SxProps, type Theme } from "@mui/material";
import { useState, type CSSProperties } from "react";
import { MdClose } from "react-icons/md";

interface DrawerButtonProps {
    icon: React.ReactNode;
    text: string;
    dialogContent: (close: () => void) => React.ReactNode;
}

export default function DrawerButton({
    icon,
    text,
    dialogContent,
}: DrawerButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const dialogStyle: SxProps<Theme> = {
        "& .MuiPaper-root": {
            borderRadius: "20px",
            overflow: "visible", // to show the close button
        },
    };

    const closeButtonStyle: CSSProperties = {
        position: "absolute",
        cursor: "pointer",
        backgroundColor: "gray",
        opacity: 0.5,
        borderRadius: "50%",
        width: "2rem",
        height: "2rem",
        top: "-2.5rem",
        right: 0,
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <>
            <Button
                startIcon={icon}
                style={{ justifyContent: "flex-start" }}
                onClick={openDialog}
            >
                {text}
            </Button>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
                sx={dialogStyle}
            >
                <button
                    style={closeButtonStyle}
                    onClick={closeDialog}
                >
                    <MdClose
                        fontSize="1.5rem"
                        color="#fff"
                    />
                </button>
                <Box padding={3}>{dialogContent(closeDialog)}</Box>
            </Dialog>
        </>
    );
}
