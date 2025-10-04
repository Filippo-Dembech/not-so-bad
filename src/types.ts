export interface Question {
    id: number;
    answers: string[]
}

export interface Day {
    date: string,
    questions: Question[]
}

export interface Language {
    titleDay: string;
    questions: (Question & { prompt: string })[];
    saveButton: string;
    noAnswer: string;
    success: string;
    textFieldPlaceholder: string;
    history: string;
    why: string;
    addButton: string;
    description: string[];
    savePdf: string;
    noDay: string;
    warningButton: string;
    warningTitle: string;
    warningText: string;
}