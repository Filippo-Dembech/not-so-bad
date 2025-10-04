import { Box, Drawer, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { MdHistory } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import LanguagesSelect from "./LanguagesSelect";
import Logo from "./Logo";
import DrawerButton from "./DrawerButton";
import Calendar from "./Calendar";

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
                    dialogContent={() => (
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
                                    <Typography variant="body1">
                                        {paragraph}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    )}
                >
                    {language!.why}
                </DrawerButton>
                <DrawerButton
                    icon={<TiWarningOutline />}
                    dialogContent={() => (
                        <Box padding={3}>
                            <Typography
                                variant="h2"
                                color="primary"
                            >
                                {language!.warningTitle}
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                marginTop={2}
                            >
                                {language!.warningText}
                            </Box>
                        </Box>
                    )}
                >
                    {language!.warningButton}
                </DrawerButton>
                <LanguagesSelect />
            </Box>
        </Drawer>
    );
}
