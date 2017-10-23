/// <reference path="../ajaxCalls.ts" />
/// <reference path="../gridControl.ts" />
/// <reference path="../models/step.ts" />
/// <reference path="../models/testcase.ts" />
/// <reference path="../utils.ts" />
/// <reference path="../button.ts" />
/// <reference path="../widgets/textWidget.ts" />


class TestcaseView {
    stepstable: HTMLElement;
    attributerow: HTMLElement;
    buttonrow: HTMLElement;
    name: string
    testcase:Testcase

    template: string = `
        <div>
            <div id="buttonrow"></div>
            <div id="attributerow"></div>
            <div id="stepstable"></div>
        </div>
    `
    element: HTMLElement

    constructor(element: HTMLElement) {
        this.element = createAndAppend(element, this.template)

        this.buttonrow = this.element.querySelector('#buttonrow') as HTMLElement
        this.attributerow = this.element.querySelector('#attributerow') as HTMLElement
        this.stepstable = this.element.querySelector('#stepstable') as HTMLElement

        //up,save
        new Button(this.buttonrow, 'up', 'btn btn-default', () => {

        })

        new Button(this.buttonrow, 'save', 'btn btn-success', () => {

        })

        new TextWidget(this.attributerow)

        var steps = getSteps((steps) => {
            new GridControl(this.stepstable, steps)
        })
    }
}
