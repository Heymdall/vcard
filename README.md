vcard
=====

Simple js vCard parser/generator.

Example usage:
```javascript
var rawCard = 'BEGIN:VCARD\n' +
               'VERSION:3.0\n' +
               'N:;Alex;;;\n' +
               'UID:3a43f748-050f-40a3-a47f-9aab0cf9b36e@178.62.218.194\n' +
               'REV:2014-12-10T14:15:16+00:00\n' +
               'FN:Alex\n' +
               'PRODID:-//ownCloud//NONSGML Contacts 0.3.0.18//EN\n' +
               'ORG:ASD\n' +
               'TEL;TYPE=HOME:12345678900\n' +
               'BDAY;VALUE=DATE:2014-12-01\n' +
               'END:VCARD\n'';

var card = VCard.parse(rawCard);
card.properties.org = 'GitHub';
rawCard = card.getCard();
```
