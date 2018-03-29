const Point = require('./point');

class SnakeNode {
    constructor(point, name = 0) {
        this.pervNode = null;
        this.nextNode = null;
        this.point = point;
        this.name = name;
    }

    append(node) {
        if (node == null) {
            return;
        }
        this.setNext(node);
        node.setPerv(this);
    }

    setPerv(pervNode) {
        this.pervNode = pervNode;
    }

    setNext(nextNode) {
        this.nextNode = nextNode;
    }
}

module.exports = SnakeNode;