/// <reference path="utils.ts" />
/// <reference path="EventSystem.ts" />


class Button {
    btnElement: HTMLButtonElement
    callback: () => void

    constructor(element: Element, html: string, classes: string, callback: () => void) {
        this.callback = callback
        this.btnElement = string2html(`<button class="${classes}">${html}</button>`) as HTMLButtonElement
        element.appendChild(this.btnElement)
        this.btnElement.addEventListener('click', () => {
            this.callback()
        })
    }
}

class DisableableButton extends Button {

    constructor(element: Element, html: string, classes: string, dirtiedEvent: EventSystem<any>, callback: () => void) {
        super(element, html, classes, () => {
            this.btnElement.disabled = true;//onclick
            callback()
        })

        this.btnElement.disabled = true;//initial
        dirtiedEvent.listen((val) => {
            this.btnElement.disabled = false;
        })
    }
}