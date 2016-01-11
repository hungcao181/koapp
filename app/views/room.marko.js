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
      escapeXml = __helpers.x,
      attr = __helpers.a,
      forEach = __helpers.f;

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
              out.w(escapeXml(data.title));
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div className="row"><div class="col-md-4"><img' +
                attr("src", data.image) +
                attr("alt", data.title) +
                ' width="304" height="228"><figcaption>' +
                escapeXml(data.title) +
                '</figcaption></div><div class="col-md-8"><ul><li>' +
                escapeXml(data.description) +
                '</li><li>price: ' +
                escapeXml(data.price) +
                '</li><li>Minimum: ' +
                escapeXml(data.MinimumAmount) +
                '</li><li>Status: ' +
                escapeXml(data.status) +
                '</li><li>Started: ' +
                escapeXml(data.startTime) +
                '</li><li>Ended: ' +
                escapeXml(data.endTime) +
                '</li><li>Duration: ' +
                escapeXml(data.duration) +
                '</li></ul></div> </div><div className="row"><div class="col-md-4">Comments</div><div class="col-md-8"></div> </div> ');

              if (notEmpty(data.colors)) {
                out.w('<ul>');

                forEach(data.colors, function(color) {
                  out.w('<li class="color">' +
                    escapeXml(color) +
                    '</li>');
                });

                out.w('</ul>');
              }
              else {
                out.w('<div>No colors!</div>');
              }
            });
          __tag(out,
            ______node_modules_marko_layout_put_tag_js,
            {
              "into": "script",
              "layout": __layoutHelper
            },
            function(out) {
            });
        },
        "*": {
          "showHeader": true
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);