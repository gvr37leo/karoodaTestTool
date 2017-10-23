class Box<T>{
    onchange: EventSystem<T>
    onOldChange: EventSystem<T>
    onClear: EventSystem<any>
    value: T
    isSet: boolean = false

    constructor(value: T) {
        this.onchange = new EventSystem();
        this.onOldChange = new EventSystem();
        this.value = value
        this.onClear = new EventSystem();
    }

    get(): T {
        return this.value
    }

    set(value: T, silent: boolean = false) {
        var old = this.value
        this.value = value
        if (old != value || !this.isSet) {
            this.isSet = true;
            if (!silent) {
                this.onchange.trigger(this.value)
                this.onOldChange.trigger(old)
            }
        }
    }

    clear() {
        this.isSet = false;
        this.onClear.trigger(0)
    }
}


class EventSystem<T>{
    callbacks: ((val: T) => void)[] = []

    constructor(){

    }

    listen(callback: (val: T) => void) {
        this.callbacks.push(callback)
    }

    deafen(callback: (val: T) => void) {
        this.callbacks.splice(this.callbacks.findIndex(v => v === callback), 1)
    }

    trigger(value: T) {
        for (var callback of this.callbacks) {
            callback(value)
        }
    }
}
