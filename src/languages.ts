import type { Language } from "./types";

const italian: Language = {
    test: "italian-test",
    id: "italian",
    noAnswer: "Per favore, rispondere ad almeno una domanda!",
    questions: [
        {
            id: 1,
            prompt: "Cosa ho fatto oggi di cui posso essere fiero(a)?",
            answers: [],
        },
        { id: 2, prompt: "Cosa è andato nel verso giusto oggi?", answers: [] },
        { id: 3, prompt: "Come ho aiutato qualcuno oggi?", answers: [] },
        {
            id: 4,
            prompt: "Quando ho chiesto aiuto oggi? Com'è andata?",
            answers: [],
        },
        { id: 5, prompt: "Cosa di nuovo ho imparato oggi?", answers: [] },
        {
            id: 6,
            prompt: "Qual è una cosa che mi piacerebbe ripetere domani?",
            answers: [],
        },
        { id: 7, prompt: "Cosa mi ha fatto ridere oggi?", answers: [] },
        { id: 8, prompt: "Per cosa sono grato(a) oggi?", answers: [] },
        {
            id: 9,
            prompt: "Quale ricordo di oggi vorrei che restasse?",
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
        '"Not So Bad" utilizza IndexedDB per salvare i dati. Per questo ti consiglio di fare un backup giornaliero dei dati salvandoli come PDF usando il pulsante in basso a destra nella schermata iniziale.',
    bugReportTitle: "Bug Report",
    bugReportText:
        "Se trovi un bug o vorresti qualche funzionalità in più scrivimi una mail all'indirizzo in basso della hompage",
};

const english: Language = {
    test: "english-test",
    id: "english",
    noAnswer: "Please answer at least one question!",
    questions: [
        {
            id: 1,
            prompt: "What did I do today that I can be proud of?",
            answers: [],
        },
        { id: 2, prompt: "What went well today?", answers: [] },
        { id: 3, prompt: "How did I help someone today?", answers: [] },
        {
            id: 4,
            prompt: "When did I ask for help today? How did it go?",
            answers: [],
        },
        { id: 5, prompt: "What new thing did I learn today?", answers: [] },
        {
            id: 6,
            prompt: "What is one thing I’d like to repeat tomorrow?",
            answers: [],
        },
        { id: 7, prompt: "What made me laugh today?", answers: [] },
        { id: 8, prompt: "What am I grateful for today?", answers: [] },
        {
            id: 9,
            prompt: "Which memory from today would I like to keep?",
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
        '"Not So Bad" uses IndexedDB to store data. For this reason, I recommend making a daily backup of the data by saving it as a PDF using the button at the bottom right on the home screen.',
    bugReportTitle: "Bug Report",
    bugReportText:
        "If you find a bug or would like some extra features, send me an email at the address at the bottom of the homepage",
};

const spanish: Language = {
    test: "spanish-test",
    id: "spanish",
    noAnswer: "¡Por favor, responde al menos una pregunta!",
    questions: [
        {
            id: 1,
            prompt: "¿Qué hice hoy de lo que puedo estar orgulloso(a)?",
            answers: [],
        },
        { id: 2, prompt: "¿Qué salió bien hoy?", answers: [] },
        { id: 3, prompt: "¿Cómo ayudé a alguien hoy?", answers: [] },
        { id: 4, prompt: "¿Cuándo pedí ayuda hoy? ¿Cómo fue?", answers: [] },
        { id: 5, prompt: "¿Qué cosa nueva aprendí hoy?", answers: [] },
        {
            id: 6,
            prompt: "¿Qué es una cosa que me gustaría repetir mañana?",
            answers: [],
        },
        { id: 7, prompt: "¿Qué me hizo reír hoy?", answers: [] },
        { id: 8, prompt: "¿Por qué estoy agradecido(a) hoy?", answers: [] },
        {
            id: 9,
            prompt: "¿Qué recuerdo de hoy me gustaría conservar?",
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
        '"Not So Bad" utiliza IndexedDB para almacenar los datos. Por esta razón, recomiendo hacer una copia de seguridad diaria de los datos guardándolos como PDF usando el botón en la parte inferior derecha de la pantalla principal.',
    bugReportTitle: "Informe de errores",
    bugReportText:
        "Si encuentras un error o quieres algunas funciones adicionales, envíame un correo electrónico a la dirección al final de la página principal",
};

const french: Language = {
    test: "french-test",
    id: "french",
    noAnswer: "Veuillez répondre à au moins une question !",
    questions: [
        {
            id: 1,
            prompt: "Qu’ai-je fait aujourd’hui dont je peux être fier(ère) ?",
            answers: [],
        },
        {
            id: 2,
            prompt: "Qu’est-ce qui s’est bien passé aujourd’hui ?",
            answers: [],
        },
        {
            id: 3,
            prompt: "Comment ai-je aidé quelqu’un aujourd’hui ?",
            answers: [],
        },
        {
            id: 4,
            prompt: "Quand ai-je demandé de l’aide aujourd’hui ? Comment ça s’est passé ?",
            answers: [],
        },
        {
            id: 5,
            prompt: "Quoi de nouveau ai-je appris aujourd’hui ?",
            answers: [],
        },
        {
            id: 6,
            prompt: "Quelle chose aimerais-je répéter demain ?",
            answers: [],
        },
        {
            id: 7,
            prompt: "Qu’est-ce qui m’a fait rire aujourd’hui ?",
            answers: [],
        },
        {
            id: 8,
            prompt: "Pour quoi suis-je reconnaissant(e) aujourd’hui ?",
            answers: [],
        },
        {
            id: 9,
            prompt: "Quel souvenir d’aujourd’hui aimerais-je garder ?",
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
        '"Not So Bad" utilise IndexedDB pour stocker les données. Pour cette raison, je recommande de faire une sauvegarde quotidienne des données en les enregistrant au format PDF en utilisant le bouton en bas à droite de l’écran d’accueil.',
    bugReportTitle: "Rapport de bug",
    bugReportText:
        "Si tu trouves un bug ou souhaites plus de fonctionnalités, envoie-moi un e-mail à l’adresse en bas de la page d’accueil",
};

const german: Language = {
    test: "german-test",
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
            prompt: "Wann habe ich heute um Hilfe gebeten? Wie ist es gelaufen?",
            answers: [],
        },
        { id: 5, prompt: "Was Neues habe ich heute gelernt?", answers: [] },
        { id: 6, prompt: "Was möchte ich morgen wiederholen?", answers: [] },
        {
            id: 7,
            prompt: "Was hat mich heute zum Lachen gebracht?",
            answers: [],
        },
        { id: 8, prompt: "Wofür bin ich heute dankbar?", answers: [] },
        {
            id: 9,
            prompt: "Welche Erinnerung von heute möchte ich behalten?",
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
        '"Not So Bad" verwendet IndexedDB, um Daten zu speichern. Deshalb empfehle ich, täglich ein Backup der Daten zu machen, indem du sie als PDF speicherst und den Button unten rechts auf dem Startbildschirm benutzt.',
    bugReportTitle: "Fehlerbericht",
    bugReportText:
        "Wenn du einen Fehler findest oder zusätzliche Funktionen möchtest, schick mir eine E-Mail an die Adresse unten auf der Startseite",
};

const japanese: Language = {
    test: "japanese-test",
    id: "japanese",
    noAnswer: "少なくとも1つの質問に答えてください！",
    questions: [
        { id: 1, prompt: "今日、自分が誇れることは何ですか？", answers: [] },
        { id: 2, prompt: "今日うまくいったことは何ですか？", answers: [] },
        { id: 3, prompt: "今日、誰かを助けたことは何ですか？", answers: [] },
        {
            id: 4,
            prompt: "今日、助けを求めたのはいつですか？ どうでしたか？",
            answers: [],
        },
        { id: 5, prompt: "今日、新しく学んだことは何ですか？", answers: [] },
        { id: 6, prompt: "明日も繰り返したいことは何ですか？", answers: [] },
        { id: 7, prompt: "今日、笑ったことは何ですか？", answers: [] },
        { id: 8, prompt: "今日、感謝していることは何ですか？", answers: [] },
        {
            id: 9,
            prompt: "今日の思い出で、残しておきたいものは何ですか？",
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
        "「Not So Bad」はIndexedDBを使ってデータを保存します。そのため、ホーム画面の右下にあるボタンを使って、データをPDFとして保存し、毎日バックアップすることをおすすめします。",
    bugReportTitle: "バグ報告",
    bugReportText:
        "バグを見つけた場合や新しい機能を希望する場合は、ホームページ下部のアドレスにメールを送ってください",
};

export { english, italian, french, german, japanese, spanish };
