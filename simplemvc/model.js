const Event = require('./event');

class Model {
    constructor() {
        this.items = [];
        this.addEvent = new Event(this);
        this.removeEvent = new Event(this);
    }

    add(item) {
        this.items.push(item);
        this.addEvent.notify(item);
    }

    remove(index) {
        let item = this.items[index];
        this.items.splice(index, 1);
        this.removeEvent.notify(item)
    }

    getItems() {
        return this.items;
    }
}

module.exports = Model;