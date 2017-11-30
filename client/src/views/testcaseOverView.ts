/// <reference path="../models/testcase.ts" />


class TestcaseOverView{
    testcasecontainer: HTMLElement;
    newtestcase: HTMLElement;
    template:string = `
        <div>
            <div id="newtestcase" style="display:flex;"></div>
            <div id="testcasecontainer"></div>
        </div>
    `
    element: HTMLElement;

    constructor(element: HTMLElement){
        this.element = createAndAppend(element,this.template)
        this.newtestcase = this.element.querySelector('#newtestcase') as HTMLElement
        this.testcasecontainer = this.element.querySelector('#testcasecontainer') as HTMLElement
        
        var newTestcaseNameWidget = new TextWidget(this.newtestcase)
        newTestcaseNameWidget.inputel.placeholder = 'testcase name'
        newTestcaseNameWidget.inputel.classList.add('leftgroup')

        new Button(this.newtestcase, 'create testcase','btn btn-success rightgroup',() => {
            postTestCase(new Testcase(0, newTestcaseNameWidget.value.get()),() => {
                this.render()
            })
        })

        this.render()
    }

    render(){
        this.testcasecontainer.innerHTML = ''
        getTestCases({ filterEntrys: [] }, (testCases: any[]) => {
            for (let testCase of testCases) {
                let testcaseview = new IndividualTestcaseView(this.testcasecontainer, testCase)
                testcaseview.refreshRequest.listen(() => {
                    this.render()
                })
            }
        })
    }
}

class IndividualTestcaseView{
    refreshRequest: EventSystem<any>;
    viewbuttons: HTMLElement;
    description: HTMLElement;
    testCase: Testcase;
    element: HTMLElement;

    template:string = `
        <div style="display:flex; align-items:center;" id="testcase-container">
            <div id="description" style="min-width:250px;"></div>
            <div id="viewbuttons"></div>
        </div>
    `

    constructor(element: HTMLElement,testCase:Testcase){

        this.element = createAndAppend(element,this.template) 
        this.testCase = testCase
        this.refreshRequest = new EventSystem()
        this.description = this.element.querySelector('#description') as HTMLElement
        this.viewbuttons = this.element.querySelector('#viewbuttons') as HTMLElement

        createAndAppend(this.description, `<h4>${this.testCase.name}</h4>`)

        new Button(this.element,'edit','btn btn-primary',() => {
            window.location.hash = `${this.testCase.id}`
        })

        new Button(this.element,'delete','btn btn-danger',() => {
            deleteTestCase(this.testCase.id,() => {
                this.refreshRequest.trigger(0)
            })
        })
    }
}