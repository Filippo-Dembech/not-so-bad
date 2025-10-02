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
    history: "History",
    why: "Why Not So Bad",
    addButton: "Add",
    description: [
        '"Not So Bad" is a simple app that helps you reflect on your day and notice the good moments. Answer a few guided questions and see the positive side of your daily life.',
        'By regularly reflecting on positive aspects of your day, you can train your brain to notice the good more naturally. Over time, this can shift your mindset toward a more positive, appreciative perspective.'
    ],
    savePdf: "Save as PDF",
    noDay: "No memory has been saved yet."
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
    history: "Storia",
    why: "Perché Not So Bad",
    addButton: "Aggiungi",
    description: [
        '"Not So Bad" è un’app semplice che ti aiuta a riflettere sulla tua giornata e a notare i momenti positivi. Rispondi a qualche domanda guidata e scopri il lato positivo della tua vita quotidiana.',
        'Riflettendo regolarmente sugli aspetti positivi della tua giornata, puoi allenare il tuo cervello a notare il bene in modo più naturale. Col tempo, questo può spostare il tuo modo di pensare verso una prospettiva più positiva e riconoscente.'
    ],
    savePdf: "Salva PDF",
    noDay: "Nessun ricordo è ancora stato salvato."
};

export { english, italian };
