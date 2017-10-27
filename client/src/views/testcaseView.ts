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
    dirtiedEvent: EventSystem<{}>;
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
        this.testcase = testcase

        this.buttonrow = this.element.querySelector('#buttonrow') as HTMLElement
        this.attributerow = this.element.querySelector('#attributerow') as HTMLElement
        this.stepstable = this.element.querySelector('#stepstable') as HTMLElement
        this.newsteprow = this.element.querySelector('#newsteprow') as HTMLElement
        this.dirtiedEvent = new EventSystem()

        //up,save
        new Button(this.buttonrow, 'up', 'btn btn-default', () => {
            window.location.hash = ''
        })

        new DisableableButton(this.buttonrow, 'save', 'btn btn-success', this.dirtiedEvent, () => {
            saveTestCase(this.testcase,() => {

            })
        })

        new Button(this.buttonrow, 'execute','btn btn-primary',() => {
            executeTestCase(this.testcase.id,() => {

            })
        })

        this.titleWidget = new TextWidget(this.attributerow)
        this.titleWidget.value.set(this.testcase.name)
        this.titleWidget.value.onchange.listen((val) => {
            this.testcase.name = val;
            this.dirtiedEvent.trigger(0)
        })

        
        this.updateTable()

        getFunctionDefinitions((res) => {
            var dropdownWidget = new DropDownWidget<FunctionDefinition>(this.newsteprow, 'a', (val) => {
                return val.description
            }, res)

            dropdownWidget.value.onchange.listen((val) => {
                postStep(new Step(val.name,this.testcase.id),() => {
                    this.updateTable()
                })
                dropdownWidget.filter = ''
                dropdownWidget.updateList()
                dropdownWidget.value.clear()
            })

            // dropdownWidget.input.addEventListener('keypress',(e) => {
            //     if(e.keyCode == 13){//enter
                    
            //     }
            // })
        })
        
    }

    updateTable(){
        this.stepstable.innerHTML = ''
        getSteps({ filterEntrys: [{ field:"belongsToTestcase",value:`${this.testcase.id}`}] }, (steps) => {
            var gridControl = new GridControl(this.stepstable, steps)
            gridControl.refreshRequest.listen(() => {
                this.updateTable()
            })
        })
    }
}
