import { Box, Divider, Drawer } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdBugReport, MdFileDownload, MdHistory } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileImport } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";
import Logo from "./Logo";
import DrawerButton from "./DrawerButton";
import Calendar from "./Calendar";
import WhyNotSoBad from "./WhyNotSoBad";
import Warning from "./Warning";
import BugReport from "./BugReport";
import Export from "./Export";
import Import from "./Import";
import PDFDialog from "./PDFDialog";

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
                gap="0.5rem"
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
                <Divider />
                <Box display="flex" flexDirection="column" >
                <DrawerButton
                    icon={<MdFileDownload />}
                    text={language!.exportTitle}
                    dialogContent={() => <Export />}
                />
                <DrawerButton
                    icon={<FaFileImport />}
                    text={language!.importTitle}
                    dialogContent={() => <Import />}
                />
                <DrawerButton
                    icon={<FaFilePdf />}
                    text={language!.savePdf}
                    dialogContent={() => <PDFDialog />}
                /></Box>
                <Divider />
                <Box display="flex" flexDirection="column" >
                <DrawerButton
                    icon={<GoQuestion />}
                    text={language!.why}
                    dialogContent={() => <WhyNotSoBad />}
                />
                <DrawerButton
                    icon={<MdBugReport />}
                    text={language!.bugReportTitle}
                    dialogContent={() => <BugReport />}
                />
                <DrawerButton
                    icon={<TiWarningOutline />}
                    text={language!.warningButton}
                    dialogContent={() => <Warning />}
                /></Box>
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
