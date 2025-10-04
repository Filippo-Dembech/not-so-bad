/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "../types";
import { getLanguage, saveLanguage } from "../db";
import { english } from "../languages";

interface LanguageContextType {
    language?: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    

    const [language, setLanguage] = useState<Language | undefined>(undefined)
    
    useEffect(() => {
        async function initializeLanguage() {
            const result = await getLanguage();
            if (result) {
                setLanguage(result);
            } else {
                await saveLanguage(english);
                setLanguage(english)
            }
        }
        initializeLanguage();
    }, [])

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
