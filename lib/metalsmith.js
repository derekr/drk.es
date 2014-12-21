var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var metadata = require('metalsmith-metadata');
var publish = require('metalsmith-publish');
var beautify = require('metalsmith-beautify');

var layout = require('./metalsmith-layout');

module.exports = function () {
    return metalsmith(__dirname + '/../')
    // .use(publish({ draft: true }))
    // .use(metadata())
    .use(permalinks({ pattern: '/articles/:title' }))
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(layout())
    .use(beautify({
        html: { indent_size: 2, indent_char: ' ' },
    }));
};
