import { Box, Drawer } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdHistory } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";
import Logo from "./Logo";
import DrawerButton from "./DrawerButton";
import Calendar from "./Calendar";
import WhyNotSoBad from "./WhyNotSoBad";
import Warning from "./Warning";

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
                    dialogContent={(closeDialog) => (
                        <Calendar 
                            onSelect={() => {
                                closeDialog()
                                toggleFn()
                            }}
                        />
                    )}
                >
                    {language!.history}
                </DrawerButton>
                <DrawerButton
                    icon={<GoQuestion />}
                    dialogContent={() => <WhyNotSoBad />}
                >
                    {language!.why}
                </DrawerButton>
                <DrawerButton
                    icon={<TiWarningOutline />}
                    dialogContent={() => <Warning />}
                >
                    {language!.warningButton}
                </DrawerButton>
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
