import { Box, Drawer } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdBugReport, MdHistory } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";
import Logo from "./Logo";
import DrawerButton from "./DrawerButton";
import Calendar from "./Calendar";
import WhyNotSoBad from "./WhyNotSoBad";
import Warning from "./Warning";
import BugReport from "./BugReport";

interface SideDrawerProps {
    isOpen: boolean;
    toggleFn: () => void;
}

export default function SideDrawer({
    isOpen,
    toggleFn,
}: SideDrawerProps) {
    const { language } = useLanguage();
    return (
        <Drawer
            open={isOpen}
            onClose={toggleFn}
        >
            <Box
                padding="1rem"
                display="flex"
                flexDirection="column"
            >
                <Logo />
                <DrawerButton
                    icon={<MdHistory />}
                    text={language!.history}
                    dialogContent={(closeDialog) => (
                        <Calendar 
                            onSelect={() => {
                                closeDialog()
                                toggleFn()
                            }}
                        />
                    )}
                />
                <DrawerButton
                    icon={<GoQuestion />}
                    text={language!.why}
                    dialogContent={() => <WhyNotSoBad />}
                />
                <DrawerButton
                    icon={<TiWarningOutline />}
                    text={language!.warningButton}
                    dialogContent={() => <Warning />}
                />
                <DrawerButton
                    icon={<MdBugReport />}
                    text={language!.bugReportTitle}
                    dialogContent={() => <BugReport />}
                />
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
