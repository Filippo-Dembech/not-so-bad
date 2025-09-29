function pad(str: string): string {
    return str.padStart(2, "0");
}

export function getCurrentDay() {
    const date = new Date();

    const day = pad(date.getDate().toString());
    const month = pad((date.getMonth() + 1).toString());    // month + 1 because getMonth() returns 0 for January
    const year = pad(date.getFullYear().toString());
    
    const result = `${day} / ${month} / ${year}`; 

    return result;
}