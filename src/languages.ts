import type { Language } from "./types";

const italian: Language = {
    id: "italian",
    noAnswer: "Per favore, rispondere ad almeno una domanda!",
    questions: [
        {
            id: 1,
            prompt: "Cosa ho fatto oggi di cui posso essere orgoglioso(a)?",
            answers: [],
        },
        { id: 2, prompt: "Cosa è andato nel verso giusto oggi?", answers: [] },
        { id: 3, prompt: "Come ho aiutato qualcuno oggi?", answers: [] },
        { id: 4, prompt: "Come ho aiutato me stesso(a) oggi?", answers: [] },
        {
            id: 5,
            prompt: "Quando ho chiesto aiuto oggi? Com'è andata?",
            answers: [],
        },
        { id: 6, prompt: "Cosa di nuovo ho imparato oggi?", answers: [] },
        {
            id: 7,
            prompt: "Qual è una cosa che mi piacerebbe ripetere domani?",
            answers: [],
        },
        { id: 8, prompt: "Cosa mi ha fatto ridere oggi?", answers: [] },
        {
            id: 9,
            prompt: "Cosa ho fatto oggi che mi ha fatto bene?",
            answers: [],
        },
        { id: 10, prompt: "Cosa oggi mi ha scaldato il cuore?", answers: [] },
        { id: 11, prompt: "Chi mi ha fatto sorridere oggi?", answers: [] },
        { id: 12, prompt: "Chi ho fatto sorridere oggi?", answers: [] },
        {
            id: 13,
            prompt: "Quando mi sono sentito me stesso(a) oggi?",
            answers: [],
        },
        { id: 14, prompt: "Per cosa sono grato(a) oggi?", answers: [] },
        {
            id: 15,
            prompt: "C'è un ricordo di oggi che vorrei restasse?",
            answers: [],
        },
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
        "Riflettendo regolarmente sugli aspetti positivi della tua giornata, puoi allenare il tuo cervello a notare il bene in modo più naturale. Col tempo, questo può spostare il tuo modo di pensare verso una prospettiva più positiva e riconoscente.",
    ],
    savePdf: "Salva PDF",
    noDay: "Nessun ricordo è ancora stato salvato.",
    warningButton: "Attenzione",
    warningTitle: "Salva PDF",
    warningText:
        '"Not So Bad" utilizza IndexedDB per salvare i dati. Per questo ti consiglio di fare un backup giornaliero dei dati salvandoli come PDF o esportandoli come file .json .',
    bugReportTitle: "Bug Report",
    bugReportText:
        "Se trovi un bug o vorresti qualche funzionalità in più scrivimi una mail all'indirizzo in basso della hompage",
    exportTitle: "Esporta Ricordi",
    exportText:
        'Clicca sul pulsante "Esporta" se vuoi esportare i dati per importarli in altri devices.',
    exportButton: "Esporta",
    exportNote:
        "NOTA: I file .json non sono criptati, quindi i dati al loro interno sono leggibili. Una volta importati i dati cancella il file .json se non vuoi che nessuno legga le tue risposte.",
    importTitle: "Importa Ricordi",
    importText:
        "Importa il file .json contenente i ricordi che vuoi importare:",
    importButton: "Importa",
    importWrongFormatError: "Struttura file .json non valida.",
    importGeneralError: "Errore durante l'analisi del file .json.",
    importOverwrite: "Sovrascrivi ricordi",
    importOverwriteExplanation:
        "(Se sovrascrivi i ricordi, quelli  già presenti sull'app, verranno rimpiazzati dai ricordi importati)",
    savePDFTitle: "Salva Ricordi in PDF",
    savePDFText:
        "“Scarica i tuoi ricordi in PDF per leggerli in un formato pulito e ordinato, perfetto da condividere o stampare.”",
    noAnswerPlaceholder: "Nessun ricordo per questa domanda.",
    importOverwriteSuccessText:
        "I ricordi sono stati sovrascritti con successo.",
    importMergeSuccessText: "I ricordi sono stati importati con successo.",
    changeQuestionsButton: "Cambia Domande",
    changeQuestionsNo: "No",
    changeQuestionsYes: "Sì",
    changeQuestionsText: "Vuoi cambiare le domande a cui devi rispondere?",
    questionsButton: "Domande",
    currentQuestions: "Domande a cui Tieni",
    currentQuestionsText: "Queste sono le domande a cui tieni:",
    selectQuestionsText:
        "Seleziona le domande a cui vorresti rispondere, quelle che trovi stimolanti e significative per te. Quelle che ti dicono qualcosa.",
};

