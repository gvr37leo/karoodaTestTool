class StepView{
    indexUpCall: UpCall<number>;
    refreshrequest: EventSystem<{}>;
    dirtiedEvent: EventSystem<any>;
    downrequest: EventSystem<number>;
    uprequest: EventSystem<number>;
    buttonContainer: HTMLElement;
    parameters: HTMLElement;
    description: HTMLElement;
    element:HTMLElement
    step:Step
    template:string = `
        <div style="display:flex; align-items:center;">
            <div id="description" style="min-width:150px;"></div>
            <div id="parameters" style="display:flex;"></div>
            <div id="stepbuttons" style="margin-left: auto;"></div>
        </div>
    `
    constructor(element:HTMLElement, step:Step){
        this.step = step
        this.element = createAndAppend(element,this.template)

        this.description = this.element.querySelector('#description') as HTMLElement
        this.parameters = this.element.querySelector('#parameters') as HTMLElement
        this.buttonContainer = this.element.querySelector('#stepbuttons') as HTMLElement
        this.dirtiedEvent = new EventSystem<any>();

        this.description.innerHTML = this.step.functionPointer
        // createAndAppend(this.description, `<p>${this.step.functionPointer}</p>`)

        getParameters({ filterEntrys: [{ field:"belongsToStep",value:`${this.step.id}`}] }, (stepParameters) => {
            this.step.parameters = stepParameters
            for (let parameter of this.step.parameters) {
                var widget:Widget<any>;
                var input:HTMLInputElement
                if(parameter.type == ParamType.entity){
                    var tables = getTables()
                    var dropdownWidget = new DropDownWidget(this.parameters, 'dropdown', (e) => {
                        if(e){
                            return e.FriendlyName
                        }else{
                            return ''
                        }
                    }, tables)
                    input = dropdownWidget.input
                    widget = dropdownWidget

                    dropdownWidget.value.onchange.listen((val) => {
                        if(val){
                            parameter.value = val.FriendlyName    
                        }else{
                            parameter.value = val   
                        }
                        this.dirtiedEvent.trigger(0)
                    })

                }else{//default to text widget
                    var textWidget = new TextWidget(this.parameters)
                    input = textWidget.inputel
                    widget = textWidget

                    textWidget.value.onchange.listen((val) => {
                        parameter.value = val;
                        this.dirtiedEvent.trigger(0)
                    })
                }
                input.placeholder = parameter.name
                input.value = parameter.value
                

                
            }
        })
        

        this.uprequest = new EventSystem();
        this.downrequest = new EventSystem();
        this.refreshrequest = new EventSystem()

        this.indexUpCall = new UpCall()

        new Button(this.buttonContainer, '<span class="glyphicon glyphicon-arrow-up"></span>','btn btn-default',() => {
            this.uprequest.trigger(0)
        })

        new Button(this.buttonContainer, '<span class="glyphicon glyphicon-arrow-down"></span>', 'btn btn-default', () => {
            this.downrequest.trigger(0)
        })

        new DisableableButton(this.buttonContainer, '<span class="glyphicon glyphicon-floppy-disk"></span>', 'btn btn-success',this.dirtiedEvent, () => {
            for(let parameter of this.step.parameters){
                saveParameter(parameter,() => {
                    
                })
            }
            this.indexUpCall.request.trigger(0)
            this.indexUpCall.response.listen((val) => {
                this.step.stepOrder = val
                saveStep(this.step, () => {

                })
            })
            
            
        })

        new Button(this.buttonContainer, '<span class="glyphicon glyphicon-trash"></span>', 'btn btn-danger', () => {
            deleteStep(this.step.id,() => {
                this.refreshrequest.trigger(0)
            })
        })
    }
}