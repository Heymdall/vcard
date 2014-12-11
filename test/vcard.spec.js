var vCard = require('../src/vcard').VCard,
    fs = require('fs');

describe('vCard', function () {
    var cardRaw1, cardRaw2;
    var card1, card2;
    beforeEach(function () {
        cardRaw1 = fs.readFileSync(__dirname + '/card1.vcf', {encoding: 'utf8'});
        cardRaw2 = fs.readFileSync(__dirname + '/card2.vcf', {encoding: 'utf8'});

        card1 = vCard.parse(cardRaw1);
        card2 = vCard.parse(cardRaw2);
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
        expect(card1.properties).toEqual(expected);
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
        expect(card2.properties).toEqual(expected);
    });

    it('Card 1 should be converted to vCard', function () {
        var raw = card1.getCard();

        expect(raw).toEqual(cardRaw1);
    });

    it('Card 2 should be converted to vCard', function () {
        var raw = card2.getCard();

        expect(raw).toEqual(cardRaw2);
    });
});
