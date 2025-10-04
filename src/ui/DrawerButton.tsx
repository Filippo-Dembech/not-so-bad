import { Button, Dialog, type SxProps, type Theme } from "@mui/material";
import { useState } from "react";

interface DrawerButtonProps {
    icon: React.ReactNode;
    dialogContent: (close: () => void) => React.ReactNode;
    children: React.ReactNode;
}

export default function DrawerButton({
    icon,
    dialogContent,
    children,
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
                {children}
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
