const co = require('co');
const compose = require('koa-compose');

var arr = [];
var stack = [];

function wait(ms) {
  return function (done) {
    setTimeout(done, ms || 0);
  }
}

stack.push(function *(next){
  arr.push(1);
  yield wait(1);
  yield next;
  yield wait(1);
  arr.push(6);
})

stack.push(function *(next){
  arr.push(2);
  yield wait(1);
  yield next;
  yield wait(1);
  arr.push(5);
})

stack.push(function *(next){
  arr.push(3);
  yield wait(1);
  yield next;
  yield wait(1);
  arr.push(4);
})

var fn = compose(stack);

co(fn).then(function (value) {
  console.log(arr) 
}, function (err) {
  console.error(err.stack);
});