/// <reference path="../ajaxCalls.ts" />
/// <reference path="../views/stepView.ts" />
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
            
        new Button(this.buttonrow, '<span class="glyphicon glyphicon-arrow-left"></span>', 'btn btn-default', () => {
            window.location.hash = ''
        })

        new DisableableButton(this.buttonrow, '<span class="glyphicon glyphicon-floppy-disk"></span>', 'btn btn-success', this.dirtiedEvent, () => {
            saveTestCase(this.testcase,() => {

            })
        })
        new Button(this.buttonrow, '<span class="glyphicon glyphicon-play"></span>','btn btn-primary',() => {
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

            dropdownWidget.input.placeholder = 'create new step'

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
        getSteps({ filterEntrys: [{ field:"belongsToTestcase",value:`${this.testcase.id}`}] }, (steps:Step[]) => {

            steps.sort((a,b) => a.stepOrder - b.stepOrder)

            for(let i = 0; i < steps.length; i++){
                let step = steps[i]
                let stepview = new StepView(this.stepstable, step)
                stepview.indexUpCall.request.listen(() => {
                    stepview.indexUpCall.response.trigger(i)
                })

                stepview.uprequest.listen(() => {
                    this.changeOrder(i,steps,-1)
                })

                stepview.downrequest.listen(() => {
                    this.changeOrder(i, steps, 1)
                })

                stepview.refreshrequest.listen(() => {
                    this.updateTable()
                })
            }
        })
    }

    changeOrder(index:number, steps:Step[],orderChange:number){
        var step = steps[index]
        if (inRange(index + orderChange, 0, steps.length - 1)){
            step.stepOrder = index + orderChange
            saveStep(step, () => { })

            steps[index + orderChange].stepOrder = index
            saveStep(steps[index + orderChange],() => {
                this.updateTable()
            })
        }
    }
}

