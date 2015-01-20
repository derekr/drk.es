var hogan = require('hogan.js');
var fs = require('fs');
var async = require('async');

module.exports = function () {
    return function layout (files, metalsmith, callback) {
        async.auto({
            layout: function (callback) {
                fs.readFile(__dirname + '/templates/layout.html', callback);
            },

            article: function (callback) {
                fs.readFile(__dirname + '/templates/article.html', callback);
            }
        }, function (err, obj) {
            var layout = hogan.compile(obj.layout.toString());
            var article = hogan.compile(obj.article.toString());
            for (var file in files) {
                if (
                    file.indexOf('.md') === -1 &&
                    file.indexOf('.html') === -1
                ) continue;

                var doc = files[file];

                var content = '';
                if (doc.collection && doc.collection.indexOf('articles') > -1) {
                    content = article.render({ article: doc.contents });
                } else {
                    content = doc.contents
                }

                doc.contents = layout.render({
                    title: doc.title || metalsmith._metadata.global.title,
                    content: content,
                    global: metalsmith._metadata.global
                });
            };

            callback();
        });
    };
};
