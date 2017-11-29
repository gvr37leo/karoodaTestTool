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
    fetch(`http://localhost:56232/api/Step/PostStep`, {
        method: "POST",
        body: JSON.stringify(step),
        headers: new Headers({ 'content-type': 'application/json' })
    }).then((res) => {
        return res.text()
    }).then((res) => {
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

function getResults(callback: (data: any[]) => void){
    get('Result',new Filter(),(data) => {
        callback(data)
    })
}

function getTables(){
    // https://editorcontrol-projectpaul2-stageheda-stages.karooda.io/api/form/page
    var res = [
        {
            "Name": "oudere",
            "FriendlyName": "oudere",
            "Table": {
                "Name": "oudere"
            }
        },
        {
            "Name": "vrijwilliger",
            "FriendlyName": "vrijwilliger",
            "Table": {
                "Name": "vrijwilliger"
            }
        },
        {
            "Name": "hulpaanvraag",
            "FriendlyName": "hulpaanvraag",
            "Table": {
                "Name": "hulpaanvraag"
            }
        },
        {
            "Name": "displaylanguage",
            "FriendlyName": "displaylanguage",
            "Table": {
                "Name": "DisplayLanguage"
            }
        },
        {
            "Name": "users",
            "FriendlyName": "users",
            "Table": {
                "Name": "Users"
            }
        },
        {
            "Name": "roles",
            "FriendlyName": "roles",
            "Table": {
                "Name": "Roles"
            }
        },
        {
            "Name": "userroles",
            "FriendlyName": "userroles",
            "Table": {
                "Name": "UserRoles"
            }
        }
    ]
    return res
}

function getColumns(){
    // https://editorcontrol-projectpaul2-stageheda-stages.karooda.io/api/form/page/fields?page=oudere&_=1511777139582
    var res = [
        {
            "FieldName": "naar_HulpaanvraagHeeftOudere_oudere",
            "ControlType": "LegacyGrid",
            "Caption": "HulpaanvraagHeeftOudere_oudere",
            "FieldType": "DBChildGridField",
            "DataType": null,
            "FkTable": "oudere",
            "FkPkColumn": "OudereHasOudere_id",
            "IsMandatory": null
        },
        {
            "FieldName": "OudereHasOudere_id",
            "ControlType": "AutoNumber",
            "Caption": "ouderehasoudere_id",
            "FieldType": "DBField",
            "DataType": "int",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true
        },
        {
            "FieldName": "OudereHeeftAdres",
            "ControlType": "Textbox",
            "Caption": "adres",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": false
        },
        {
            "FieldName": "OudereHeeftNaam",
            "ControlType": "Textbox",
            "Caption": "naam",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": false
        },
        {
            "FieldName": "OudereHeeftTelefoonnummer",
            "ControlType": "Textbox",
            "Caption": "telefoonnummer",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": false
        }
    ]
    return res
}