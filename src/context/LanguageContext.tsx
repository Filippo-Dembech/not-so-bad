/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "../types";
import { getLanguage, saveLanguage } from "../db";
import { english, french, german, italian, japanese, spanish } from "../languages";

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

    function fetchLanguage(language: "english" | "italian" | "french" | "spanish" | "german" | "japanese") {
        if (language === "english") return english;
        if (language === "italian") return italian;
        if (language === "spanish") return spanish;
        if (language === "german") return german;
        if (language === "french") return french;
        if (language === "japanese") return japanese;
    }
    
    useEffect(() => {
        async function initializeLanguage() {
            const result = await getLanguage();
            if (result) {
                setLanguage(fetchLanguage(result));
            } else {
                await saveLanguage(english.id);
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
