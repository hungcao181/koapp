"use strict";
var koa         = require('koa');
var compress    = require('koa-compress');
var serve       = require('koa-static');
var logger      = require('koa-logger');
var app         = koa();

app.use(logger());

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

//compressing

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

//routing

var router = require('./app/routers/index.js');
app
    .use(router.routes())
    .use(router.allowedMethods());

//static file serve
app.use(serve(__dirname + '/public'));


app.on('error', function (err, context) {
    app.logger.error(err);
})

app.listen(3000);