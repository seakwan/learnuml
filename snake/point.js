class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    next(direction) {
        let x = this.x;
        let y = this.y;
        switch (direction) {
            case 'right':
                x += 1;
                break
            case 'left':
                x -= 1;
                break;
            case 'up':
                y -= 1;
                break;
            case 'down':
                y += 1;
                break;
            default:
                break;
        }

        return new Point(x, y);
    }
}

module.exports = Point;