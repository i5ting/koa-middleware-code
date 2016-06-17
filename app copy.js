var co = require('co');

const compose = require('koa-compose');
const convert = require('koa-convert')


module.exports = {
  middleware :[],
  use: function (fn) {
    console.log('use:' + fn);
    // fn = convert(fn);
    
    // console.log('fn=' + fn)
    this.middleware.push(fn);
    return this;
  },
  convert: function  (mw) {
    function * createGenerator (next) {
      return yield next()
    }

    if (typeof mw !== 'function') {
      throw new TypeError('middleware must be a function')
    }
    if (mw.constructor.name !== 'GeneratorFunction') {
      // assume it's Promise-based middleware
      return mw
    }
    const converted = function (ctx, next) {
      return co.call(ctx, mw.call(ctx, createGenerator(next)))
    }
    converted._name = mw._name || mw.name

    return converted
  },
  callback: function (cb) {
    const fn = compose(this.middleware);
    console.log('callback compose fn = ' + fn)
    // fn(this);
     //
    // co(compose(stack))(function(err){
    //      if (err) throw err;
    //
    //    })
       
       
    co(fn).then(cb, function (err) {
      console.error(err.stack);
    });
  },
  // compose: function (middleware) {
//     // console.log('compose=' + middleware)
//     return function *(next){
//
//       if (!next) {
//         next = function *(){}
//       }
//       // console.log('xxx=' + next)
//
//
//       var i = middleware.length;
//
//       while (i--) {
//         console.log('compose middleware[' + i + ']=: ' + middleware[i])
//         // next = co.wrap(middleware[i]).call(this);
//         next = middleware[i].call(this, next);
//
//         console.log(next)
//       }
//
//       return yield *next;
//     }
//   }
//
  
}