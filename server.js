"use strict";
var koa         = require('koa');
var compress    = require('koa-compress');
var serve       = require('koa-static');
var logger      = require('koa-logger');
var app         = koa();
let jwt         = require('jsonwebtoken');
let koajwt      = require('koa-jwt');
app.use(logger());

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

//should use this.state instead of this.req
// app.use(function *(next) {
//     let token = this.get('x-access-token');
//     let decodedToken = yield jwt.verify(token, 'secretkey');
//     console.log('decoded ', decodedToken);
//     if (decodedToken.username) {
//         this.req.username = decodedToken.username;
//         this.req.isAuthenticated = true;
//     }
//     yield next;
// })

// without passthrough: true, middleware below this line will be only reached if JWT token is valid
// unless the URL starts with '/public'
app.use(
    koajwt({ secret: 'secretkey', passthrough: false})
    //.unless({ path: [/^\/public/] })
);

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