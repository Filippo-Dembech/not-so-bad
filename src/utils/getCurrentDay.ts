export function getCurrentDay() {
    const date = new Date();
    const day = date.getDay().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}