/**
 * @function: openDebugWindow(html)
 * @desc: open a popup window with the html you wish to display in it
 * @param html string: the html you wish to display in the popup window
 * @return:
 * @alias: stringToWindow
 * @alias: htmlToWindow
 * @link: https://codepen.io/AllForTheCode/pen/ELGWpE
 */
window.openDebugWindow = function (html) {
    var w = window.open('debug', 'debug', 'width=1200,height=400,resizeable,scrollbars');
    w.document.title = "Debug";
    w.document.write("<style>body {width:100%;}</style>");
    w.document.write("<div style='display:block;width:98%;-ms-word-wrap:break-word ;word-wrap:break-word;border:1px solid #000000;'>" + html + "</div>");
    //w.document.write("<div style='width:100%'>" + str + "</div>");
    w.document.close();
}
window.stringToWindow = function (html) { openDebugWindow(html); }
window.htmlToWindow = function (html) { openDebugWindow(html);}