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
    fetch('http://localhost:56232/api/Step', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}

function saveStep(step: Step, callback: () => void) {
    fetch('http://localhost:56232/api/Step', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
}

function postStep(step: Step, callback: () => void) {
    fetch('http://localhost:56232/api/Step', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
}

function deleteStep(_id: string, callback: () => void) {
    fetch('http://localhost:56232/api/Step', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
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