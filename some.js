var fs = require('fs'),
    util = require('util'),
    vcard = require('./src/vcard2');

var cardRaw = fs.readFileSync(__dirname + '/test/example.vcf', {encoding: 'utf8'});

var card = vcard.parse(cardRaw);

console.log(util.inspect(card, {showHidden: false, depth: null}));
