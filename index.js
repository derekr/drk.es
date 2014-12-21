require('./lib/metalsmith')().build(
    function (err) {
        if (err) return console.error(err);
    }
);
