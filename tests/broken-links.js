var test = require('tape');
var cheerio = require('cheerio');
var glob = require('glob');
var async = require('async');
var fs = require('fs');
var reduce = require('amp-reduce');
var request = require('request');

function reduceUrls (elements) {
    return reduce(elements, function (memo, el) {
        var href = el.attribs.href;
        // if (!href.match(/^(http|\/)/)) return memo; don't include local urls for now
        if (!href.match(/^(http)/)) return memo;
        memo.push(href);
        return memo;
    }, []);
}

function mapUrlResponses (url, callback) {
    request(url, function (err, res) {
        if (err) return callback(err);
        callback(null, { url: url, code: res.statusCode });
    });
}

function parseUrls (file, callback) {
    fs.readFile(file, function (err, buff) {
        if (err) return callback(err);

        var $ = cheerio.load(buff.toString());
        callback(null, reduceUrls($('a')));
    });
}

test('all the links', function (t) {
    glob(__dirname + '/../build/**/*.html', function (err, files) {
        async.each(files, function (file, callback) {
            parseUrls(file, function (err, urls) {
                if (err) return callback(err);

                async.map(urls, mapUrlResponses, function (err, results) {
                    var non200 = results.filter(function (res) {
                        return res.code !== 200;
                    });

                    if (non200.length > 0) {
                        t.fail(non200.length + ' broken links');
                    } else {
                        t.pass(file + ': no broken links!');
                    }

                    callback(null);
                });
            });
        }, function () {
            t.end();
        });
    });
});
