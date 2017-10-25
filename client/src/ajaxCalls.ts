/// <reference path="models/step.ts" />
function get(destination: string,callback:(data:any[]) => void) {
    fetch(`http://localhost:56232/api/${destination}`, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}

function save<T>(destination: string,obj: T, callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}`, {
        method: "PUT",
        body: JSON.stringify(obj)
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
}

function post<T>(destination: string, obj: T,  callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}`, {
        method: "POST",
        body:JSON.stringify(obj)
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
}

function del(destination: string, _id: string, callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}`, {
        method: "DELETE"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback()
    })
}



//------------------------------TESTCASE---------------------------------
function executeTestCase(_id: string){

}

function getTestCases(callback: (data: any[]) => void){
    get('Testcase',(steps) => {
        callback(steps)
    })
}

function saveTestCase(testcase: Testcase, callback: () => void){
    save('Testcase',testcase,() => {
        callback()
    })
}

function deleteTestCase(id: string, callback: () => void){
    del('Testcase',id,() => {
        callback()
    })
}

function postTestCase(testcase: Testcase, callback: () => void){
    post('Testcase',testcase,() => {
        callback()
    })
}



//------------------------------STEP---------------------------------

function getSteps(callback: (data: any[]) => void) {
    get('Step', (steps) => {
        callback(steps)
    })
}

function saveStep(step: Step, callback: () => void) {
    save('Step', step, () => {
        callback()
    })
}

function deleteStep(id: string, callback: () => void) {
    del('Step', id, () => {
        callback()
    })
}

function postStep(step: Step, callback: () => void) {
    post('Step', step, () => {
        callback()
    })
}