const english: Language = {
    id: "english",
    noAnswer: "Please answer at least one question!",
    questions: [
        {
            id: 1,
            prompt: "What did I do today that I can be proud of?",
            answers: [],
        },
        { id: 2, prompt: "What went right today?", answers: [] },
        { id: 3, prompt: "How did I help someone today?", answers: [] },
        { id: 4, prompt: "How did I help myself today?", answers: [] },
        {
            id: 5,
            prompt: "When did I ask for help today? How did it go?",
            answers: [],
        },
        { id: 6, prompt: "What new thing did I learn today?", answers: [] },
        {
            id: 7,
            prompt: "What is one thing I’d like to repeat tomorrow?",
            answers: [],
        },
        { id: 8, prompt: "What made me laugh today?", answers: [] },
        { id: 9, prompt: "What did I do today that felt good?", answers: [] },
        { id: 10, prompt: "What warmed my heart today?", answers: [] },
        { id: 11, prompt: "Who made me smile today?", answers: [] },
        { id: 12, prompt: "Who did I make smile today?", answers: [] },
        { id: 13, prompt: "When did I feel truly myself today?", answers: [] },
        { id: 14, prompt: "What am I grateful for today?", answers: [] },
        {
            id: 15,
            prompt: "Is there a memory from today I’d like to keep?",
            answers: [],
        },
    ],

    saveButton: "Save Memories",
    success: "Memories saved successfully!",
    textFieldPlaceholder: "Enter memory here...",
    titleDay: "This",
    history: "History",
    why: "Why Not So Bad",
    addButton: "Add",
    description: [
        '"Not So Bad" is a simple app that helps you reflect on your day and notice positive moments. Answer a few guided questions and discover the bright side of your everyday life.',
        "By regularly reflecting on the positive aspects of your day, you can train your brain to notice the good more naturally. Over time, this can shift your mindset toward a more positive and grateful perspective.",
    ],
    savePdf: "Save PDF",
    noDay: "No memories have been saved yet.",
    warningButton: "Warning",
    warningTitle: "Save PDF",
    warningText:
        '"Not So Bad" uses IndexedDB to store data. For this reason, I recommend making a daily backup by saving them as a PDF or exporting them as a .json file.',
    bugReportTitle: "Bug Report",
    bugReportText:
        "If you find a bug or would like some extra features, send me an email at the address at the bottom of the homepage",
    exportTitle: "Export memories",
    exportText:
        'Click the "Export" button if you want to export the data to import it on other devices.',
    exportButton: "Export",
    exportNote:
        "NOTE: .json files are not encrypted, so the data inside can be read. Once you've imported the data, delete the .json file if you don't want anyone to read your answers.",
    importTitle: "Import Memories",
    importText:
        "Import the .json file containing the memories you want to import:",
    importButton: "Import",
    importWrongFormatError: "Invalid .json file structure.",
    importGeneralError: "Error parsing the .json file.",
    importOverwrite: "Overwrite memories",
    importOverwriteExplanation:
        "(If you overwrite the memories, the ones already in the app will be replaced by the imported ones)",
    savePDFTitle: "Save Memories as PDF",
    savePDFText:
        "Download your memories as a PDF to read them in a clean, organized format — perfect for sharing or printing.",
    noAnswerPlaceholder: "No memory for this question.",
    importOverwriteSuccessText: "Memories have been successfully overwritten.",
    importMergeSuccessText: "Memories have been successfully imported.",
    changeQuestionsButton: "Change Questions",
    changeQuestionsNo: "No",
    changeQuestionsYes: "Yes",
    changeQuestionsText: "Do you want to change the questions you answer?",
    questionsButton: "Questions",
    currentQuestions: "Questions You Care About",
    currentQuestionsText: "These are the questions you care about:",

    selectQuestionsText:
        "Select the questions you’d like to answer — the ones you find stimulating and meaningful to you, the ones that truly speak to you.",
};

