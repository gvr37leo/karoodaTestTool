/// <reference path="models/step.ts" />


function getFunctionDefinitions(callback: (data) => void) {
    fetch('http://localhost:56232/api/function',{
        method:"GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}

function getSteps(callback:(data:Step[]) => void) {
    var steps = [{
        parameters:[{
            type:'text'
        }],
        functionPointer:'1078934h5gkg52l5'
    },{
        parameters: [{
            type: 'text'
        }],
        functionPointer: '1078934h5gkg52l5'
    }]
    callback(steps)
}

function saveStep(_id: string, step: Step) {

}

function postStep(step: Step) {

}

function deleteStep(_id: string) {

}




function executeTestCase(_id: string){

}

function getTestCases(){
    
}

function saveTestCase(){

}

function deleteTestCase(){

}

function postTestCase(){

}