class Result{
    id:number
    belongsToTestcase:number
    startDate:number
    result:string
    successfull:boolean


    constructor(belongsToTestcase: number,startDate: number,result: string,succeeded: boolean){
        this.belongsToTestcase = belongsToTestcase
        this.startDate = startDate
        this.result = result
        this.successfull = succeeded
    }
}