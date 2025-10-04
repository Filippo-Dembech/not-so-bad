/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextType {
    isHistoryOpen: boolean;
    openHistory: () => void;
    closeHistory: () => void;
    isWhyOpen: boolean;
    openWhy: () => void;
    closeWhy: () => void;
    isWarningOpen: boolean;
    openWarning: () => void;
    closeWarning: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(
    undefined
);

interface DrawerProviderProps {
    children: ReactNode;
}

function DrawerProvider({ children }: DrawerProviderProps) {

    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isWhyOpen, setIsWhyOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    
    const openHistory = () => setIsHistoryOpen(true);
    const closeHistory = () => setIsHistoryOpen(false);
    const openWhy = () => setIsWhyOpen(true);
    const closeWhy = () => setIsWhyOpen(false);
    const openWarning = () => setIsWarningOpen(true);
    const closeWarning = () => setIsWarningOpen(false);

    return (
        <DrawerContext.Provider value={{
            isHistoryOpen,
            isWhyOpen,
            isWarningOpen,
            openHistory,
            closeHistory,
            openWarning,
            closeWarning,
            openWhy,
            closeWhy
        }}>
            {children}
        </DrawerContext.Provider>
    );
}

function useDrawer() {
    const context = useContext(DrawerContext);
    if (!context)
        throw new Error(
            "useLanguage() must be used within a <LanguageProvider>"
        );
    return context;
}

export { DrawerProvider, useDrawer };
