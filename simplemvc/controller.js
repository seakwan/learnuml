class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addEvent.attach((o, a) => {
            this.add(a);
        });

        this.view.removeEvent.attach((o, a) => {
            this.remove(a);
        });
    }

    add(val) {
        this.model.add(val);
    }

    remove(index) {
        this.model.remove(index);
    }
}

module.exports = Controller;