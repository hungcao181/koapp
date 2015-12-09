function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __default_layout_marko = __loadTemplate(require.resolve("./default-layout.marko"), require),
      __renderer = __helpers.r,
      ______node_modules_marko_layout_use_tag_js = __renderer(require("marko-layout/use-tag")),
      __tag = __helpers.t,
      ______node_modules_marko_layout_put_tag_js = __renderer(require("marko-layout/put-tag")),
      forEach = __helpers.f,
      escapeXml = __helpers.x;

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
              out.w('About');
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<ul>');

              forEach(data.users, function(user) {
                out.w('<li>' +
                  escapeXml(user.name) +
                  '</li>');
              });

              out.w('</ul>');
            });
        },
        "*": {
          "showHeader": true
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);