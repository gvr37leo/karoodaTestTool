/// <reference path="models/step.ts" />
/// <reference path="views/stepView.ts" />


class GridControl{
    stepscontainer: HTMLElement;
    steps:Step[]
    element:HTMLElement
    template:string = `
        <div>
            <div id="stepscontainer"></div>
        </div>
    `

    constructor(element:HTMLElement, steps:Step[]){
        this.steps = steps
        this.element = createAndAppend(element,this.template)
        this.stepscontainer = this.element.querySelector('#stepscontainer') as HTMLElement


        for(var step of this.steps){
            new StepView(this.stepscontainer, step)
        }
    }
}