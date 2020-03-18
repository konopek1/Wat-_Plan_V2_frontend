import { domElement } from ".";
import start,{getDataOffset} from "./helper";

export default class Input implements domElement{

    insert_id?: string;
    id: string;
    element?:HTMLInputElement;
    placeholder:string;
    render(): string {
        return (`<div class="form__group field">
        <input type="input" class="form__field" placeholder="${this.placeholder}" value="" name="${this.placeholder}" id='${this.id}' required />
        <label for="${this.placeholder}" class="form__label">${this.placeholder}</label>
        </div>`);
    }
    constructor(id:string,placeholder:string,insert_id?:string,onkeydown?: (e:KeyboardEvent)=> void) {
        this.id = id;
        this.placeholder = placeholder;
        insert_id ? this.insert_id = insert_id : null;
        onkeydown ? this.onKeyDown = onkeydown : null;
    }

    onKeyDown(e:KeyboardEvent):void{
        switch (e.which) {
            case 13:
                start(this.getValue());
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
    }

}