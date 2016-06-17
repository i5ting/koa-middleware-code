
var co = require('co');

function * createGenerator (next) {
  return yield next()
}


var ctx = {
  some: 'thing'
};

return co.wrap(function* (next) {
  console.log(ctx)
  
  yield next()
  
}).call(ctx);



use(fn) {
   if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
   if (isGeneratorFunction(fn)) {
     deprecate('Support for generators will been removed in v3. ' +
               'See the documentation for examples of how to convert old middleware ' +
               'https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x---deprecated');
     fn = convert(fn);
   }
   debug('use %s', fn._name || fn.name || '-');
   this.middleware.push(fn);
   return this;
 }
