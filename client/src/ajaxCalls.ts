/// <reference path="models/step.ts" />


function getFunctionDefinitions() {
    var steps: any = [
        {
            type: 'click',
            description: 'user clicks on element',
            parameters: [{
                type: 'text',
                name: 'id'
            }]
        }, {
            type: 'write',
            description: 'user writes text',
            parameters: [{
                type: 'text',
                name: 'id'
            }, {
                type: 'text',
                name: 'text to write'
            }]
        }, {
            type: 'switchtab',
            description: 'user goes to tab',
            parameters: [{
                type: 'text',
                name: 'id'
            }]
        }
    ]
    return steps
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