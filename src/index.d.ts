export interface domElement {
    insert_id:string,
    id:string,
    render():string,
    inject():void
}

export type Krotka = {
    title:string,
}
