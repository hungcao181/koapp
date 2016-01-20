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
              out.w('Sign up');
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<form id="signupForm" action="/register" method="post">First Name: <input type="text" name="firstname" label="FirstName" placeholder="Enter your first name"> Last Name: <input type="text" name="lastname" label="LastName" placeholder="Enter your last name"> User Name: <input type="text" name="username" label="User Name" placeholder="Enter your username"> Password: <input type="password" name="password" label="Password" placeholder="Your password"><input type="submit" value="Sign up"></form>');
            });
        },
        "*": {
          "showHeader": true
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);