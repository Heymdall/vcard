var VCard = require('../src/vcard').VCard,
    fs = require('fs');

describe('vCard', function () {
    var cardRaw1, cardRaw2, cardRaw3, cardRaw4;
    var card1, card2, card3, card4;
    beforeEach(function () {
        cardRaw1 = fs.readFileSync(__dirname + '/card1.vcf', {encoding: 'utf8'});
        cardRaw2 = fs.readFileSync(__dirname + '/card2.vcf', {encoding: 'utf8'});
        cardRaw3 = fs.readFileSync(__dirname + '/card3.vcf', {encoding: 'utf8'});
        cardRaw4 = fs.readFileSync(__dirname + '/card4.vcf', {encoding: 'utf8'});

        card1 = VCard.parse(cardRaw1);
        card2 = VCard.parse(cardRaw2);
        card3 = VCard.parse(cardRaw3);
        card4 = VCard.parse(cardRaw4);
    });


    it('Card 1 should be parsed', function () {
        var expected = {
            "version": "3.0",
            "n": ";Alex;;;",
            "uid": "3a43f748-050f-40a3-a47f-9aab0cf9b36e@178.62.218.194",
            "rev": "2014-12-10T14:15:16+00:00",
            "fn": "Alex",
            "prodid": "-//ownCloud//NONSGML Contacts 0.3.0.18//EN",
            "org": "ASD",
            "tel": [{"meta": {"type": "home"}, "value": ["79108880700"]}],
            "bday": [{"meta": {"value": "date"}, "value": ["2014-12-01"]}]
        };
        Object.keys(expected).forEach(function (property) {
            expect(card1[property]).toEqual(expected[property]);
        });
    });

    it('Card 2 should be parsed', function () {
        var expected = {
            "version": "3.0",
            "n": ";Contact;;;",
            "uid": "edaf8afa-11c9-43a2-b17e-dbf4af9d6473@178.62.218.194",
            "rev": "2014-12-10T14:20:20+00:00",
            "fn": "Contact",
            "prodid": "-//ownCloud//NONSGML Contacts 0.3.0.18//EN",
            "org": "Some",
            "tel": [{"meta": {"type": "home"}, "value": ["78987854546"]}],
            "nickname": "SomeNick",
            "url": [{"meta": {"type": "work"}, "value": ["akitov.info"]}],
            "title": "Super title",
            "impp": [{"meta": {"x-service-type": "skype"}, "value": ["skype:kitov.nn"]}],
            "adr": [{
                "meta": {"type": "work"},
                "value": ["", "", "Kovaliha", "Nizhniy Novgorod", "Nizhegorodsk", "603006", "Россия"]
            }],
            "note": "Long note about contact"
        };
        Object.keys(expected).forEach(function (property) {
            expect(card2[property]).toEqual(expected[property]);
        });
    });

    it('Card 3 should be parsed', function () {
        var expected = {
            "version": "3.0",
            "n": "Gump;Forrest;;Mr.",
            "fn": "Forrest Gump",
            "org": "Bubba Gump Shrimp Co.",
            "title": "Shrimp Man",
            "photo": [{
                "meta": {"value": "url", "type": "gif"},
                "value": ["http://www.example.com/dir_photos/my_photo.gif"]
            }],
            "tel": [{"meta": {"type": "work,voice"}, "value": ["(111) 555-1212"]}, {
                "meta": {"type": "home,voice"},
                "value": ["(404) 555-1212"]
            }],
            "adr": [{
                "meta": {"type": "work"},
                "value": ["", "", "100 Waters Edge", "Baytown", "LA", "30314", "United States of America"]
            }, {
                "meta": {"type": "home"},
                "value": ["", "", "42 Plantation St.", "Baytown", "LA", "30314", "United States of America"]
            }],
            "label": [{
                "meta": {"type": "work"},
                "value": ["100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America"]
            }, {
                "meta": {"type": "home"},
                "value": ["42 Plantation St.\\nBaytown, LA 30314\\nUnited States of America"]
            }],
            "email": [{"meta": {"type": "pref,internet"}, "value": ["forrestgump@example.com"]}],
            "rev": "2008-04-24T19:52:43Z"
        };
        Object.keys(expected).forEach(function (property) {
            expect(card3[property]).toEqual(expected[property]);
        });
    });

    it('Card 4 should be parsed', function () {
        var expected = {
            "version": "4.0",
            "n": "Bloggs;Joe;;;",
            "fn": "Joe Bloggs",
            "email": [{"meta": {"type": "home", "pref": "1"}, "value": ["me@joebloggs.com"]}],
            "tel": [{"meta": {"type": "\"cell,home\"", "pref": "1"}, "value": ["tel:+44 20 1234 5678"]}],
            "adr": [{
                "meta": {"type": "home", "pref": "1"},
                "value": ["", "", "1 Trafalgar Square", "London", "", "WC2N", "United Kingdom"]
            }],
            "url": [{"meta": {"type": "home", "pref": "1"}, "value": ["http://joebloggs.com"]}],
            "impp": [{"meta": {"type": "home", "pref": "1"}, "value": ["skype:joe.bloggs"]}],
            "x-socialprofile": [{
                "meta": {"type": "home", "pref": "1"},
                "value": ["twitter:http://twitter.com/joebloggs"]
            }]
        };

        Object.keys(expected).forEach(function (property) {
            expect(card4[property]).toEqual(expected[property]);
        });
    });

    it('Card 1 should be converted to vCard', function () {
        var raw = card1.getCard(),
            lines = raw.split('\n'),
            originalLines = cardRaw1.split('\n');

        lines.forEach(function (line) {
            expect(originalLines).toContain(line)
        });
        originalLines.forEach(function (line) {
            expect(lines).toContain(line)
        });
    });

    it('Card 2 should be converted to vCard', function () {
        var raw = card2.getCard(),
            lines = raw.split('\n'),
            originalLines = cardRaw2.split('\n');

        lines.forEach(function (line) {
            expect(originalLines).toContain(line)
        });
        originalLines.forEach(function (line) {
            expect(lines).toContain(line)
        });
    });

    it('Card 3 should be converted to vCard', function () {
        var raw = card3.getCard(),
            lines = raw.split('\n'),
            originalLines = cardRaw3.split('\n');

        lines.forEach(function (line) {
            expect(originalLines).toContain(line)
        });
        originalLines.forEach(function (line) {
            expect(lines).toContain(line)
        });
    });

    it('Card 4 should be converted to vCard', function () {
        var raw = card4.getCard(),
            lines = raw.split('\n'),
            originalLines = cardRaw4.split('\n');

        lines.forEach(function (line) {
            expect(originalLines).toContain(line)
        });
        originalLines.forEach(function (line) {
            expect(lines).toContain(line)
        });
    });
});
