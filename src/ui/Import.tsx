import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Snackbar,
    styled,
    Typography,
} from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { FaFileImport } from "react-icons/fa6";
import { z } from "zod";
import { useState } from "react";
import { useDays } from "../context/DaysContext";

const QuestionSchema = z.object({
    id: z.number(),
    answers: z.array(z.string()),
});

const DayDataSchema = z.object({
    date: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            "Invalid date format (expected dd/mm/yyyy)"
        ),
    questions: z.array(QuestionSchema),
});

const FileSchema = z.array(DayDataSchema);

export type FileData= z.infer<typeof FileSchema>;

export default function Import() {
    const { language } = useLanguage();
    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const [error, setError] = useState<string | undefined>();
    const [overwrite, setOverwrite] = useState(false);
    const [overwriteSuccess, setOverwriteSuccess] = useState<string | undefined>();
    const { overwriteDays, addAnswers } = useDays()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".json")) {
            setError("Please select a .json file");
            return;
        }

        try {
            const text = await file.text();
            const json = JSON.parse(text);

            const parsed = FileSchema.safeParse(json);

            if (parsed.success) {
                const data: FileData = parsed.data;
                if (overwrite) {
                    console.log("overwriteDays()")
                    await overwriteDays(data)
                    setOverwriteSuccess("Memories have been successfully imported.")
                } else {
                    console.log("addAnswers()")
                    await addAnswers(data);
                    setOverwriteSuccess("Memories have been successfully imported.")
                }
            } else {
                setError(language!.importWrongFormatError);
            }
        } catch {
            setError(language!.importGeneralError);
        }
    };

    return (
        <Box padding={3}>
            <Typography
                variant="h2"
                color="primary"
            >
                {language!.importTitle}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                marginTop={2}
            >
                <Typography>{language!.importText}</Typography>
                <FormControlLabel
                    control={<Checkbox onChange={(e) => setOverwrite(e.target.checked)}/>}
                    label={language!.importOverwrite}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    disableElevation
                    tabIndex={-1}
                    startIcon={<FaFileImport />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                    />
                </Button>
                <Typography
                    fontSize="0.8rem"
                    color="orange"
                    fontWeight="bold"
                >
                    {language!.importOverwriteExplanation}
                </Typography>
                <Snackbar
                    open={error !== undefined}
                    autoHideDuration={3000}
                    onClose={() => setError(undefined)}
                >
                    <Alert
                        severity="error"
                        variant="filled"
                        onClose={() => setError(undefined)}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={overwriteSuccess !== undefined}
                    autoHideDuration={3000}
                    onClose={() => setOverwriteSuccess(undefined)}
                >
                    <Alert
                        severity="success"
                        sx={{ backgroundColor: "#2A5C3D" }}
                        variant="filled"
                        onClose={() => setOverwriteSuccess(undefined)}
                    >
                        {overwriteSuccess}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
