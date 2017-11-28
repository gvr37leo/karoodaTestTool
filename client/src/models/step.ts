class Step{
    id:number
    functionPointer:string
    belongsToTestcase:number
    stepOrder:number
    parameters: StepParameter[] = []

    constructor(functionPointer: string,belongsToTestcase: number){
        this.functionPointer = functionPointer
        this.belongsToTestcase = belongsToTestcase
    }
}

class StepParameter{
    id:number;
    name:string;
    type: ParamType;
    value:string;
    belongsToStep:number;
}

enum ParamType { text, number, pointer,entity }