const spanish: Language = {
    id: "spanish",
    noAnswer: "¡Por favor, responde al menos una pregunta!",
    questions: [
        {
            id: 1,
            prompt: "¿Qué hice hoy de lo que puedo sentirme orgulloso/a?",
            answers: [],
        },
        { id: 2, prompt: "¿Qué salió bien hoy?", answers: [] },
        { id: 3, prompt: "¿Cómo ayudé a alguien hoy?", answers: [] },
        { id: 4, prompt: "¿Cómo me ayudé a mí mismo/a hoy?", answers: [] },
        {
            id: 5,
            prompt: "¿Cuándo pedí ayuda hoy? ¿Cómo fue?",
            answers: [],
        },
        { id: 6, prompt: "¿Qué cosa nueva aprendí hoy?", answers: [] },
        {
            id: 7,
            prompt: "¿Qué es algo que me gustaría repetir mañana?",
            answers: [],
        },
        { id: 8, prompt: "¿Qué me hizo reír hoy?", answers: [] },
        {
            id: 9,
            prompt: "¿Qué hice hoy que me hizo sentir bien?",
            answers: [],
        },
        { id: 10, prompt: "¿Qué calentó mi corazón hoy?", answers: [] },
        { id: 11, prompt: "¿Quién me hizo sonreír hoy?", answers: [] },
        { id: 12, prompt: "¿A quién hice sonreír hoy?", answers: [] },
        {
            id: 13,
            prompt: "¿Cuándo me sentí realmente yo mismo/a hoy?",
            answers: [],
        },
        { id: 14, prompt: "¿Por qué estoy agradecido/a hoy?", answers: [] },
        {
            id: 15,
            prompt: "¿Hay algún recuerdo de hoy que me gustaría conservar?",
            answers: [],
        },
    ],
    saveButton: "Guardar recuerdos",
    success: "¡Recuerdos guardados con éxito!",
    textFieldPlaceholder: "Escribe un recuerdo aquí...",
    titleDay: "Esto",
    history: "Historia",
    why: "Por qué Not So Bad",
    addButton: "Agregar",
    description: [
        '"Not So Bad" es una app sencilla que te ayuda a reflexionar sobre tu día y notar los momentos positivos. Responde algunas preguntas guiadas y descubre el lado positivo de tu vida cotidiana.',
        "Al reflexionar regularmente sobre los aspectos positivos de tu día, puedes entrenar tu cerebro para notar el bien de manera más natural. Con el tiempo, esto puede cambiar tu forma de pensar hacia una perspectiva más positiva y agradecida.",
    ],
    savePdf: "Guardar PDF",
    noDay: "Aún no se han guardado recuerdos.",
    warningButton: "Advertencia",
    warningTitle: "Guardar PDF",
    warningText:
        '"Not So Bad" utiliza IndexedDB para guardar los datos. Por eso te recomiendo hacer una copia de seguridad diaria guardándolos como PDF o exportándolos como archivo .json.',
    bugReportTitle: "Informe de errores",
    bugReportText:
        "Si encuentras un error o quieres algunas funciones adicionales, envíame un correo electrónico a la dirección al final de la página principal",
    exportTitle: "Exportar Recuerdos",
    exportText:
        'Haz clic en el botón "Exportar" si quieres exportar los datos para importarlos en otros dispositivos.',
    exportButton: "Exportar",
    exportNote:
        "NOTA: Los archivos .json no están encriptados, por lo que los datos dentro se pueden leer. Una vez importados los datos, elimina el archivo .json si no quieres que nadie lea tus respuestas.",
    importTitle: "Importar Recuerdos",
    importText:
        "Importa el archivo .json que contiene los recuerdos que quieres importar:",
    importButton: "Importar",
    importWrongFormatError: "Estructura del archivo .json no válida.",
    importGeneralError: "Error al analizar el archivo .json.",
    importOverwrite: "Sobrescribir recuerdos",
    importOverwriteExplanation:
        "(Si sobrescribes los recuerdos, los que ya están en la aplicación serán reemplazados por los importados)",
    savePDFTitle: "Guardar recuerdos en PDF",
    savePDFText:
        "Descarga tus recuerdos en PDF para leerlos en un formato limpio y ordenado, perfecto para compartir o imprimir.",
    noAnswerPlaceholder: "No hay recuerdos para esta pregunta.",
    importOverwriteSuccessText:
        "Los recuerdos se han sobrescrito correctamente.",
    importMergeSuccessText: "Los recuerdos se han importado correctamente.",
    changeQuestionsButton: "Cambiar Preguntas",
    changeQuestionsNo: "No",
    changeQuestionsYes: "Sí",
    changeQuestionsText: "¿Quieres cambiar las preguntas a las que respondes?",
    questionsButton: "Preguntas",
    currentQuestions: "Preguntas que te importan",
    currentQuestionsText: "Estas son las preguntas que te importan:",

    selectQuestionsText:
        "Selecciona las preguntas a las que te gustaría responder, esas que encuentras estimulantes y significativas para ti, las que realmente te dicen algo.",
};

