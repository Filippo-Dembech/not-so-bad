export interface Question {
    id: number;
    answers: string[]
}

export interface TemplateQuestion {
    id: number
}

export interface Day {
    date: string,
    questions: Question[]
}

export interface Language {
    id: string;
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
    bugReportTitle: string;
    bugReportText: string;
    exportTitle: string;
    exportText: string;
    exportButton: string;
    exportNote: string;
    importTitle: string;
    importButton: string;
    importText: string;
    importWrongFormatError: string;
    importOverwrite: string;
    importOverwriteExplanation: string;
    importGeneralError: string;
    importOverwriteSuccessText: string;
    importMergeSuccessText: string;
    savePDFTitle: string;
    savePDFText: string;
    noAnswerPlaceholder: string;
    questionsButton: string;
    changeQuestionsButton: string;
    changeQuestionsText: string;
    changeQuestionsYes: string;
    changeQuestionsNo: string;
    currentQuestions: string;
    currentQuestionsText: string;
}