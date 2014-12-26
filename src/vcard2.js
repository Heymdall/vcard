function parse(string) {
    var result = {},
        lines = string.split(/\r\n|\r|\n/),
        count = lines.length,
        pieces,
        key,
        value,
        meta;

    for (var i = 0; i < count; i++) {
        if (lines[i] == '') {
            continue;
        }
        pieces = lines[i].split(':');
        key = pieces[0];
        value = pieces[1];
        meta = {};
        // handle multiline properties (i.e. photo)
        if (i + 1 < count && (lines[i + 1][0] == ' ' || lines[i + 1][0] == '\t')) {
            while (lines[i + 1][0] == ' ' || lines[i + 1][0] == '\t') {
                value += lines[i + 1].trim();
                i++;
            }
        }

        // meta fields in property
        if (key.match(/;/)) {
            var metaArr = key.split(';');
            key = metaArr.shift();
            metaArr.forEach(function (item) {
                var arr = item.split('=');
                arr[0] = arr[0].toLowerCase();
                if (meta[arr[0]]) {
                    meta[arr[0]].push(arr[1]);
                } else {
                    meta[arr[0]] = [arr[1]];
                }
            });
        }

        // semicolon-separated values
        if (value.match(/;/)) {
            value = value.split(';');
        }

        // Grouped properties todo: implement this
        if (key.match(/\./)) {

            console.log(key);
        }

        var newValue = {
            value: value
        };
        if (Object.keys(meta).length) {
            newValue.meta = meta;
        }

        key = key.toLowerCase();

        if (typeof result[key] === 'undefined') {
            result[key] = [newValue];
        } else {
            result[key].push(newValue);
        }

    }

    return result;
}

function generate(data) {
    var lines = [];
    Object.keys(data).forEach(function (key) {

    });

    return lines.join('\n');
}

module.exports = {
    parse: parse
};
