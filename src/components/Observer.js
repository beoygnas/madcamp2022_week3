class Observer {
    constructor() {
        this.observers = []
    }

    addObserver(object) {
        this.obsevers.push(object)
    }

    clearObserver() {
        this.observers.length = 0
    }

    sendMessage() {
        for(const observer in this.observers)  {
            this.observers.getMessage()
        }
    }

}

export { Observer }