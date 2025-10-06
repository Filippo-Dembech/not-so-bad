import { Box, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import SavePDFButton from "./SavePDFButton";

export default function PDFDialog() {
    const { language } = useLanguage()
    return (
        <Box>
            <Typography
                variant="h2"
                color="primary"
            >
                {language!.savePDFTitle}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginY={2}
            >
                {language!.savePDFText}
            </Box>
            <SavePDFButton isContained style={{ width: "100%"}}/>
        </Box>
    )
}