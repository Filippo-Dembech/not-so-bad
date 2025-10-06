import { Button } from "@mui/material";
import { getAllDays } from "../db";
import { stringToDate } from "../utils/dates";
import { useLanguage } from "../context/LanguageContext";
import html2pdf from "html2pdf.js";
import type { CSSProperties } from "react";
import type { Day, Question } from "../types";

interface SavePDFButtonProps {
    style: CSSProperties,
    isContained?: boolean
}

export default function SavePDFButton({ style, isContained = false }: SavePDFButtonProps) {
    const { language } = useLanguage();

    function chronologically(a: Day, b: Day) {
        return stringToDate(a.date).getTime() - stringToDate(b.date).getTime();
    }

    function getHTMLAnswersFrom(answers: string[]) {
        if (answers.length === 0) return `<li style="color: #d4d4d4; font-style: italic">${language!.noAnswerPlaceholder}</li>`
        return answers
            .map(
                (answer) => `
                    <li style="display: flex; align-items: center; font-style: italic">
                        <span style="color: gray; padding-right: 1rem">-</span>
                        ${answer}
                    </li>
                `
            )
            .join(" ");
    }

    function getHTMLQuestionsFrom(questions: Question[]) {
        return questions
            .map(
                (question) => `
                    <div style="border-left: 5px solid #cff0dd; padding-left: 1rem; margin-bottom: 1rem">
                        <p style="font-weight: bold">
                            ${language?.questions[question.id - 1].prompt}
                        </p>
                        <ul style="list-style: none">
                            ${getHTMLAnswersFrom(question.answers)}
                        </ul>
                    </div>
                `
            )
            .join(" ");
    }

    function getHTMLDaysFrom(days: Day[]) {
        return days
            .map(
                (day) => `
                    <div style="position:relative">
                        <img style="position: absolute; top: 0; right: 0" src="data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPy0tPgo8c3ZnIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGl0bGUiPgogIDx0aXRsZSBpZD0idGl0bGUiPlNlbGYtaW1wcm92ZSBpY29uOiBoZWFydC1wbGFudCB3aXRoIHVwd2FyZCBhcnJvdyBhbmQgc3BhcmtsZXM8L3RpdGxlPgoKICA8IS0tIFNpbmdsZSBncmVlbiBjb2xvciAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmcgeyBmaWxsOiAjMmVjYzcxOyBzdHJva2U6ICMyZWNjNzE7IHN0cm9rZS13aWR0aDogMzsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyB9CiAgICAgIC5nLWZpbGwgeyBmaWxsOiAjMmVjYzcxOyBzdHJva2U6IG5vbmU7IH0KICAgICAgLmctc3Ryb2tlIHsgZmlsbDogbm9uZTsgc3Ryb2tlOiAjMmVjYzcxOyBzdHJva2Utd2lkdGg6IDQ7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CgogIDwhLS0gSGVhcnQgYmFzZSAoYWN0cyBsaWtlICJ0aGUgZ29vZCBpbiB5b3VyIGxpZmUiKSAtLT4KICA8cGF0aCBjbGFzcz0iZy1maWxsIiBkPSIKICAgIE02NCA4NgogICAgQzY0IDg2IDM2IDYyIDM2IDQ0CiAgICBDMzYgMzIgNDYgMjQgNjAgMjgKICAgIEM2NCAzMCA2OCAzMCA3MiAyOAogICAgQzg2IDI0IDk2IDMyIDk2IDQ0CiAgICBDOTYgNjIgNjggODYgNjggODYKICAgIFoiPjwvcGF0aD4KCiAgPCEtLSBTdGVtIC8gYXJyb3cgYm9keSByaXNpbmcgZnJvbSBoZWFydCAtLT4KICA8cGF0aCBjbGFzcz0iZy1zdHJva2UiIGQ9Ik02NCA2NCBMNjQgMjgiPjwvcGF0aD4KCiAgPCEtLSBBcnJvdyBoZWFkIC0tPgogIDxwYXRoIGNsYXNzPSJnIiBkPSJNNTYgMzYgTDY0IDI0IEw3MiAzNiBMNjQgMzIgWiI+PC9wYXRoPgoKICA8IS0tIExlZnQgbGVhZiAtLT4KICA8cGF0aCBjbGFzcz0iZy1maWxsIiBkPSJNNTAgNTAKICAgIEM0NCA0NCAzNiA0MCAzNCA0OAogICAgQzM0IDQ4IDQwIDU0IDQ4IDU0CiAgICBDNTAgNTQgNTIgNTIgNTAgNTAKICAgIFoiPjwvcGF0aD4KCiAgPCEtLSBSaWdodCBsZWFmIC0tPgogIDxwYXRoIGNsYXNzPSJnLWZpbGwiIGQ9Ik03OCA1MAogICAgQzg0IDQ0IDkyIDQwIDk0IDQ4CiAgICBDOTQgNDggODggNTQgODAgNTQKICAgIEM3OCA1NCA3NiA1MiA3OCA1MAogICAgWiI+PC9wYXRoPgoKICA8IS0tIFNwYXJrbGVzICh0aHJlZSBzbWFsbCBzaGFwZXMgdG8gc3VnZ2VzdCAiZ29vZCB0aGluZ3MiKSAtLT4KICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOCwxOCkgc2NhbGUoMC45KSI+CiAgICA8cGF0aCBkPSJNNiAwIEw4IDQgTDEyIDYgTDggOCBMNiAxMiBMNCA4IEwwIDYgTDQgNCBaIj48L3BhdGg+CiAgPC9nPgoKICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NiwyMCkgc2NhbGUoMC43KSI+CiAgICA8cGF0aCBkPSJNNiAwIEw4IDQgTDEyIDYgTDggOCBMNiAxMiBMNCA4IEwwIDYgTDQgNCBaIj48L3BhdGg+CiAgPC9nPgoKICA8ZyBjbGFzcz0iZy1maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAsODQpIHNjYWxlKDAuOCkiPgogICAgPHBhdGggZD0iTTYgMCBMOCA0IEwxMiA2IEw4IDggTDYgMTIgTDQgOCBMMCA2IEw0IDQgWiI+PC9wYXRoPgogIDwvZz4KPC9zdmc+Cg==" />
                        <h2 style="color: #3B7A57; border-radius: 0 20px 20px 0; background-color: #CFF0DD; padding: 0.5rem 2rem">${
                            day.date
                        }</h2>
                        <div style="padding: 0 2rem">
                            ${getHTMLQuestionsFrom(day.questions)}
                        </div>
                    <div>
                    <div class="page-break"></div>
                `
            )
            .join(" ");
    }

    function getHTMLNoMemory() {
        return `
            <h1 style="color: #2A5C3D">Not So Bad</h1>
            <p style="color: gray; font-style: italic">${
                language!.noDay
            }</p>
        `;
    }

    function getHTMLFrom(days: Day[]) {
        if (days.length === 0) return getHTMLNoMemory();
        return `
            <h1 style="color: #2A5C3D">Not So Bad</h1>
            ${getHTMLDaysFrom(days)}
        `;
    }

    return (
        <Button
            style={style}
            variant={`${isContained ? "contained" : "outlined"}`}
            disableElevation={isContained}
            onClick={async () => {
                const days = await getAllDays();
                const sortedDays = days.sort(chronologically);
                const options = {
                    margin: 0.5,
                    filename: "not-so-bad.pdf",
                    html2canvas: { scale: 2 },
                    jsPDF: {
                        unit: "in",
                        format: "letter",
                        oriantation: "portrait",
                    },
                };

                const html = getHTMLFrom(sortedDays);

                html2pdf().set(options).from(html).save();
            }}
        >
            {language!.savePdf}
        </Button>
    );
}
