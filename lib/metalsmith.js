var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var metadata = require('metalsmith-metadata');
var publish = require('metalsmith-publish');
var beautify = require('metalsmith-beautify');
var collections = require('metalsmith-collections');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');

var layout = require('./metalsmith-layout');

module.exports = function () {
    return metalsmith(__dirname + '/../')
    // .use(publish({ draft: true }))
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md'
        },
        index: {
            pattern: 'index.html'
        }
    }))
    .use(less({
        pattern: 'public/css/**/*.less'
    }))
    .use(ignore('**/*.less'))
    .use(metadata({
        global: 'global.yaml'
    }))
    // .use(permalinks({ pattern: '/articles/:title' }))
    .use(markdown({
        smartypants: true,
        // sanitize: true,
        gfm: true
    }))
    .use(layout())
};
