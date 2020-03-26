import { Krotka, domElement} from './index';
import { getCurrentWeeks,BASE_URL } from './helper';

const DAYS = ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"];

export default class Table implements domElement {
    insert_id: string;
    id: string;
    private data: Krotka[];
    private offset:number;
    group: string;
    element:HTMLElement;

    constructor(data:Krotka[],insert_id: string,offset:number) {
        this.data = data;
        this.insert_id = insert_id;
        this.offset = offset;
        this.inject();
    }

    render(): string {
        let n_day = 0
        const td = (value: string) => { return (`<td class="td_1">${value}</td>`) };
        const tr = (value: string) => { return (`<tr class="tr_1">${value}</tr>`) };
        let content = "";
        for (let i = 0; i < this.data.length - 6; i += 7) {
            let day = "";
            for (let j = 0; j < 7; j++) {
                const krotka = this.data[i + j];
                day += td(`${krotka.title} <br class='class'>${krotka.class}</br>`);
            }
            content += tr(td(DAYS[n_day])+day);
            n_day < 7 ? n_day++ : n_day=0;
        }
        const week = getCurrentWeeks(this.offset);
        return (
            `<table class="container"><thead><tr><th class="date">${week}</th><th>8:00 - 9:35</th><th>9:50 - 11:25 </th><th>11:40 - 13:15</th><th>13:30 - 15:05</th>
            <th>15:45 - 17:20</th><th>17:35 - 19:10</th><th>19:25 - 21:00</th></td></thead><tbody>${content}</tbody></table>`
        );
    }

    public inject(id?:string): void {
        const div = document.createElement('div');
        div.innerHTML = this.render();
        this.element= div;
        document.getElementById(id || this.insert_id).appendChild(div);
    }
}