var watch = require('metalsmith-simplewatch');

// require('./lib/metalsmith')()
//     .use(watch({
//
//         livereload: true
//     }))
//     .use(serve())
//     .build(function (err) {
//         if (err) return console.error(err);
//     });

watch({
    buildFn: function () {
        require('./lib/metalsmith')().build(function (err) {
            if (err) return console.error(err);
        });
    },

    buildPath: __dirname + '/build',
    srcPath: __dirname + '/src'
});
