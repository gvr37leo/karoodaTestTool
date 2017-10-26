/// <reference path="models/step.ts" />
/// <reference path="views/testcaseView.ts" />

var mycontainer = document.querySelector('#mycontainer') as HTMLElement

var testcase = new TestcaseView(mycontainer, new Testcase(1, 'paul'))







/*

testcases
{
    id
    name
}

steps
{
    id
    functionPointer//points to hardcoded function with a descriptive name string
    belongsToTestCase
    order
}

parameters
{
    id
    type:string
    value:any
    belongsToStep
}




*/