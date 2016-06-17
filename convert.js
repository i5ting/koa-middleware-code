'use strict'

var co = require('co');
var debug = require('debug')('v1')
const convert = require('koa-convert')
const compose = require('koa-compose');


let call = []
let ctx = {}

let middleware = function * (next) {
  call.push(1)
  yield next
  call.push(3)
}
let mw = convert(middleware)

// mw(ctx, function () {
//   call.push(2)
//   return Promise.resolve()
// }).then(function () {
//   console.log(call)
// })


mw(ctx, function(){return Promise.resolve()}).then(function () {
  console.log(call)
})