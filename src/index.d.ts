export interface domElement {
    insert_id?:string,
    id:string,
    render():string,
    inject(id?:string):void
}

export type Krotka = {
    name:string,
    date:number,
    hours:number
}
