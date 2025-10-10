/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Day, Question } from "../types";
import { useLanguage } from "./LanguageContext";
import {
    deleteAllDays,
    deleteAnswer,
    getAllDays,
    getDay,
    saveDay,
} from "../db";
import { dateToString } from "../utils/dates";
import type { FileData } from "../ui/Import";
import { useQuestions } from "./QuestionsContext";

interface DaysContextType {
    currentDay?: Day;
    setCurrentDay: React.Dispatch<React.SetStateAction<Day | undefined>>;
    historyDays?: Day[];
    setHistoryDays: React.Dispatch<React.SetStateAction<Day[] | undefined>>;
    addAnswerTo: (question: Question, answer: string) => void;
    deleteAnswerFrom: (question: Question, answer: string) => void;
    createDay: (date: string) => Day;
    overwriteDays: (days: FileData) => void;
    mergeDays: (days: FileData) => void;
}

const DaysContext = createContext<DaysContextType | undefined>(undefined);

interface DaysProviderProps {
    children: ReactNode;
}

function DaysProvider({ children }: DaysProviderProps) {
    const [currentDay, setCurrentDay] = useState<Day | undefined>(undefined);
    const [historyDays, setHistoryDays] = useState<Day[] | undefined>(
        undefined
    );

    const { language } = useLanguage();
    const { questions } = useQuestions();

    const createDay = useCallback(
        (date: string): Day => ({
            date,
            questions: language!.questions
                .map((question) => ({
                    id: question.id,
                    answers: [],
                }))
                .filter((question) =>
                    questions?.some((q) => q.id === question.id)
                ),
        }),
        [language, questions]
    );

    useEffect(() => {
        if (!language) return; // if language is not loaded yet from the DB, return
        async function getInitialDay(): Promise<Day> {
            const days = await getAllDays();
            const today = dateToString(new Date());
            const dbDay = days.find((day) => today == day.date);
            return dbDay || createDay(today);
        }
        async function initializeDay() {
            const initialDay = await getInitialDay();
            const historyDays = await getAllDays();
            setCurrentDay(initialDay);
            setHistoryDays(historyDays);
        }
        initializeDay();
    }, [createDay, language]);

    function addAnswerTo(question: Question, answer: string) {
        if (!answer) return;
        setCurrentDay((day) => ({
            ...day!,
            questions: day!.questions.map((q) =>
                q.id === question.id
                    ? {
                          ...q,
                          answers: [...q.answers, answer],
                      }
                    : q
            ),
        }));
    }

    async function deleteAnswerFrom(question: Question, answer: string) {
        const newDay = await deleteAnswer(currentDay!, question.id, answer);
        if (
            newDay.questions.every((question) => question.answers.length === 0)
        ) {
            setHistoryDays((historyDays) =>
                historyDays?.filter(
                    (historyDay) => historyDay.date !== newDay.date
                )
            );
        }
        setCurrentDay(newDay);
    }

    function isQuestionOf(day: Day, targetQuestion: Question) {
        return day.questions.some(
            (question) => question.id === targetQuestion.id
        );
    }

    function mergeQuestionOf(day: Day, questionsToAdd: Question[]) {
        const existingQuestions = day.questions;
        const newQuestions = questionsToAdd.filter(
            (question) => !isQuestionOf(day, question)
        );
        return {
            ...day,
            questions: [...existingQuestions, ...newQuestions],
        };
    }

    function hasQuestion(questions: Question[], targetQuestion: Question) {
        return questions.some((question) => question.id === targetQuestion.id);
    }

    function areSameQuestions(questionA: Question, questionB: Question) {
        return questionA.id === questionB.id;
    }

    function mergeAnswers(questionA: Question, questionB: Question) {
        return [...questionA.answers, ...questionB.answers];
    }

    function mergeDaysQuestions(dayA: Day, dayB: Day) {
        if (dayA.date !== dayB.date) return undefined;
        let mergedQuestions: Question[] = dayA.questions;
        for (const questionB of dayB.questions) {
            if (hasQuestion(mergedQuestions, questionB)) {
                mergedQuestions = mergedQuestions.map((mergedQuestion) =>
                    areSameQuestions(mergedQuestion, questionB)
                        ? {
                              ...mergedQuestion,
                              answers: mergeAnswers(mergedQuestion, questionB),
                          }
                        : mergedQuestion
                );
            } else {
                mergedQuestions.push(questionB);
            }
        }
        return mergedQuestions;
    }

    function getCurrentQuestions(): Question[] {
        return (
            questions?.map((question) => ({ id: question.id, answers: [] })) ||
            []
        );
    }

    async function overwriteDays(days: FileData) {
        await deleteAllDays();
        days.forEach(async (day) => {
            const newDay = mergeQuestionOf(day, getCurrentQuestions());
            await saveDay(newDay);
        });
        const day = await getDay(currentDay!.date);
        const allDays = await getAllDays();
        if (day) {
            setCurrentDay(day);
        } else {
            setCurrentDay(createDay(currentDay!.date));
        }
        setHistoryDays(allDays);
    }

    function findDayByDate(date: string, days: Day[]) {
        return days.find((day) => day.date === date);
    }

    async function mergeDays(importedDays: FileData) {
        const dbDays = await getAllDays();
        if (dbDays.length > 0) {
            const updatedDays = [];
            // Update all days that are present in the DB
            for (const dbDay of dbDays) {
                // if dbDay is in common with importedDays
                const commonDay = findDayByDate(dbDay.date, importedDays);
                if (commonDay) {
                    const updatedDay: Day = {
                        date: commonDay.date,
                        questions: mergeDaysQuestions(dbDay, commonDay)!,
                    };
                    updatedDays.push(updatedDay);
                    await saveDay(updatedDay);
                } else {
                    // if dbDay is not in common with importedDays
                    updatedDays.push(dbDay);
                    await saveDay(dbDay);
                }
            }

            // Add all days that are not present in the DB
            for (const newDay of importedDays) {
                const isDayPresentInDB = dbDays.some(
                    (dbDay) => dbDay.date === newDay.date
                );
                if (!isDayPresentInDB) {
                    const dayWithCurrentQuestions = {
                        ...newDay,
                        questions: [
                            ...newDay.questions,
                            ...questions!.map((question) => ({
                                id: question.id,
                                answers: [],
                            })),
                        ],
                    };
                    await saveDay(dayWithCurrentQuestions);
                    updatedDays.push(dayWithCurrentQuestions);
                }
            }
            setHistoryDays(updatedDays);
            const updatedCurrentDay = updatedDays.find(
                (day) => day.date === currentDay?.date
            );
            if (updatedCurrentDay) {
                setCurrentDay(updatedCurrentDay);
            }
        } else {
            overwriteDays(importedDays);
            setHistoryDays(importedDays);
        }
    }

    return (
        <DaysContext.Provider
            value={{
                currentDay,
                historyDays,
                setCurrentDay,
                setHistoryDays,
                addAnswerTo,
                createDay,
                deleteAnswerFrom,
                overwriteDays,
                mergeDays,
            }}
        >
            {children}
        </DaysContext.Provider>
    );
}

function useDays() {
    const context = useContext(DaysContext);
    if (!context)
        throw new Error("useDays() must be used within a <DaysProvider>");
    return context;
}

export { DaysProvider, useDays };