const french: Language = {
    id: "french",
    noAnswer: "Veuillez répondre à au moins une question !",
    questions: [
        {
            id: 1,
            prompt: "Qu'ai-je fait aujourd'hui dont je peux être fier/fière ?",
            answers: [],
        },
        {
            id: 2,
            prompt: "Qu'est-ce qui s'est bien passé aujourd'hui ?",
            answers: [],
        },
        {
            id: 3,
            prompt: "Comment ai-je aidé quelqu'un aujourd'hui ?",
            answers: [],
        },
        {
            id: 4,
            prompt: "Comment me suis-je aidé(e) aujourd'hui ?",
            answers: [],
        },
        {
            id: 5,
            prompt: "Quand ai-je demandé de l'aide aujourd'hui ? Comment cela s'est-il passé ?",
            answers: [],
        },
        {
            id: 6,
            prompt: "Qu'ai-je appris de nouveau aujourd'hui ?",
            answers: [],
        },
        {
            id: 7,
            prompt: "Quelle est une chose que j'aimerais refaire demain ?",
            answers: [],
        },
        {
            id: 8,
            prompt: "Qu'est-ce qui m'a fait rire aujourd'hui ?",
            answers: [],
        },
        {
            id: 9,
            prompt: "Qu'ai-je fait aujourd'hui qui m'a fait du bien ?",
            answers: [],
        },
        {
            id: 10,
            prompt: "Qu'est-ce qui a réchauffé mon cœur aujourd'hui ?",
            answers: [],
        },
        { id: 11, prompt: "Qui m'a fait sourire aujourd'hui ?", answers: [] },
        {
            id: 12,
            prompt: "À qui ai-je fait sourire aujourd'hui ?",
            answers: [],
        },
        {
            id: 13,
            prompt: "Quand me suis-je senti(e) vraiment moi-même aujourd'hui ?",
            answers: [],
        },
        {
            id: 14,
            prompt: "De quoi suis-je reconnaissant(e) aujourd'hui ?",
            answers: [],
        },
        {
            id: 15,
            prompt: "Y a-t-il un souvenir d'aujourd'hui que j'aimerais garder ?",
            answers: [],
        },
    ],
    saveButton: "Enregistrer les souvenirs",
    success: "Souvenirs enregistrés avec succès !",
    textFieldPlaceholder: "Entrez un souvenir ici...",
    titleDay: "Ce",
    history: "Historique",
    why: "Pourquoi Not So Bad",
    addButton: "Ajouter",
    description: [
        '"Not So Bad" est une application simple qui vous aide à réfléchir sur votre journée et à remarquer les moments positifs. Répondez à quelques questions guidées et découvrez le côté positif de votre vie quotidienne.',
        "En réfléchissant régulièrement aux aspects positifs de votre journée, vous pouvez entraîner votre cerveau à remarquer le bien de manière plus naturelle. Avec le temps, cela peut orienter votre façon de penser vers une perspective plus positive et reconnaissante.",
    ],
    savePdf: "Enregistrer PDF",
    noDay: "Aucun souvenir n’a encore été enregistré.",
    warningButton: "Attention",
    warningTitle: "Enregistrer PDF",
    warningText:
        '"Not So Bad" utilise IndexedDB pour stocker les données. C’est pourquoi je te conseille de faire une sauvegarde quotidienne en les enregistrant en PDF ou en les exportant en fichier .json.',
    bugReportTitle: "Rapport de bug",
    bugReportText:
        "Si tu trouves un bug ou souhaites plus de fonctionnalités, envoie-moi un e-mail à l’adresse en bas de la page d’accueil",
    exportTitle: "Exporter les Souvenirs",
    exportText:
        'Clique sur le bouton "Exporter" si tu veux exporter les données pour les importer sur d’autres appareils.',
    exportButton: "Exporter",
    exportNote:
        "REMARQUE : Les fichiers .json ne sont pas chiffrés, donc les données qu’ils contiennent sont lisibles. Une fois les données importées, supprime le fichier .json si tu ne veux pas que quelqu’un lise tes réponses.",
    importTitle: "Importer les Souvenirs",
    importText:
        "Importe le fichier .json contenant les souvenirs que tu veux importer :",
    importButton: "Importer",
    importWrongFormatError: "Structure du fichier .json invalide.",
    importGeneralError: "Erreur lors de l'analyse du fichier .json.",
    importOverwrite: "Écraser les souvenirs",
    importOverwriteExplanation:
        "(Si tu écrases les souvenirs, ceux déjà présents dans l’application seront remplacés par ceux importés)",
    savePDFTitle: "Enregistrer les souvenirs en PDF",
    savePDFText:
        "Télécharge tes souvenirs en PDF pour les lire dans un format clair et organisé, parfait à partager ou à imprimer.",
    noAnswerPlaceholder: "Aucun souvenir pour cette question.",
    importOverwriteSuccessText: "Les souvenirs ont été écrasés avec succès.",
    importMergeSuccessText: "Les souvenirs ont été importés avec succès.",
    changeQuestionsButton: "Changer les Questions",
    changeQuestionsNo: "Non",
    changeQuestionsYes: "Oui",
    changeQuestionsText:
        "Veux-tu changer les questions auxquelles tu réponds ?",
    questionsButton: "Questions",
    currentQuestions: "Questions qui te tiennent à cœur",
    currentQuestionsText: "Voici les questions qui te tiennent à cœur :",

    selectQuestionsText:
        "Sélectionne les questions auxquelles tu aimerais répondre, celles que tu trouves stimulantes et significatives pour toi, celles qui te parlent vraiment.",
};

