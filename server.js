"use strict";
var koa         = require('koa');
var compress    = require('koa-compress');
var serve       = require('koa-static');
var logger      = require('koa-logger');
var app         = koa();
let appRoot     = require('app-root-path');
let secret      = require(appRoot + '/config/keys').secret;
let jwt         = require('jsonwebtoken');
let koajwt      = require('koa-jwt');
app.use(logger());

app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// app.use(function* (next) {
//     let token = this.cookies.get('user'); // this.get('x-access-token');
    
//     console.log('token ${secret} ', token);
//     if (token) {
//         let decodedToken = yield jwt.verify(token, secret);
//         console.log('decoded ', decodedToken);
//         if (decodedToken.username) {
//             this.state.user = decodedToken;
//             // this.req.isAuthenticated = true;
//         };
//     }
//     yield next;
// });

// without passthrough: true, middleware below this line will be only reached if JWT token is valid
// unless the URL starts with '/public': //.unless({ path: [/^\/public/] })
// app.use(koajwt({ secret: secret, passthrough: true}));

app.use(function* (next) {
    console.log('wow-----user ', this.user , '----state ', this.state);
    yield next;
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