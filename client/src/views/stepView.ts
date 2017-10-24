class StepView{
    downrequest: EventSystem<number>;
    uprequest: EventSystem<number>;
    buttonContainer: HTMLElement;
    parameters: HTMLElement;
    description: HTMLElement;
    element:HTMLElement
    step:Step
    template:string = `
        <div style="display:flex;">
            <div id="description"></div>
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

        for(var parameter of this.step.parameters){//should probably do request to functiondefintition
            new TextWidget(this.parameters)
        }

        this.uprequest = new EventSystem();
        this.downrequest = new EventSystem();

        new Button(this.buttonContainer, 'up','btn btn-default',() => {
            this.uprequest.trigger(0)
        })

        new Button(this.buttonContainer, 'down', 'btn btn-default', () => {

        })

        new Button(this.buttonContainer, 'save', 'btn btn-success', () => {

        })

        new Button(this.buttonContainer, 'delete', 'btn btn-danger', () => {

        })
    }
}