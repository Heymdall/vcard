var PREFIX = 'BEGIN:VCARD',
    POSTFIX = 'END:VCARD';

function parse(string) {
    var result = {},
        lines = string.split(/\r\n|\r|\n/),
        count = lines.length,
        pieces,
        key,
        value,
        meta,
        namespace;

    for (var i = 0; i < count; i++) {
        if (lines[i] == '') {
            continue;
        }
        if (lines[i].toUpperCase() == PREFIX || lines[i].toUpperCase() == POSTFIX) {
            continue;
        }
        pieces = lines[i].split(':');
        key = pieces[0];
        value = pieces[1];
        namespace = false;
        meta = {};

        /**
         * Check that next line continues current
         * @param {number} i
         * @returns {boolean}
         */
        var isValueContinued = function (i) {
            return i + 1 < count && (lines[i + 1][0] == ' ' || lines[i + 1][0] == '\t');
        };
        // handle multiline properties (i.e. photo).
        // next line should start with space or tab character
        if (isValueContinued(i)) {
            while (isValueContinued(i)) {
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

        // Grouped properties
        if (key.match(/\./)) {
            var arr = key.split('.');
            key = arr[1];
            namespace = arr[0];
        }

        var newValue = {
            value: value
        };
        if (Object.keys(meta).length) {
            newValue.meta = meta;
        }
        if (namespace) {
            newValue.namespace = namespace;
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
    var lines = [PREFIX],
        line = '';

    Object.keys(data).forEach(function (key) {
        data[key].forEach(function (value) {
            line = '';
            if (value.namespace) {
                line += value.namespace + '.';
            }
            line += key.toUpperCase();

            if (value.meta) {
                Object.keys(value.meta).forEach(function (metaKey) {
                    value.meta[metaKey].forEach(function (metaValue) {
                        line += ';' + metaKey.toUpperCase() + '=' + metaValue;
                    });
                });
            }

            line += ':';

            if (typeof value.value === 'string') {
                line += value.value;
            } else {
                line += value.value.join(';');
            }

            if (line.length > 75) {
                var firstChunk = line.substr(0, 75),
                    least = line.substr(75);
                var splitted = least.match(/.{1,74}/g);
                lines.push(firstChunk);
                splitted.forEach(function (chunk) {
                    lines.push(' ' + chunk);
                })
            } else {
                lines.push(line);
            }
        });
    });

    lines.push(POSTFIX);
    return lines.join('\r\n');
}

module.exports = {
    parse: parse,
    generate: generate
};
