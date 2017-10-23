/// <reference path="../widget.ts" />
/// <reference path="../utils.ts" />


class TextWidget extends Widget<string>{
    inputel: HTMLInputElement;

    constructor(element: HTMLElement) {
        super(element)
        var that = this;

        this.inputel = createAndAppend(element,'<input class="form-control"/>') as HTMLInputElement

        this.inputel.addEventListener('input', (e) => {
            that.value.set(that.inputel.value)
        })

        this.value.onchange.listen((val) => {
            that.inputel.value = val
        })

        this.value.onClear.listen(() => {
            this.inputel.value = ''
        })
    }

    handleSetReadOnly(val: boolean) {
        var that = this
        that.inputel.readOnly = val;
    }
}