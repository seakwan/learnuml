const SnakeNode = require('./snakeNode');
const Snake = require('./snake');
const Point = require('./point');
const Food = require('./food');

class Game {
    constructor(settings) {
        settings = this.init(settings);
        this.width = settings.width;
        this.height = settings.height;
        this.size = settings.size;
        this.speed = settings.speed;
        this.snakeLength = settings.snakeLength;
        this.direction = settings.direction;

        this.died = false;
        this.snake = null;
        this.timer = null;
        this.food = null;
        this.score = 0;

        this.drawBoardCallback = null;
        this.drawFoodCallback = null;
        this.drawSnakeCallBack = null;
        this.getScoreCallBack = null;
        this.iDiedCallBack = null;
    }

    init(target) {
        let options = this.defaultOptions();
        for (let k in options) {　　
            let src = target[k];　　
            let copy = options[k];
            if (src === copy) {
                continue;
            } else {
                if (!src) {
                    target[k] = copy;
                }
            }
        }

        return target;
    }

    defaultOptions() {
        return {
            width: 400,
            height: 400,
            size: 20,
            speed: 200,
            snakeLength: 5,
            direction: 'right',
        }
    }

    iDie() {
        this.iDiedCallBack && this.iDiedCallBack();
    }

    drawBoard() {
        this.drawBoardCallback && this.drawBoardCallback(0, 0, this.width, this.height);
    }

    drawFood() {
        this.drawFoodCallback && this.drawFoodCallback(this.food.point.x * this.size, this.food.point.y * this.size, this.size, this.size);
    }

    getScore() {
        this.getScoreCallBack && this.getScoreCallBack(this.score);
    }

    drawSnake() {
        let data = this.snake.move(this.direction, this.food);
        this.died = !data.alive;
        this.isEat = data.isEat;
        if (!this.died) {
            if (this.isEat) {
                this.food = this.createFood();
                this.score++;
                this.getScore();
            }
        }

        let nodes = this.snake.nodes;
        let datas = [];
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            datas.push({
                x: node.point.x * this.size,
                y: node.point.y * this.size,
                w: this.size,
                h: this.size
            });
        }

        this.drawSnakeCallBack && this.drawSnakeCallBack(datas);
    }

    createFood() {
        let point = {};
        let nodes = this.snake.nodes;
        point = this.createPoint();
        let food = new Food(point);

        return food;
    }

    createPoint() {
        let x = Math.round(Math.random() * (this.width - this.size) / this.size);
        let y = Math.round(Math.random() * (this.height - this.size) / this.size);
        let point = new Point(x, y);
        return point;
    }

    createSnake() {
        let snake = new Snake(this.snakeLength, Math.floor(this.width / this.size), Math.floor(this.height / this.size));
        return snake;
    }

    start() {
        this.getScore();
        this.snake = this.createSnake();
        this.food = this.createFood();
        this.timer = setInterval(() => {
            if (this.died) {
                clearInterval(this.timer);
                console.log('died');
                this.iDie();
            } else {
                this.drawBoard();
                this.drawSnake();
                this.drawFood();
            }
        }, this.speed);
    }

    move(direction) {
        this.direction = direction;
    }
}

module.exports = Game;