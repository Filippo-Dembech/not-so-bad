import { Box, Button, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { getAllDays } from "../db";

export default function Export() {
    const { language } = useLanguage();

    async function exportData() {
        const data = await getAllDays();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "not-so-bad-export.json";
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                {language!.exportTitle}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                <Typography>{language!.exportText}</Typography>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={exportData}
                    disableElevation
                >
                    {language!.exportButton}
                </Button>
                <Typography
                    fontSize="0.8rem"
                    color="orange"
                    fontWeight="bold"
                >
                    {language!.exportNote}
                </Typography>
            </Box>
        </Box>
    );
}
