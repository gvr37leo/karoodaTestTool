/// <reference path="../models/testcase.ts" />
/// <reference path="testcaseView.ts" />
/// <reference path="../pathfinder.ts" />


class TestToolView{
    element:HTMLElement
    temple:string = ``


    constructor(element:HTMLElement){
        var pathFinder = new PathFinder()
        

        pathFinder.register("",() => {
            this.render()
        })

        pathFinder.register(":id", (params) => {
            new TestcaseView(this.element,new Testcase(1,'paul'))
        })


        pathFinder.trigger(this.removeHash(location.hash))
        window.addEventListener("hashchange", (e: HashChangeEvent) => {
            pathFinder.trigger(this.removeHash(location.hash))
        })
    }

    render(){

    }

    private removeHash(string: string): string {
        if (string[0] == "#") {
            string = string.slice(1)
        }
        return string
    }
}