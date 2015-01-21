var hogan = require('hogan.js');
var fs = require('fs');
var async = require('async');

module.exports = function () {
    return function articleIndex (files, metalsmith, callback) {
        async.auto({
            template: function (callback) {
                fs.readFile(__dirname + '/templates/article-index.html', callback);
            }
        }, function (err, obj) {
            var template = hogan.compile(obj.template.toString());
            var articles = metalsmith._metadata.collections.articles;

            files['articles/index.html'].contents = template.render({
                articles: articles
            });

            callback();
        });
    };
};
