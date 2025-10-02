/* eslint-disable react-refresh/only-export-components */
// MyContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language } from "../types";
import { english as initialLanguage } from "../languages";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(initialLanguage)

    return (
        <LanguageContext.Provider value={{ language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context)
        throw new Error(
            "useLanguage() must be used within a <LanguageProvider>"
        );
    return context;
}

export { LanguageProvider, useLanguage };
