const Point = require('./point');
const SnakeNode = require('./snakeNode');

class Snake {
    constructor(bodyLength, scopex, scopey) {
        let point = new Point(0, 0);
        let head = new SnakeNode(point, 0);
        this.scopex = scopex;
        this.scopey = scopey;
        this.nodes = [];
        this.nodes.push(head);
        for (let index = 1; index < bodyLength; index++) {
            let node = new SnakeNode(point, index);
            this.nodes[index - 1].append(node);
            this.nodes.push(node);
        }
        this.direction = 'right';
    }

    move(direction, food) {
        if ((this.direction == 'up' && direction == 'down') ||
            (this.direction == 'down' && direction == 'up') ||
            (this.direction == 'left' && direction == 'right') ||
            (this.direction == 'right' && direction == 'left')) {
            this.direction = this.direction;
        } else {
            this.direction = direction;
        }
        let head = this.nodes[0];
        let nextPoint = head.point.next(this.direction);
        let alive = true;
        let isEat = false;

        //撞墙
        switch (this.direction) {
            case 'right':
                alive = !(nextPoint.x >= this.scopex);
                break
            case 'left':
                alive = !(nextPoint.x <= -1);
                break;
            case 'up':
                alive = !(nextPoint.y <= -1);
                break;
            case 'down':
                alive = !(nextPoint.y >= this.scopey);
                break;
            default:
                break;
        }

        //撞自己
        if (alive) {
            for (let index = 0; index < this.nodes.length - 1; index++) {
                const node = this.nodes[index];
                if (nextPoint.x == node.point.x && nextPoint.y == node.point.y) {
                    alive = false;
                    break;
                }
            }
        }

        if (alive) {
            isEat = this.eat(nextPoint, food);
            if (isEat) {
                let newHead = new SnakeNode(food.point);
                newHead.append(head);
                this.nodes.unshift(newHead);
            } else {
                for (let index = this.nodes.length - 1; index > 0; index--) {
                    let node = this.nodes[index];
                    node.point = new Point(node.pervNode.point.x, node.pervNode.point.y);
                }
                head.point = nextPoint;
            }
        }
        return {
            alive,
            isEat
        };
    }

    eat(nextPoint, food) {
        if (food.point.x == nextPoint.x && food.point.y == nextPoint.y) {
            return true;
        } else {
            return false;
        }

    }

    log() {
        for (let index = 0; index < this.nodes.length; index++) {
            const node = this.nodes[index];
            console.log(node.name, node.point);
        }
    }
}

module.exports = Snake;