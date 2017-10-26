/// <reference path="../ajaxCalls.ts" />
/// <reference path="../gridControl.ts" />
/// <reference path="../models/step.ts" />
/// <reference path="../models/testcase.ts" />
/// <reference path="../utils.ts" />
/// <reference path="../button.ts" />
/// <reference path="../widgets/textWidget.ts" />
/// <reference path="../widgets/dropdownWidget.ts" />
/// <reference path="../models/functionDefinition.ts" />


class TestcaseView {
    titleWidget: TextWidget;
    newsteprow: HTMLElement;
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
            <div id="newsteprow"></div>
        </div>
    `
    element: HTMLElement

    constructor(element: HTMLElement,testcase:Testcase) {
        this.element = createAndAppend(element, this.template)

        this.buttonrow = this.element.querySelector('#buttonrow') as HTMLElement
        this.attributerow = this.element.querySelector('#attributerow') as HTMLElement
        this.stepstable = this.element.querySelector('#stepstable') as HTMLElement
        this.newsteprow = this.element.querySelector('#newsteprow') as HTMLElement
        
        //up,save
        new Button(this.buttonrow, 'up', 'btn btn-default', () => {

        })

        new Button(this.buttonrow, 'save', 'btn btn-success', () => {

        })

        new Button(this.buttonrow, 'execute','btn btn-primary',() => {
            executeTestCase(testcase.id,() => {

            })
        })

        this.titleWidget = new TextWidget(this.attributerow)
        this.titleWidget.value.set(testcase.name)
        
        var steps = getSteps({ filterEntrys:[]},(steps) => {
            new GridControl(this.stepstable, steps)
        })

        getFunctionDefinitions((res) => {
            var dropdownWidget = new DropDownWidget<FunctionDefinition>(this.newsteprow, 'a', (val) => {
                return val.description
            }, res)

            dropdownWidget.input.addEventListener('keypress',(e) => {
                if(e.keyCode == 13){//enter
                    
                }
            })
        })
        
    }
}
