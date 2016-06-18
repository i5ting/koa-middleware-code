var app = require('./app')

app.use((ctx, next) =>{
  console.log(1)
  // before
  return next().then(() => {
    // after
    console.log(2)
  })
})

app.use(function *(next){
  console.log(3)
  yield next;
  console.log(4)
})

console.log(app.middleware)
app.callback();
// 1
// 3
// 4
// 2


// var co = require('co');
//
//
// co(function* () {
//   var result = yield *app.middleware;
//   return result;
// })


// co(app.middleware[0]).then(function(v){
//
// }, function (err) {
//   console.error(err.stack);
// });

