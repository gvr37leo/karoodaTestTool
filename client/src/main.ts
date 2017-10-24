/// <reference path="models/step.ts" />
/// <reference path="views/testcaseView.ts" />

var mycontainer = document.querySelector('#mycontainer') as HTMLElement

var testcase = new TestcaseView(mycontainer)







/*

testcases
{
    id
    name
}

steps
{
    id
    name
    functionPointer//points to hardcoded function with a descriptive name string
    belongsToTestCase
}

parameters
{
    id
    type:string
    value:any
    belongsToStep
}




*/