import { Button, Dialog, type SxProps, type Theme } from "@mui/material";
import { useState } from "react";

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
        },
    }

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
                {dialogContent(closeDialog)}
            </Dialog>
        </>
    );
}
