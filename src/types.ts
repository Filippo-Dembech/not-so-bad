export interface Question {
    id: number;
    prompt: string;
    answers: string[]
}

export interface Day {
    date: string,
    questions: Question[]
}

export interface Language {
    titleDay: string;
    questions: Question[];
    saveButton: string;
    noAnswer: string;
    success: string;
    textFieldPlaceholder: string;
    history: string;
    why: string;
}