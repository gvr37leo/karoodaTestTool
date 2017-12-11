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

function getTables(callback: (data: any[]) => void){
    // https://editorcontrol-projectpaul2-stageheda-stages.karooda.io/api/form/page
    var res = [
        {
            "Name": "persoon",
            "FriendlyName": "persoon",
            "Table": {
                "Name": "Persoon"
            }
        },
        {
            "Name": "trip",
            "FriendlyName": "trip",
            "Table": {
                "Name": "Trip"
            }
        },
        {
            "Name": "bestemming",
            "FriendlyName": "bestemming",
            "Table": {
                "Name": "Bestemming"
            }
        }
    ]
    callback(res)
}

function getColumns(callback: (data: any[]) => void){
    callback([
        {
            "FieldName": "PersoonHasPersoon_id",
            "ControlType": "AutoNumber",
            "Caption": "persoonhaspersoon_id",
            "FieldType": "DBField",
            "DataType": "int",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": "Integer"
        },
        {
            "FieldName": "PersoonHeeftAchternaam",
            "ControlType": "Textbox",
            "Caption": "persoonheeftachternaam",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "PersoonHeeftTussenVoegsels",
            "ControlType": "Textbox",
            "Caption": "persoonheefttussenvoegsels",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": false,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "PersoonHeeftVoornaam",
            "ControlType": "Textbox",
            "Caption": "persoonheeftvoornaam",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "TripHasTrip_id",
            "ControlType": "AutoNumber",
            "Caption": "triphastrip_id",
            "FieldType": "DBField",
            "DataType": "int",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": "Integer"
        },
        {
            "FieldName": "TripHeeftEenATitel",
            "ControlType": "Textbox",
            "Caption": "tripheefteenatitel",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "TripHeeftEenBTitel",
            "ControlType": "Textbox",
            "Caption": "tripheefteenbtitel",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "TripHeeftEenTitel",
            "ControlType": "Textbox",
            "Caption": "tripheefteentitel",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "TripHeeftOmschrijving",
            "ControlType": "Textarea",
            "Caption": "tripheeftomschrijving",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": false,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "van_TripGaatNaarBestemming_Bestemming",
            "ControlType": "ForeignKey",
            "Caption": "TripGaatNaarBestemming_Bestemming",
            "FieldType": "DBFKField",
            "DataType": null,
            "FkTable": "Bestemming",
            "FkPkColumn": "BestemmingHasBestemming_id",
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "van_TripWordtGeleidtDoorPersoon_Persoon",
            "ControlType": "ForeignKey",
            "Caption": "TripWordtGeleidtDoorPersoon_Persoon",
            "FieldType": "DBFKField",
            "DataType": null,
            "FkTable": "Persoon",
            "FkPkColumn": "PersoonHasPersoon_id",
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        },
        {
            "FieldName": "BestemmingHasBestemming_id",
            "ControlType": "AutoNumber",
            "Caption": "bestemminghasbestemming_id",
            "FieldType": "DBField",
            "DataType": "int",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": "Integer"
        },
        {
            "FieldName": "BestemmingHeeftTitel",
            "ControlType": "Textbox",
            "Caption": "bestemmingheefttitel",
            "FieldType": "DBField",
            "DataType": "varchar",
            "FkTable": null,
            "FkPkColumn": null,
            "IsMandatory": true,
            "DatatableInfo": null,
            "Format": ""
        }
    ])
}