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
var articleIndex = require('./metalsmith-article-index');

module.exports = function () {
    return metalsmith(__dirname + '/../')
    .use(publish({ draft: false }))
    .use(metadata({
        global: 'global.yaml'
    }))
    .use(collections({
        articles: {
            pattern: 'articles/!(index.md)**/*.md'
        },
        projects: {
            pattern: 'projects/!(index.md)**/*.md'
        },
        index: {
            pattern: 'index.html'
        }
    }))
    .use(markdown({
        smartypants: true,
        // sanitize: true,
        gfm: true
    }))
    .use(permalinks({ pattern: '' }))
    .use(articleIndex())
    .use(less({
        pattern: 'public/css/**/*.less'
    }))
    .use(ignore('**/*.less'))
    .use(layout())
};
