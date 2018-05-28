class Event {
    constructor(observer) {
        this.observer = observer;
        this.listeners = [];
    }

    attach(listener) {
        this.listeners.push(listener);
    }

    notify(obj) {
        for (let i = 0; i < this.listeners.length; i++) {
            let listener = this.listeners[i];
            listener(this.observer, obj);
        }
    }
}

module.exports = Event;