import type { CSSProperties } from "@mui/material"

export default function Footer() {
    const style: CSSProperties = {
        backgroundColor: "#3B7A57",
        color: "#CFF0DD",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 998,
        fontSize: "0.8rem",
        padding: "0.8rem"
    }

    return (
        <footer style={style}>
            <p style={{margin: 0}}>© 2025 Filippo Dembech</p>
            <p style={{margin: 0}}>E-mail: filippo.dembech@gmail.com</p>
        </footer>
    )
}