const german: Language = {
    id: "german",
    noAnswer: "Bitte beantworte mindestens eine Frage!",
    questions: [
        {
            id: 1,
            prompt: "Was habe ich heute getan, worauf ich stolz sein kann?",
            answers: [],
        },
        { id: 2, prompt: "Was ist heute gut gelaufen?", answers: [] },
        { id: 3, prompt: "Wie habe ich heute jemandem geholfen?", answers: [] },
        {
            id: 4,
            prompt: "Wie habe ich mir heute selbst geholfen?",
            answers: [],
        },
        {
            id: 5,
            prompt: "Wann habe ich heute um Hilfe gebeten? Wie ist es gelaufen?",
            answers: [],
        },
        { id: 6, prompt: "Was habe ich heute Neues gelernt?", answers: [] },
        {
            id: 7,
            prompt: "Was ist eine Sache, die ich morgen wiederholen möchte?",
            answers: [],
        },
        {
            id: 8,
            prompt: "Was hat mich heute zum Lachen gebracht?",
            answers: [],
        },
        {
            id: 9,
            prompt: "Was habe ich heute getan, das mir gut getan hat?",
            answers: [],
        },
        { id: 10, prompt: "Was hat heute mein Herz erwärmt?", answers: [] },
        {
            id: 11,
            prompt: "Wer hat mich heute zum Lächeln gebracht?",
            answers: [],
        },
        {
            id: 12,
            prompt: "Wem habe ich heute ein Lächeln geschenkt?",
            answers: [],
        },
        {
            id: 13,
            prompt: "Wann habe ich mich heute wirklich wie ich selbst gefühlt?",
            answers: [],
        },
        { id: 14, prompt: "Wofür bin ich heute dankbar?", answers: [] },
        {
            id: 15,
            prompt: "Gibt es eine Erinnerung an heute, die ich behalten möchte?",
            answers: [],
        },
    ],
    saveButton: "Erinnerungen speichern",
    success: "Erinnerungen erfolgreich gespeichert!",
    textFieldPlaceholder: "Erinnerung hier eingeben...",
    titleDay: "Dieser",
    history: "Verlauf",
    why: "Warum Not So Bad",
    addButton: "Hinzufügen",
    description: [
        '"Not So Bad" ist eine einfache App, die dir hilft, über deinen Tag nachzudenken und positive Momente zu bemerken. Beantworte ein paar geführte Fragen und entdecke die positive Seite deines Alltags.',
        "Indem du regelmäßig über die positiven Aspekte deines Tages nachdenkst, kannst du dein Gehirn trainieren, das Gute natürlicher wahrzunehmen. Mit der Zeit kann dies deine Denkweise in eine positivere und dankbarere Richtung verschieben.",
    ],
    savePdf: "PDF speichern",
    noDay: "Es wurden noch keine Erinnerungen gespeichert.",
    warningButton: "Achtung",
    warningTitle: "PDF speichern",
    warningText:
        '"Not So Bad" verwendet IndexedDB zum Speichern der Daten. Daher empfehle ich dir, täglich ein Backup zu machen, indem du sie als PDF speicherst oder als .json-Datei exportierst.',
    bugReportTitle: "Fehlerbericht",
    bugReportText:
        "Wenn du einen Fehler findest oder zusätzliche Funktionen möchtest, schick mir eine E-Mail an die Adresse unten auf der Startseite",
    exportTitle: "Erinnerungen exportieren",
    exportText:
        'Klicke auf die Schaltfläche "Exportieren", wenn du die Daten exportieren möchtest, um sie auf anderen Geräten zu importieren.',
    exportButton: "Exportieren",
    exportNote:
        "HINWEIS: .json-Dateien sind nicht verschlüsselt, daher können die darin enthaltenen Daten gelesen werden. Nachdem du die Daten importiert hast, lösche die .json-Datei, wenn du nicht willst, dass jemand deine Antworten liest.",
    importTitle: "Erinnerungen importieren",
    importText:
        "Importiere die .json-Datei, die die Erinnerungen enthält, die du importieren möchtest:",
    importButton: "Importieren",
    importWrongFormatError: "Ungültige .json-Dateistruktur.",
    importGeneralError: "Fehler beim Analysieren der .json-Datei.",
    importOverwrite: "Erinnerungen überschreiben",
    importOverwriteExplanation:
        "(Wenn du die Erinnerungen überschreibst, werden die bereits in der App vorhandenen durch die importierten ersetzt)",
    savePDFTitle: "Erinnerungen als PDF speichern",
    savePDFText:
        "Lade deine Erinnerungen als PDF herunter, um sie in einem klaren, geordneten Format zu lesen – perfekt zum Teilen oder Ausdrucken.",
    noAnswerPlaceholder: "Keine Erinnerung für diese Frage.",
    importOverwriteSuccessText:
        "Die Erinnerungen wurden erfolgreich überschrieben.",
    importMergeSuccessText: "Die Erinnerungen wurden erfolgreich importiert.",
    changeQuestionsButton: "Fragen ändern",
    changeQuestionsNo: "Nein",
    changeQuestionsYes: "Ja",
    changeQuestionsText: "Möchtest du die Fragen ändern, die du beantwortest?",
    questionsButton: "Fragen",
    currentQuestions: "Fragen, die dir wichtig sind",
    currentQuestionsText: "Das sind die Fragen, die dir wichtig sind:",
    selectQuestionsText:
        "Wähle die Fragen aus, auf die du antworten möchtest – die, die du anregend und bedeutungsvoll findest, die, die wirklich zu dir sprechen.",
};

