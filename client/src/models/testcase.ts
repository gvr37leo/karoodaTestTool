/// <reference path="step.ts" />
/// <reference path="../utils.ts" />
/// <reference path="../button.ts" />
/// <reference path="../widgets/textWidget.ts" />


class Testcase{
    id:number
    name:string
    steps:Step[] = []

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}
