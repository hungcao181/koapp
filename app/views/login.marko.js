function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __default_layout_marko = __loadTemplate(require.resolve("./default-layout.marko"), require),
      __renderer = __helpers.r,
      ______node_modules_marko_layout_use_tag_js = __renderer(require("marko-layout/use-tag")),
      __tag = __helpers.t,
      ______node_modules_marko_layout_put_tag_js = __renderer(require("marko-layout/put-tag"));

  return function render(data, out) {
    __tag(out,
      ______node_modules_marko_layout_use_tag_js,
      {
        "template": __default_layout_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "title",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('Login');
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div id="login" class="container"><form id="loginForm" method="post" name="userInfo"><input type="text" name="username" label="User Name" placeholder="Enter your username"><input type="password" name="password" label="Password" placeholder="Your password"><input type="button" onClick="login()" value="Login"></form></div>');
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "script",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<script>\n                            \n            function login() {\n                //var data = new FormData(document.getElementById(\'loginForm\'));\n                var fields = $("#loginForm").serializeArray();\n                var data = {};\n                $.each(fields, function (i, f) {\n                    data[f.name] = f.value;\n                });\n                console.log(\'data \', data);\n                $.ajax({\n                    url: \'/authenticate\',\n                    type: \'post\',\n                    data: data,\n                    headers: {\n                        \'Accept\': \'application/json\'\n                    }\n                }).done(function (body) {\n                    console.log(\'body: \', body);\n                    if (body.token) {\n                        localStorage.token = body.token;\n                        document.cookie = \'user=\'+ body.token;\n                        window.location = \'/karaoke\';\n                    }\n                }).fail(function (err) {\n                    console.log(\'error! \', err);\n                });\n            }\n        </script>');
            });

          out.w(' ');
        },
        "*": {
          "showHeader": false
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);