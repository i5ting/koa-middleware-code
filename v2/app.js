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
  compose: function(middleware){
    function *noop(){}
    
    return function *(next){
      if (!next) next = noop();

      var i = middleware.length;

      while (i--) {
        next = convert(this.middleware[i]) //.call(this, next);
      }

      return yield *next;
    }
  },
  callback: function (cb) {
    const fn = this.compose(this.middleware);
    debug('callback compose fn = ' + fn)
    
    var ctx = {
      
    }

    fn(ctx).then(function(){

    })
  }
}
