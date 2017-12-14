/// <reference path="models/step.ts" />
/// <reference path="views/testcaseView.ts" />
/// <reference path="testTool.ts" />
// tsc .\src\main.ts --outDir ./js --target es6

var mycontainer = document.querySelector('#mycontainer') as HTMLElement
var testtool = new TestTool(mycontainer)
