/// <reference path="models/step.ts" />

class Filter{
    filterEntrys:FilterEntry[] = []
}

class FilterEntry{
    field:string
    value:string
}

function get(destination: string, filter: Filter,callback:(data:any[]) => void) {
    fetch(`http://localhost:56232/api/${destination}/GetFiltered`, {
        method: "POST",
        body:JSON.stringify(filter),
        headers: new Headers({ 'content-type': 'application/json' })
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}

function save<T>(destination: string,obj: T, callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}/Put`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: new Headers({ 'content-type': 'application/json' })
        
    }).then((res) => {
        return res.text()
    }).then((res) => {
        callback()
    })
}

function post<T>(destination: string, obj: T,  callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}/Post`, {
        method: "POST",
        body:JSON.stringify(obj),
        headers: new Headers({ 'content-type': 'application/json' })
    }).then((res) => {
        return res.text()
    }).then((res) => {
        callback()
    })
}

function del(destination: string, id: number, callback: () => void) {
    fetch(`http://localhost:56232/api/${destination}/Delete/${id}`, {
        method: "DELETE"
    }).then((res) => {
        return res.text()
    }).then((res) => {
        callback()
    })
}



//------------------------------TESTCASE---------------------------------
function executeTestCase(id: number, callback: () => void){
    fetch(`http://localhost:56232/api/Testcase/Execute/${id}`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' })
    }).then((res) => {
        return res.text()
    }).then((res) => {
        callback()
    })
}

function getTestCases(filter:Filter, callback: (data: any[]) => void){
    get('Testcase', filter, (steps) => {
        callback(steps)
    })
}

function saveTestCase(testcase: Testcase, callback: () => void){
    save('Testcase',testcase,() => {
        callback()
    })
}

function deleteTestCase(id: number, callback: () => void){
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

function getSteps(filter: Filter, callback: (data: any[]) => void) {
    get('Step', filter, (steps) => {
        callback(steps)
    })
}

function saveStep(step: Step, callback: () => void) {
    save('Step', step, () => {
        callback()
    })
}

function deleteStep(id: number, callback: () => void) {
    del('Step', id, () => {
        callback()
    })
}

function postStep(step: Step, callback: () => void) {
    post('Step', step, () => {
        callback()
    })
}

//------------------------------STEPPARAMETERS---------------------------------

function getParameters(filter: Filter, callback: (data: any[]) => void) {
    get('Parameter', filter, (steps) => {
        callback(steps)
    })
}

function saveParameter(step: StepParameter, callback: () => void) {
    save('Parameter', step, () => {
        callback()
    })
}

function deleteParameter(id: number, callback: () => void) {
    del('Parameter', id, () => {
        callback()
    })
}

function postParameter(step: StepParameter, callback: () => void) {
    post('Parameter', step, () => {
        callback()
    })
}

//------------------------------FUNCTIONDEFINITIONS---------------------------------

function getFunctionDefinition(funcname:string,callback: (data: any[]) => void) {
    fetch(`http://localhost:56232/api/Function/Get/${funcname}`, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}

function getFunctionDefinitions(callback: (data: any[]) => void){
    fetch(`http://localhost:56232/api/Function/Get`, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((res) => {
        callback(res)
    })
}