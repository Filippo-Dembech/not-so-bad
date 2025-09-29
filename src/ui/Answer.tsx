import { Box, Button, Typography } from "@mui/material"
import type { CSSProperties } from "react"
import { MdDelete } from "react-icons/md"

interface AnswerProps {
    text: string,
    onDelete: () => void,
}

export default function Answer({text, onDelete}: AnswerProps) {
    const style: CSSProperties = {
        background: "var(--answer-background)",
        padding: "1rem",
        borderRadius: "10px",
        color: "green",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
    
    const buttonStyle: CSSProperties = {
        alignSelf: "center",
        fontSize: "1.2rem",
        padding: "0",
    }

    return (
        <Box sx={style}>
            <Typography textAlign="left">{text}</Typography>
            <Button sx={buttonStyle} onClick={onDelete}><MdDelete /></Button>
        </Box>
    )
}