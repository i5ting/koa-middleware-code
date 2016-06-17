'use strict'

var co = require('co');

co.call({}, function *(){
  console.log('1')
}).then(function(){
  console.log('then')
})


co(function *(){
  console.log('1')
}).then(function(){
  console.log('then')
})