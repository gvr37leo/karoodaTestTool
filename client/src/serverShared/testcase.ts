/// <reference path="step.ts" />
/// <reference path="utils.ts" />
/// <reference path="button.ts" />
/// <reference path="widgets/textWidget.ts" />


class Testcase{
    stepstable: HTMLElement;
    attributerow: HTMLElement;
    buttonrow: HTMLElement;
    name:string
    steps:Step[] = []

    template:string = `
        <div>
            <div id="buttonrow"></div>
            <div id="attributerow"></div>
            <div id="stepstable"></div>
        </div>
    `
    element:HTMLElement

    constructor(element:HTMLElement){
        this.element = createAndAppend(element,this.template)

        this.buttonrow = this.element.querySelector('#buttonrow') as HTMLElement
        this.attributerow = this.element.querySelector('#attributerow') as HTMLElement
        this.stepstable = this.element.querySelector('#stepstable') as HTMLElement

        //up,save
        new Button(this.buttonrow,'up','',() => {

        })

        new Button(this.buttonrow,'save','',() => {

        })

        new TextWidget(this.attributerow)
    }
}
