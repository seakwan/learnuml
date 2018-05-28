const Model = require('./model');
const View = require('./view');
const Controller = require('./controller');

let model = new Model();
let view = new View(model);
let controller = new Controller(model, view);

model.add('hello');
model.add('word');
