import type { Language } from "./types";

const english: Language = {
    noAnswer: "Please answer at least one question!",
    questions: [
        "What obstacles did you face today?",
        "What made you smile today?",
        "What did you learn today?",
        "How did you help someone (or yourself) today?",
        "What's one thing you'd love to repeat tomorrow?",
    ],
    saveButton: "Save Memories",
    success: "Memories have been saved successfully!",
    textFieldPlaceholder: "Enter memory here...",
    titleDay: "This",
};

const italian: Language = {
    noAnswer: "Per favore, rispondere ad almeno una domanda!",
    questions: [
        "Quali ostacoli hai affrontato oggi?",
        "Cosa ti ha fatto sorridere oggi?",
        "Cosa hai imparato oggi?",
        "Come hai aiutato qualcuno (o te stesso) oggi?",
        "Qual è una cosa che ti piacerebbe ripetere domani?",
    ],
    saveButton: "Salva Ricordi",
    success: "I ricordi sono stati salvati con successo!",
    textFieldPlaceholder: "Inserisci ricordo qui...",
    titleDay: "Questo",
};

export { english, italian};