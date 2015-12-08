"use strict";
var koa     = require('koa');
var app     = koa();

//logger

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

//routing

var router = require('./app/routers/index.js');
app
    .use(router.routes())
    .use(router.allowedMethods());


app.on('error', function (err, context) {
    app.logger.error(err);
})

app.listen(3000);