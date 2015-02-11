var vCard = require('../src/vcard').vCard;

describe('vCard.generate', function () {
    var PREFIX = 'BEGIN:VCARD',
        POSTFIX = 'END:VCARD';

    it('Should generate vcard with simple property', function () {
        var card = {
            fn: [{value: 'Forest Gump'}]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'FN:Forest Gump',
            POSTFIX
        ].join('\r\n'));
    });

    it('Should generate vcard with complex property', function () {
        var card = {
            n: [{
                value: [
                    'Gump', 'Forrest', '', 'Mr.', ''
                ]
            }]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'N:Gump;Forrest;;Mr.;',
            POSTFIX
        ].join('\r\n'));
    });


    it('Should generate vcard with repeated properties', function () {
        var card = {
            fn: [
                {value: 'Forrest Gump'},
                {value: 'Other Gump'}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'FN:Forrest Gump',
            'FN:Other Gump',
            POSTFIX
        ].join('\r\n'));
    });

    it('Should generate vcard with metadata', function () {
        var card = {
            tel: [
                {value: '78884545247', meta: {type: ['HOME']}}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'TEL;TYPE=HOME:78884545247',
            POSTFIX
        ].join('\r\n'))
    });

    it('Should generate vcard with multiple metadata', function () {
        var card = {
            tel: [
                {value: '78884545247', meta: {type: ['HOME'], pref: ['1']}}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'TEL;TYPE=HOME;PREF=1:78884545247',
            POSTFIX
        ].join('\r\n'));
    });

    it('Should generate vcard with multiple values of one metadata field', function () {
        var card = {
            tel: [
                {value: '78884545247', meta: {type: ['HOME', 'CELL']}}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'TEL;TYPE=HOME;TYPE=CELL:78884545247',
            POSTFIX
        ].join('\r\n'));
    });

    it('Should generate vcard with namespace', function () {
        var card = {
            email: [
                {value: 'other@email.com', namespace: 'item1', meta: {type: ['INTERNET']}}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'item1.EMAIL;TYPE=INTERNET:other@email.com',
            POSTFIX
        ].join('\r\n'));
    });

    it('Should break long lines', function () {
        var card = {
            note: [
                {value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                'Doloremque dolores eum incidunt mollitia reiciendis sed sunt temporibus ' +
                'veniam veritatis voluptas.'}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'NOTE:Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque d',
            ' olores eum incidunt mollitia reiciendis sed sunt temporibus veniam veritat',
            ' is voluptas.',
            POSTFIX
        ].join('\r\n'))
    });

    it('Should add version and uid field', function () {
        var string = vCard.generate({}, true),
            arr = string.split('\r\n');

        expect(arr[0]).toEqual(PREFIX);
        expect(arr[1]).toEqual('VERSION:3.0');
        expect(arr[2].indexOf('UID:')).toEqual(0);
        expect(arr[3]).toEqual(POSTFIX);
    });

    it('Should ignore undefined properties', function () {
        var card = {
            fn: undefined
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            POSTFIX
        ].join('\r\n'));
    });

    it('Should ignore properties with undefined values', function () {
        var card = {
            fn: [
                {value: undefined}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            POSTFIX
        ].join('\r\n'));
    });

    it('Should ignore properties with empty string values', function () {
        var card = {
            fn: [
                {value: ''}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            POSTFIX
        ].join('\r\n'));
    });

    it('Should ignore properties with array of empty values', function () {
        var card = {
            adr: [
                {value: ['','','','','','','']}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            POSTFIX
        ].join('\r\n'));
    });

    it('Should ignore wrong formatted properties', function () {
        var card = {
            fn: {value: 'Wrong formatted'}
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            POSTFIX
        ].join('\r\n'));
    });

    it('Should ignore wrong formatted meta properties', function () {
        var card = {
            tel: [
                {value: '78884545247', meta: 'string are not allowed here'}
            ],
            email: [
                {value: 'admin@example.com', meta: {type: 'string'}}
            ]
        };
        var string = vCard.generate(card);

        expect(string).toEqual([
            PREFIX,
            'TEL:78884545247',
            'EMAIL:admin@example.com',
            POSTFIX
        ].join('\r\n'));
    });
});
