import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { saveLanguage } from "../db";
import { english, french, german, italian, japanese, spanish } from "../languages";
import type { Language } from "../types";

export default function LanguagesSelect() {
    const {setLanguage} = useLanguage()
    
    async function updateLanguage(language: Language) {
        setLanguage(language);
        await saveLanguage(language);
    }

    return (
        <Select
            style={{
                justifyContent: "flex-start",
                position: "absolute",
                bottom: "1rem",
            }}
            defaultValue="english"
            onChange={async (e) => {
                console.log(e.target.value);
                if (e.target.value === "italian") updateLanguage(italian)
                if (e.target.value === "english") updateLanguage(english)
                if (e.target.value === "spanish") updateLanguage(spanish)
                if (e.target.value === "french") updateLanguage(french)
                if (e.target.value === "japanese") updateLanguage(japanese)
                if (e.target.value === "german") updateLanguage(german)
            }}
        >
            <MenuItem value="english">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/united-kingdom.png`}
                        style={{ width: "1rem" }}
                        alt="eng-icon"
                    />
                    <Typography>ENG</Typography>
                </Box>
            </MenuItem>
            <MenuItem value="italian">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/italian.png`}
                        style={{ width: "1rem" }}
                        alt="it-icon"
                    />
                    <Typography>IT</Typography>
                </Box>
            </MenuItem>
            <MenuItem value="french">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/french.png`}
                        style={{ width: "1rem" }}
                        alt="fr-icon"
                    />
                    <Typography>FR</Typography>
                </Box>
            </MenuItem>
            <MenuItem value="spanish">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/spanish.png`}
                        style={{ width: "1rem" }}
                        alt="es-icon"
                    />
                    <Typography>ES</Typography>
                </Box>
            </MenuItem>
            <MenuItem value="german">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/german.png`}
                        style={{ width: "1rem" }}
                        alt="de-icon"
                    />
                    <Typography>DE</Typography>
                </Box>
            </MenuItem>
            <MenuItem value="japanese">
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}/japanese.png`}
                        style={{ width: "1rem" }}
                        alt="jp-icon"
                    />
                    <Typography>JP</Typography>
                </Box>
            </MenuItem>
        </Select>
    );
}
