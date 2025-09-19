// Convert Date -> "dd/mm/yyyy"
export const dateToString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Convert "dd/mm/yyyy" -> Date
export const stringToDate = (str: string): Date => {
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
};
