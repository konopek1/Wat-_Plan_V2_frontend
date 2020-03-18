import Table from './Table';
import { Krotka} from '.';
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
    const weekOffset = getDataOffset() + offset;
    const startWeek = addDays(START_DATE, weekOffset * 7);
    const endWeek = addDays(START_DATE, (weekOffset + 1) * 7);
    return `${startWeek.toISOString().split('T')[0].slice(5)} ~ ${endWeek.toISOString().split('T')[0].slice(5)}`;
}

export default function start(group: string, numberOfWeeks: number = 10): void {
    const data = fetchData(group);
    const offsetNumberOfWeeks = getDataOffset();
    console.log(offsetNumberOfWeeks);
    for (let i = offsetNumberOfWeeks; i < numberOfWeeks + offsetNumberOfWeeks; i++) {

        const div = document.createElement('div');
        div.id = 'container' + i.toString();
        document.body.appendChild(div);

        const weekData = data.slice(i * 49, (i + 1) * 49);

        const table = new Table(weekData, 'container' + i,i);
        table.inject();
    }
}

export function fetchData(group: string): Krotka[] {
    let req = new XMLHttpRequest();
    let data: Krotka[];
    req.open('GET', `${BASE_URL}/?group=${group}`, false);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200)
                data = JSON.parse(JSON.parse(req.response));
        }
    };
    req.send(null);
    return data;
}