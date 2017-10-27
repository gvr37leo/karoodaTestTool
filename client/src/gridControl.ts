/// <reference path="models/step.ts" />
/// <reference path="views/stepView.ts" />


class GridControl{
    refreshRequest: EventSystem<any>;
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
        this.refreshRequest = new EventSystem();

        for(var step of this.steps){
            let stepview = new StepView(this.stepscontainer, step)
            stepview.refreshrequest.listen(() => {
                this.refreshRequest.trigger(0)
            })
        }
    }
}