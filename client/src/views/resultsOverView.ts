/// <reference path="../utils.ts" />


class ResultsOverView{
    template: string = `
        <div>
            hello
        </div>
    `
    element:HTMLElement


    constructor(element: HTMLElement) {
        this.element = createAndAppend(element, this.template)
        
        getResults((data) => {
            
        })

    }

}