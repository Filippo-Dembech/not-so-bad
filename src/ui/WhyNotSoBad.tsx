import { Box, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function WhyNotSoBad() {
    const { language } = useLanguage();
    return (
        <Box padding={3}>
            <Typography
                variant="h2"
                color="primary"
            >
                Not So Bad
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                {language!.description.map((paragraph) => (
                    <Typography variant="body1">{paragraph}</Typography>
                ))}
            </Box>
        </Box>
    );
}
