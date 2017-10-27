class StepView{
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
            <div id="parameters"></div>
            <div id="stepbuttons"></div>
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
            for (let parameter of stepParameters) {
                let textWidget = new TextWidget(this.parameters)
                textWidget.value.set(parameter.value)
                textWidget.value.onchange.listen((val) => {
                    parameter.value = val;
                    this.dirtiedEvent.trigger(0)
                })
            }
        })
        

        this.uprequest = new EventSystem();
        this.downrequest = new EventSystem();
        this.refreshrequest = new EventSystem()

        new Button(this.buttonContainer, 'up','btn btn-default',() => {
            this.uprequest.trigger(0)
        })

        new Button(this.buttonContainer, 'down', 'btn btn-default', () => {
            this.downrequest.trigger(0)
        })

        new DisableableButton(this.buttonContainer, 'save', 'btn btn-success',this.dirtiedEvent, () => {
            saveStep(this.step,() => {
                this.refreshrequest.trigger(0)
            })
        })

        new Button(this.buttonContainer, 'delete', 'btn btn-danger', () => {
            deleteStep(this.step.id,() => {
                this.refreshrequest.trigger(0)
            })
        })
    }
}