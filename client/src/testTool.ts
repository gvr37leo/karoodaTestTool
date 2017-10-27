/// <reference path="models/testcase.ts" />
/// <reference path="views/testcaseView.ts" />
/// <reference path="pathfinder.ts" />
/// <reference path="views/testcaseOverView.ts" />


class TestTool{
    element:HTMLElement
    temple:string = ``


    constructor(element:HTMLElement){
        this.element = element
        var pathFinder = new PathFinder()
        

        pathFinder.register("",() => {
            this.element.innerHTML = ''
            new TestcaseOverView(this.element)
        })

        pathFinder.register(":id", (params) => {
            this.element.innerHTML = ''
            getTestCases({filterEntrys:[{field:"id",value:`${params[0]}`}]},(testcases) => {
                new TestcaseView(this.element, testcases[0])
            })
        })


        pathFinder.trigger(this.removeHash(location.hash))
        window.addEventListener("hashchange", (e: HashChangeEvent) => {
            pathFinder.trigger(this.removeHash(location.hash))
        })
    }

    private removeHash(string: string): string {
        if (string[0] == "#") {
            string = string.slice(1)
        }
        return string
    }
}