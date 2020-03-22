import { domElement, Krotka } from ".";
import {getDataOffset, BASE_URL, getCurrentWeeks} from "./helper";
import Table from "./Table";
import DatePicker from "./DatePiceker";

export default class Input implements domElement{

    insert_id: string;
    id: string;
    element?:HTMLInputElement;
    errorElement?:HTMLElement;
    placeholder:string;
    loader: HTMLElement;
    
    render(): string {
        return (`<div class="form__group field">
        <input type="input" class="form__field" placeholder="${this.placeholder}" value="" name="${this.placeholder}" id='${this.id}' required />
        <label for="${this.placeholder}" class="form__label">${this.placeholder}</label>
        </div><div id='error-${this.id}'></div>`);
    }
    constructor(id:string,placeholder:string,insert_id?:string,onkeydown?: (e:KeyboardEvent)=> void) {
        this.id = id;
        this.placeholder = placeholder;
        this.loader = document.querySelector('.loader');
        insert_id ? this.insert_id = insert_id : null;
        onkeydown ? this.onKeyDown = onkeydown : null;
        this.inject();
        const cacheGroup = this.getCachedGroup();
        if(cacheGroup) this.start(cacheGroup); 
    }

    fetchData(group: string): Krotka[] {
        group = group.toUpperCase();
        let req = new XMLHttpRequest();
        let data: Krotka[];
        req.open('GET', `${BASE_URL}/?group=${group}`, false);
        const tables_container = document.querySelector('#tables_container') as HTMLElement; 
        const errorElement = this.errorElement;
        const loader = this.loader;
        tables_container.style.display = 'none';  
        loader.style.display = 'block';
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    data = JSON.parse(JSON.parse(req.response));
                    errorElement.innerHTML = '';
                    localStorage.setItem('group',group);
                } else {
                    errorElement.innerHTML = 'Nie ma takiej grupy :/';
                }
                tables_container.style.display = 'block';
                loader.style.display= 'none';
            }
        }

        req.send(null);
        return data;
    }

    start(group: string, numberOfWeeks: number = 7): void {
        document.querySelector('#tables_container').innerHTML="";
        document.querySelector('#data_picker').innerHTML="";
        const data = this.fetchData(group);
        const offsetNumberOfWeeks = getDataOffset();
    
        for (let i = offsetNumberOfWeeks; i < numberOfWeeks + offsetNumberOfWeeks; i++) {    
            const weekData = data.slice(i * 49, (i + 1) * 49);
            const table = new Table(weekData, 'tables_container', i);

            const date = getCurrentWeeks(i);
            new DatePicker(date,'data_picker',table);
        }

    }

    getCachedGroup():string | null {
        const group:string =  localStorage.getItem('group');
        return !!group ? group : null;
    }

    onKeyDown(e:KeyboardEvent):void{
        switch (e.which) {
            case 13:
                this.start(this.getValue());
                break;
        
            default:
                break;
        }
    }

    getValue():string{
        return this.element.value;
    }

    inject(id?:string): void {  
        const outerElement = document.getElementById(id || this.insert_id || 'body');
        outerElement.innerHTML = this.render();
        this.element = outerElement.querySelector(`#${this.id}`);
        this.element.onkeydown = this.onKeyDown.bind(this);
        this.errorElement = outerElement.querySelector(`#error-${this.id}`);
    }

}