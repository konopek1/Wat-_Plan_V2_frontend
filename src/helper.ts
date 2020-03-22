export const BASE_URL = "https://wat-plan-backend.herokuapp.com";

export const START_DATE = new Date(2020, 1, 24);

function toDays(date: Date): number {
    return Math.floor(date.valueOf() / 86400000);
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getDataOffset(): number {
    const currDays = toDays(new Date());
    const startDays = toDays(START_DATE);
    return Math.floor((currDays - startDays) / 7);
}

export function getCurrentWeeks(offset: number): string {
    const weekOffset = + offset;
    const startWeek = addDays(START_DATE, weekOffset * 7);
    const endWeek = addDays(START_DATE, (weekOffset + 1) * 7);
    return `${formatDateDDMM(startWeek)} - ${formatDateDDMM(endWeek)}`;
}

function formatDateDDMM(date:Date):string{
    const mm_dd = date.toISOString().split('T')[0].slice(5);
    const [mm,dd] = mm_dd.split('-');
    return `${dd} ${mm}`;
}
