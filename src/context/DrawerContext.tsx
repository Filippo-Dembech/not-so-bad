/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextType {
    isHistoryOpen: boolean;
    isWhyOpen: boolean;
    isWarningOpen: boolean;
    open: (element: "history" | "why" | "warning") => void
    close: (element: "history" | "why" | "warning") => void
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
    
    function open(element: "history" | "why" | "warning") {
        if (element === "history") setIsHistoryOpen(true);
        if (element === "why") setIsWhyOpen(true);
        if (element === "warning") setIsWarningOpen(true);
    }
    
    function close(element: "history" | "why" | "warning") {
        if (element === "history") setIsHistoryOpen(false);
        if (element === "why") setIsWhyOpen(false);
        if (element === "warning") setIsWarningOpen(false);
    }

    return (
        <DrawerContext.Provider value={{
            isHistoryOpen,
            isWhyOpen,
            isWarningOpen,
            open,
            close
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
