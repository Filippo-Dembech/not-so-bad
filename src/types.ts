export interface Question {
    prompt: string;
    answers: string[]
}

export interface Day {
    date: string,
    questions: Question[]
}

export interface Language {
    titleDay: string;
    questions: string[];
    saveButton: string;
    noAnswer: string;
    success: string;
    textFieldPlaceholder: string;
}