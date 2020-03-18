import { Krotka, domElement } from ".";

export default class Week implements domElement {
    insert_id?: string;
    id: string;

    constructor(plan:Krotka[]) {
            
    }

    render(): String {
        throw new Error("Method not implemented.");
    }
}