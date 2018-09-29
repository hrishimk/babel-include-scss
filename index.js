const fs = require('fs');
const Path = require('path');
const sass = require('node-sass');

module.exports = function MyPlugin(ref) {
    var t = ref.types;
    return {
        visitor: {
            CallExpression: {
                enter: function (path) {
                    if (t.isCallExpression(path.node) && path.node.callee.name === 'include_scss') {
                        let file_name = this.file.hub.file.opts.filename;
                        let fpath = Path.join(Path.dirname(file_name), path.node.arguments[0].value);
                        let content = sass.renderSync({
                            file: fpath,
                            outputStyle: "compressed",
                        }).css.toString('utf-8').trim();
                        path.replaceWith(t.stringLiteral(content));
                    }
                }
            }
        }
    };
};