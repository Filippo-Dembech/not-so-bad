import { Box, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function BugReport() {
        
    const { language } = useLanguage();
    return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                {language!.bugReportTitle}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                {language!.bugReportText}
            </Box>
        </Box>
    );
}