vcard
=====

Simple js vCard parser

Example usage:
```javascript
var card = VCard.parse(rawCard);
card.properties.org = 'GitHub';
rawCard = card.getCard();
```
