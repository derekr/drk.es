var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

require('./lib/metalsmith')()
    .use(watch({
        livereload: true
    }))
    .use(serve())
    .build(function (err) {
        if (err) return console.error(err);
    });
