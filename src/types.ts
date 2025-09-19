export interface Question {
    prompt: string;
    answers: string[]
}

export interface Day {
    date: string,
    questions: Question[]
}