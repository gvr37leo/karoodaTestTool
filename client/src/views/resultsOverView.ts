/// <reference path="../utils.ts" />
/// <reference path="../models/result.ts" />
declare var moment:any

class ResultsOverView{
    resultcontainer: HTMLElement;
    template: string = `
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>Result</th> 
                        <th>Testcase</th>
                    </tr>
                </thead>
                <tbody id="resultcontainer" >
                </tbody>
            </table>
        </div>
    `
    element:HTMLElement


    constructor(element: HTMLElement) {
        this.element = createAndAppend(element, this.template)
        this.resultcontainer = this.element.querySelector('#resultcontainer') as HTMLElement
        
        getResults((data:Result[]) => {
            data.sort((a, b) => b.startDate - a.startDate)
            for(var result of data){
                new IndividualResultView(this.resultcontainer, result)
            }
        })

    }

}

class IndividualResultView{
    startdateEl:HTMLElement
    resultEl: HTMLElement
    belongsToTestcaseEl: HTMLElement

    template: string = `
            <td id="startdate"></td>
            <td id="result"></td>
            <td id="belongsToTestcase"></td>
    `
    element: HTMLElement
    result: Result

    constructor(element: HTMLElement, result: Result) {
        this.element = document.createElement('tr')
        this.element.innerHTML = this.template
        element.appendChild(this.element)
        this.result = result

        this.startdateEl = this.element.querySelector('#startdate') as HTMLElement
        this.resultEl = this.element.querySelector('#result') as HTMLElement
        this.belongsToTestcaseEl = this.element.querySelector('#belongsToTestcase') as HTMLElement

        this.element.style.backgroundColor = this.result.successfull?'green':'red'
        this.startdateEl.innerText = moment.unix(this.result.startDate).format('DD-MM-YYYY HH:mm:ss')
        this.resultEl.innerText = this.result.result
        this.belongsToTestcaseEl.innerText = this.result.belongsToTestcase as any
        
    }
}