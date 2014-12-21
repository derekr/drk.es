var glue = require('virtual-glue');
var fs = require('fs');

function readLayout (callback) {
    fs.readFile(__dirname + '/templates/layout.html', callback);
}

module.exports = function () {
    return function layout (files, metalsmith, callback) {
        readLayout(function (err, buffer) {
            for (var file in files) {
                var doc = files[file];
                doc.contents = glue(buffer, {
                    '.article-container': { _html: doc.contents }
                });
            };

            callback();
        });
    };
};
