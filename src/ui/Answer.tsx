import { Typography } from "@mui/material"
import type { CSSProperties } from "react"

interface AnswerProps {
    text: string
}

export default function Answer({text}: AnswerProps) {
    const style: CSSProperties = {
        background: "var(--answer-background)",
        padding: "10px 0",
        borderRadius: "10px",
        color: "green"
    }

    return (
        <Typography sx={style}>{text}</Typography>
    )
}