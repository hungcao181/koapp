function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html>\n  <head>\n  </head>\n  <body>\n    <ul>\n        <li>\n            <a href="http://www.amazon.com/gp/product/B00NIYJF6U/ref=br_asw_pdt-1?pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_s=desktop-6&amp;pf_rd_r=1KGFQQ4ZED56SY2ANJ4C&amp;pf_rd_t=36701&amp;pf_rd_p=2306025342&amp;pf_rd_i=desktop"> Amazon </a>\n        </li>\n        <li>    \n            <a href="https://www.32redsport.com"> Bet </a>\n        </li>\n    </ul>\n  </body>\n</html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);