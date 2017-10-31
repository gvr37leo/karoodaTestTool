/// <reference path="../widget.ts" />
/// <reference path="../main.ts" />

class DropDownWidget<T> extends Widget<T>{
    drops: HTMLElement[];
    container: HTMLElement;
    input: HTMLInputElement;
    displayer: (val: T) => string;
    dropper: HTMLElement;
    filter:string = ''
    selectedDropIndex:Box<number>
    template: string = `
        <div id="container" style="position:relative; display:inline-block;"> 
            <input class="form-control" id="input" type="text"> 
            <div id="dropper" class="dropper"></div> 
        </div>`;
    dropTemplate: string = `
        <div class="drop hovereffect"></div>
    `
    optionlist: T[]
    filteredlist: T[];
    

    constructor(element: HTMLElement, classes: string, displayer: (val: T) => string, optionlist: T[]) {
        super(element)
        var that = this;
        createAndAppend(this.element, this.template)
        this.selectedDropIndex = new Box(0)
        this.container = this.element.querySelector('#container') as HTMLElement
        this.input = this.element.querySelector('#input') as HTMLInputElement
        this.dropper = this.element.querySelector('#dropper') as HTMLElement
        this.input.classList.add(classes)

        this.value.onchange.listen((val) => {
            that.input.value = that.displayer(val)
            that.dropper.style.display = 'none'
        })

        

        this.optionlist = optionlist;
        this.displayer = displayer

        this.updateList()
        this.selectedDropIndex.onchange.listen((val) => {
            if(val < this.drops.length){
                this.drops[val].style.backgroundColor = '#337ab7'
            }
            
        })
        this.selectedDropIndex.onOldChange.listen((val) => {
            if (val < this.drops.length) {
                this.drops[val].style.backgroundColor = 'white'
            }
        })

        this.input.addEventListener('input',() => {
            this.filter = this.input.value
            this.updateList()
        })

        this.input.addEventListener('focus', () => {
            that.dropper.style.display = 'block'
        })

        this.input.addEventListener('keydown',(e) => {
            if(e.keyCode == 38){//up
                this.selectedDropIndex.set(mod(this.selectedDropIndex.get() - 1, this.filteredlist.length))
            }else if(e.keyCode == 40){//down
                this.selectedDropIndex.set(mod(this.selectedDropIndex.get() + 1, this.filteredlist.length))
            }else if(e.keyCode == 13){//enter
                this.value.set(this.filteredlist[this.selectedDropIndex.get()])
            }
        })

        document.addEventListener('click', (e) => {
            if (!that.container.contains(e.target as any)) {
                that.dropper.style.display = 'none'
            }
        })

        this.value.onClear.listen(() => {
            this.input.value = ''
        })
    }

    updateList(){
        var that = this;
        this.dropper.innerHTML = ''
        var regex = new RegExp(`.*${this.filter}.*`);
        this.filteredlist = []


        for (let option of this.optionlist) {
            var textToDisplay = this.displayer(option)
            if(regex.test(textToDisplay)){
                this.filteredlist.push(option)
            }
        }

        this.selectedDropIndex.set(mod(this.selectedDropIndex.get(), this.filteredlist.length))
        this.drops = []
        for (var i = 0; i < this.filteredlist.length;i++){
            let filterOption = this.filteredlist[i]
            var drop = createAndAppend(this.dropper, this.dropTemplate)
            var textToDisplay = this.displayer(filterOption)
            drop.innerHTML = textToDisplay
            if(i == this.selectedDropIndex.get()){
                drop.style.backgroundColor = '#337ab7'
            }
            drop.addEventListener('click', () => {
                that.value.set(filterOption)
            })
            this.drops.push(drop)
        }
    }

    protected handleSetReadOnly(val: boolean) {
        throw new Error("Method not implemented.");
    }

}