/// <reference path="../models/testcase.ts" />


class TestcaseOverView{
    element: HTMLElement;

    constructor(element: HTMLElement){
        this.element = element
        
        
        getTestCases({filterEntrys:[]},(testCases:any[]) => {
            for(let testCase of testCases){
                new IndividualTestcaseView(this.element, testCase)
            }
        })
    }
}

class IndividualTestcaseView{
    viewbuttons: HTMLElement;
    description: HTMLElement;
    testCase: Testcase;
    element: HTMLElement;

    template:string = `
        <div style="display:flex; align-items:center;" id="testcase-container">
            <div id="description" style="min-width:150px;"></div>
            <div id="viewbuttons"></div>
        </div>
    `

    constructor(element: HTMLElement,testCase:Testcase){

        this.element = createAndAppend(element,this.template) 
        this.testCase = testCase

        this.description = this.element.querySelector('#description') as HTMLElement
        this.viewbuttons = this.element.querySelector('#viewbuttons') as HTMLElement

        createAndAppend(this.description, `<h4>${this.testCase.name}</h4>`)

        new Button(this.element,'edit','btn btn-primary',() => {
            window.location.hash = `${this.testCase.id}`
        })

        new Button(this.element,'delete','btn btn-danger',() => {
            deleteTestCase(this.testCase.id,() => {

            })
        })
    }
}