const japanese: Language = {
    id: "japanese",
    noAnswer: "少なくとも1つの質問に答えてください！",
    questions: [
        {
            id: 1,
            prompt: "今日、自分が誇りに思えることは何ですか？",
            answers: [],
        },
        { id: 2, prompt: "今日、うまくいったことは何ですか？", answers: [] },
        { id: 3, prompt: "今日、誰かを助けたことは何ですか？", answers: [] },
        {
            id: 4,
            prompt: "今日、自分自身を助けたことは何ですか？",
            answers: [],
        },
        {
            id: 5,
            prompt: "今日、助けを求めたのはいつですか？結果はどうでしたか？",
            answers: [],
        },
        { id: 6, prompt: "今日、新しく学んだことは何ですか？", answers: [] },
        {
            id: 7,
            prompt: "明日も繰り返したいことは何ですか？",
            answers: [],
        },
        { id: 8, prompt: "今日、何があなたを笑顔にしましたか？", answers: [] },
        {
            id: 9,
            prompt: "今日、あなたがして良かったことは何ですか？",
            answers: [],
        },
        { id: 10, prompt: "今日、心が温まったことは何ですか？", answers: [] },
        { id: 11, prompt: "今日、誰があなたを笑顔にしましたか？", answers: [] },
        { id: 12, prompt: "今日、あなたは誰を笑顔にしましたか？", answers: [] },
        { id: 13, prompt: "今日、いつ自分らしいと感じましたか？", answers: [] },
        { id: 14, prompt: "今日、何に感謝していますか？", answers: [] },
        {
            id: 15,
            prompt: "今日の思い出で、残しておきたいものはありますか？",
            answers: [],
        },
    ],
    saveButton: "思い出を保存",
    success: "思い出が正常に保存されました！",
    textFieldPlaceholder: "ここに思い出を入力...",
    titleDay: "今日",
    history: "履歴",
    why: "なぜNot So Bad",
    addButton: "追加",
    description: [
        '"Not So Bad"は、1日の振り返りとポジティブな瞬間に気づく手助けをするシンプルなアプリです。いくつかの質問に答えて、日常生活の明るい面を発見しましょう。',
        "毎日、ポジティブな出来事を振り返ることで、脳は自然に良いことに気づくようになります。時間が経つにつれ、より前向きで感謝に満ちた考え方へと変わっていきます。",
    ],
    savePdf: "PDFを保存",
    noDay: "まだ思い出は保存されていません。",
    warningButton: "警告",
    warningTitle: "PDFを保存",
    warningText:
        "「Not So Bad」はデータの保存にIndexedDBを使用しています。そのため、PDFとして保存するか、.jsonファイルとしてエクスポートして毎日バックアップを取ることをおすすめします。",

    bugReportTitle: "バグ報告",
    bugReportText:
        "バグを見つけた場合や新しい機能を希望する場合は、ホームページ下部のアドレスにメールを送ってください",
    exportTitle: "思い出をエクスポート",
    exportText:
        "他のデバイスにインポートしたい場合は、「エクスポート」ボタンをクリックしてください。",
    exportButton: "エクスポート",
    exportNote:
        "注意：.jsonファイルは暗号化されていないため、中のデータは閲覧可能です。データをインポートした後は、他の人に回答を見られたくない場合は.jsonファイルを削除してください。",
    importTitle: "思い出をインポート",
    importText:
        "インポートしたい思い出が入った.jsonファイルを選択してください:",
    importButton: "インポート",
    importWrongFormatError: ".jsonファイルの構造が無効です。",
    importGeneralError: ".jsonファイルの解析中にエラーが発生しました。",
    importOverwrite: "思い出を上書き",
    importOverwriteExplanation:
        "（思い出を上書きすると、アプリ内にすでにある思い出はインポートしたものに置き換えられます）",
    savePDFTitle: "思い出をPDFで保存",
    savePDFText:
        "思い出をPDFとしてダウンロードし、すっきり整った形式で読むことができます。共有や印刷にも最適です。",
    noAnswerPlaceholder: "この質問には思い出がありません。",
    importOverwriteSuccessText: "思い出は正常に上書きされました。",
    importMergeSuccessText: "思い出は正常にインポートされました。",
    changeQuestionsButton: "質問を変更",
    changeQuestionsNo: "いいえ",
    changeQuestionsYes: "はい",
    changeQuestionsText: "答える質問を変更しますか？",
    questionsButton: "質問",
    currentQuestions: "大切にしている質問",
    currentQuestionsText: "これはあなたが大切にしている質問です：",
    selectQuestionsText:
        "答えたいと思う質問を選んでください。刺激的で、自分にとって意味のある、心に響く質問を選びましょう。",
};

export { english, italian, french, german, japanese, spanish };
