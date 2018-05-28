const Model = require('./model');
const Event = require('./event');

class View {
    constructor(model) {
        this.model = model;
        this.addEvent = new Event(this);
        this.removeEvent = new Event(this);

        this.model.addEvent.attach((o, a) => {
            this.show();
        });

        this.model.removeEvent.attach((o, a) => {
            this.show();
        });

        $('#addButton').click((e) => {
            let val = $('#item').val();
            this.addEvent.notify(val);
            $('#item').val('');
        });

        $('#removeButton').click((e) => {
            var index = $('#list').get(0).selectedIndex;
            this.removeEvent.notify(index);
        });
    }

    show() {
        let items = this.model.getItems();
        $('#list').html('');
        let html = '';
        for (let i = 0; i < items.length; i++) {
            html += '<option>' + items[i] + '</option>';
        }
        $('#list').html(html);
    }
}

module.exports = View;