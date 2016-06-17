var co = require('co');
var debug = require('debug')('v1')
const convert = require('koa-convert')
const compose = require('koa-compose');
const isGeneratorFunction = require('is-generator-function');

module.exports = {
  middleware :[],
  use: function (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      console.log('Support for generators will been removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x---deprecated');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
        
        console.log(fn)
    this.middleware.push(fn);
    return this;
  },
  // convert: function  (mw) {
 //    function * createGenerator (next) {
 //      return yield next()
 //    }
 //
 //    if (typeof mw !== 'function') {
 //      throw new TypeError('middleware must be a function')
 //    }
 //    if (mw.constructor.name !== 'GeneratorFunction') {
 //      // assume it's Promise-based middleware
 //      return mw
 //    }
 //    const converted = function (ctx, next) {
 //      return co.call(ctx, mw.call(ctx, createGenerator(next)))
 //    }
 //    converted._name = mw._name || mw.name
 //
 //    return converted
 //  },
  callback: function (cb) {
    const fn = compose(this.middleware);
    debug('callback compose fn = ' + fn)
    var ctx = {
      
    }
     
    fn(ctx, function(){return Promise.resolve()}).then(function () {
      console.log(this)
    })
     
    
    // co(fn).call(ctx);
    // fn(ctx).then(function(){
//
//     })
  }
}
