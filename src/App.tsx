import { Box } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import Header from "./ui/Header";
import LoadingWheel from "./ui/LoadingWheel";
import QuestionsForm from "./ui/QuestionsForm";
import SaveButton from "./ui/SaveButton";
import SuccessSnackbar from "./ui/SuccessSnackbar";
import { useLanguage } from "./context/LanguageContext";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Footer from "./ui/Footer";
import SavePDFButton from "./ui/SavePDFButton";
import SideDrawer from "./ui/SideDrawer";
import { useToggler } from "./hooks/useToggler";
import CurrentDay from "./ui/CurrentDay";
import { useDays } from "./context/DaysContext";
import { type CSSProperties } from "react";
import SelectQuestions from "./ui/SelectQuestions";
import { useQuestions } from "./context/QuestionsContext";

function App() {
    const { isToggled, open, close, toggle } = useToggler([
        { label: "drawer", isToggled: false },
        { label: "successSnackbar", isToggled: false },
    ]);

    const { language } = useLanguage();
    const { currentDay } = useDays();
    const { questions } = useQuestions();

    const hamburgerButtonStyle: CSSProperties = {
        cursor: "pointer",
        border: "none",
        background: "none",
    };
    
    if (!currentDay || !language || !questions) return <LoadingWheel />;

    if (questions.length === 0) return <SelectQuestions />

    return (
        <Box padding="1.5rem">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header />
                <button
                    style={hamburgerButtonStyle}
                    onClick={() => open("drawer")}
                >
                    <RxHamburgerMenu style={{ scale: 2 }} />
                </button>
            </Box>
            <SideDrawer
                isOpen={isToggled("drawer")}
                toggleFn={() => toggle("drawer")}
            />
            <CurrentDay />
            <QuestionsForm />
            <SaveButton showSuccess={() => open("successSnackbar")} />
            <SuccessSnackbar
                isOpen={isToggled("successSnackbar")}
                onClose={() => close("successSnackbar")}
            />
            <Footer />
            <SavePDFButton
                style={{
                    position: "fixed",
                    bottom: "1rem",
                    right: "1rem",
                    background: "white",
                    zIndex: 999,
                }}
            />
        </Box>
    );
}

export default App;
