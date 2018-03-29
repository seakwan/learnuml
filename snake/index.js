const Game = require('./game');

window.onload = function () {
    function start() {
        let width = parseInt(document.getElementById('width').value || 400);
        let height = parseInt(document.getElementById('height').value || 400);
        let size = parseInt(document.getElementById('size').value || 0);
        let speed = parseInt(document.getElementById('speed').value || 200);
        let snakeLength = parseInt(document.getElementById('snakeLength').value || 0);

        let setting = {
            width,
            height,
            size,
            speed,
            snakeLength
        }

        let canvas = document.getElementById('canvas');
        canvas.setAttribute('width', width + 'px');
        canvas.setAttribute('height', height + 'px');
        let ctx = canvas.getContext('2d');

        let game = new Game(setting);

        game.drawBoardCallback = (x, y, w, h) => {
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, w, h);
        };

        game.drawFoodCallback = (x, y, w, h) => {
            ctx.fillStyle = "red";
            ctx.fillRect(x, y, w, h);
        };

        game.drawSnakeCallBack = (ls) => {
            for (let index = 0; index < ls.length; index++) {
                const el = ls[index];
                ctx.fillStyle = "lime";
                ctx.fillRect(el.x, el.y, el.w, el.h);
                ctx.strokeStyle = "red";
                ctx.strokeRect(el.x, el.y, el.w, el.h);
            }
        };

        game.getScoreCallBack = (s) => {
            document.getElementById('score').value = s;
        };

        game.iDiedCallBack = () => {
            alert('you are died');
        };

        document.onkeydown = (function (e) {
            let key = e.which;
            let direction = '';
            switch (key) {
                case 37:
                    direction = 'left';
                    break;
                case 38:
                    direction = 'up';
                    break;
                case 39:
                    direction = 'right';
                    break;
                case 40:
                    direction = 'down';
                    break;
                default:
                    break;
            }
            game.move(direction);
        })

        game.start();
    }

    document.getElementById('btn').onclick = start;
}