import { Box, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Warning() {
        
    const { language } = useLanguage();
    return (
        <Box padding={3}>
            <Typography
                variant="h2"
                color="primary"
            >
                {language!.warningTitle}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                {language!.warningText}
            </Box>
        </Box>
    );
}