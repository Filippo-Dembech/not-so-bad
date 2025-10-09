/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getAllQuestions, updateQuestions as dbUpdateQuestions } from "../db";
import type { TemplateQuestion } from "../types";

interface QuestionsContextType {
    questions?: TemplateQuestion[]
    updateQuestions: (questionIds: number[]) => Promise<void>
    deleteAllQuestions: () => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
    undefined
);

interface QuestionsProviderProps {
    children: ReactNode;
}

function QuestionsProvider({ children }: QuestionsProviderProps) {
    
    const [questions, setQuestions] = useState<TemplateQuestion[]>([]);
    
    async function updateQuestions(questionIds: number[]) {
        await dbUpdateQuestions(questionIds)
        setQuestions(questionIds.map(questionId => ({ id: questionId })))
    }
    
    async function deleteAllQuestions() {
        setQuestions([])
    }

    useEffect(() => {
        async function getQuestions() {
            setQuestions(await getAllQuestions())
        }
        getQuestions();
    }, [])

    return (
        <QuestionsContext.Provider value={{ questions, updateQuestions, deleteAllQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
}

function useQuestions() {
    const context = useContext(QuestionsContext);
    if (!context)
        throw new Error(
            "useQuestions() must be used within a <QuestionsProvider>"
        );
    return context;
}

export { QuestionsProvider, useQuestions };

