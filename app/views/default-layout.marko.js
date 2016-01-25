function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      ______node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko-layout/placeholder-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<!doctype html> <html lang="en"><head><meta charset="UTF-8"><title>');
    __tag(out,
      ______node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "title",
        "content": data.layoutContent
      });

    out.w('</title><link href="/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href="/vendors/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet"><link href="/css/main.css" rel="stylesheet"></head><body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="/">Home</a></div><div class="collapse navbar-collapse" id="bs-navbar-collapse-1"><ul class="nav navbar-nav"><li class="active"><a href="/about">About <span class="sr-only">(current)</span></a></li><li><a href="/static.html">static</a></li><li><a href="/karaoke">karaoke</a></li></ul><form class="navbar-form navbar-right" role="search"><div class="form-group"><input type="text" class="form-control" placeholder="Search"></div><button type="submit" class="btn btn-default">Submit</button></form><ul class="nav navbar-nav navbar-right"><li><a href="/profile">Profile</a></li><li><a href="/signup">Sign up</a></li><li><a href="/login">Login</a></li><li><a href="/logout">LogOut</a></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li role="separator" class="divider"></li><li><a href="#">Separated link</a></li></ul></li></ul></div></div></nav>');

    if (data.showHeader !== false) {
      out.w('<h1>');
      __tag(out,
        ______node_modules_marko_layout_placeholder_tag_js,
        {
          "name": "title",
          "content": data.layoutContent
        });

      out.w('</h1>');
    }

    out.w('<div id="actions-section"></div><p>');
    __tag(out,
      ______node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "body",
        "content": data.layoutContent
      });

    out.w('</p><div>');
    __tag(out,
      ______node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "footer",
        "content": data.layoutContent
      },
      function(out) {
        out.w('<nav class="footer nav hidden"><div><li><a href="#">Github</a></li><li><a href="#">Twitter</a></li><li><a href="#">Facebook</a></li><li><a href="#">Youtube</a></li></div><div class="container-fluid"><ul class="nav"><li><a href="#">Github</a></li><li><a href="#">Twitter</a></li><li><a href="#">Facebook</a></li><li><a href="#">Youtube</a></li></ul></div></nav> ');
      });

    out.w('</div><script src="/vendors/jquery.min.js"></script><script src="/vendors/bootstrap/js/bootstrap.min.js"></script>');
    __tag(out,
      ______node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "script",
        "content": data.layoutContent
      },
      function(out) {
      });

    out.w(' </body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);