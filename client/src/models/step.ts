class Step{
    id:number
    functionPointer:string
    belongsToTestcase:number
    parameters: StepParameter[] = []

    constructor(functionPointer: string,belongsToTestcase: number){
        this.functionPointer = functionPointer
        this.belongsToTestcase = belongsToTestcase
    }
}

class StepParameter{
    
}