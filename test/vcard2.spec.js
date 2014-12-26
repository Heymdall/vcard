var vCard = require('../src/vcard2'),
    util = require('util'),
    fs = require('fs');

describe('vcard2', function () {
    var cardRaw1, cardRaw2, cardRaw3, cardRaw4;
    var card1, card2, card3, card4;
    beforeEach(function () {
        cardRaw1 = fs.readFileSync(__dirname + '/card1.vcf', {encoding: 'utf8'});
        cardRaw2 = fs.readFileSync(__dirname + '/card2.vcf', {encoding: 'utf8'});
        cardRaw3 = fs.readFileSync(__dirname + '/card3.vcf', {encoding: 'utf8'});
        cardRaw4 = fs.readFileSync(__dirname + '/example.vcf', {encoding: 'utf8'});

        card1 = vCard.parse(cardRaw1);
        card2 = vCard.parse(cardRaw2);
        card3 = vCard.parse(cardRaw3);
        card4 = vCard.parse(cardRaw4);
    });

    it('Should parse simple vcard', function () {
        var expected = {
            n: [{value: ['', 'Alex', '', '', '']}],
            fn: [{value: 'Alex'}],
            uid: [{value: '3a43f748-050f-40a3-a47f-9aab0cf9b36e@178.62.218.194'}]
        };

        Object.keys(expected).forEach(function (property) {
            expect(card1[property]).toEqual(expected[property]);
        });
    });

    it('Should parse vcard with meta attributes', function () {
        var expected = {
            tel: [{value: '78987854546', meta: {type: ['HOME']}}],
            url: [{value: 'akitov.info', meta: {type: ['WORK']}}],
            impp: [{value: 'skype', meta: {'x-service-type': ['SKYPE']}}]
        };

        Object.keys(expected).forEach(function (property) {
            expect(card2[property]).toEqual(expected[property]);
        });
    })
});
