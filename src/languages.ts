import type { Language } from "./types";

const english: Language = {
    noAnswer: "Please answer at least one question!",
    questions: [
        { id: 1, prompt: "What obstacles did you face today?", answers: [] },
        { id: 2, prompt: "What made you smile today?", answers: [] },
        { id: 3, prompt: "What did you learn today?", answers: [] },
        { id: 4, prompt: "How did you help someone (or yourself) today?", answers: [] },
        { id: 5, prompt: "What's one thing you'd love to repeat tomorrow?", answers: [] },
    ],
    saveButton: "Save Memories",
    success: "Memories have been saved successfully!",
    textFieldPlaceholder: "Enter memory here...",
    titleDay: "This",
    history: "History"
};

const italian: Language = {
    noAnswer: "Per favore, rispondere ad almeno una domanda!",
    questions: [
        { id: 1, prompt: "Quali ostacoli hai affrontato oggi?", answers: [] },
        { id: 2, prompt: "Cosa ti ha fatto sorridere oggi?", answers: [] },
        { id: 3, prompt: "Cosa hai imparato oggi?", answers: [] },
        { id: 4, prompt: "Come hai aiutato qualcuno (o te stesso) oggi?", answers: [] },
        { id: 5, prompt: "Qual è una cosa che ti piacerebbe ripetere domani?", answers: [] },
    ],
    saveButton: "Salva Ricordi",
    success: "I ricordi sono stati salvati con successo!",
    textFieldPlaceholder: "Inserisci ricordo qui...",
    titleDay: "Questo",
    history: "Storia"
};

export { english, italian };
