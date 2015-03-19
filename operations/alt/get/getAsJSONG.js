module.exports = function(walk) {
    return function getAsJSONG(model, paths, values) {
        var results = {
            values: [],
            errors: [],
            requestedPaths: [],
            optimizedPaths: [],
            requestedMissingPaths: [],
            optimizedMissingPaths: []
        };
        var inputFormat = Array.isArray(paths[0]) ? 'Paths' : 'JSON';
        var jsong;
        if (values && values.length === 1 && !values[0].jsong) {
            jsong = {jsong: values[0], paths: []};
            results.values = [jsong];
        } else {
            jsong = values[0];
        }

        for (var i = 0, len = paths.length; i < len; i++) {
            walk(model, model._cache, model._cache, paths[i], 0, jsong, [], results, [], [], inputFormat, 'JSONG');
        }

        if (results.requestedPaths.length === 0) {
            results.values = [null];
        }
        return results;
    };
};
