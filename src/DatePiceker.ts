import { domElement } from ".";
import Table from "./Table";

export default class DatePicker implements domElement{
    insert_id: string;
    id: string;
    private date:string;
    private table:Table;
    
    render(): string {
        return (`<a class="data_picker--link">${this.date}</a>`);
    }

    onClick(e:EventTarget){
        this.table.element.scrollIntoView();
    }

    inject(): void {
        const container = document.createElement('span');
        container.innerHTML = this.render();
        container.onclick = this.onClick.bind(this);
        document.getElementById(this.insert_id).appendChild(container);
    }
    constructor(date:string,insert_id:string,table:Table) {
        this.date = date;
        this.insert_id = insert_id;
        this.table =table;
        this.inject();
    }
}