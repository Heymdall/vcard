(function (namespace) {
  function VCard(fields) {
    this.properties = {};
    Object.keys(fields).forEach(function (prop) {
      this.properties[prop] = fields[prop];
    }.bind(this));
  }

  /**
   * Возвращает VCard представление
   * @returns {string}
   */
  VCard.prototype.getCard = function () {
    var prefix = 'BEGIN:VCARD',
      postfix = 'END:VCARD',
      lines = [];

    lines.push(prefix);

    for (var prop in this.properties) {
      if (typeof this.properties[prop] === 'string') {
        lines.push(prop.toUpperCase() + ':' + this.properties[prop]);
      } else {
        this.properties[prop].forEach(function (property) {
          var meta = [];
          for (var metaName in property.meta) {
            meta.push(metaName.toUpperCase() + '=' + property.meta[metaName].toUpperCase());
          }
          lines.push(prop.toUpperCase() + ';' + meta.join(';') + ':' + property.value.join(';'));
        });
      }
    }

    lines.push(postfix);

    return lines.join("\n").trim();
  };

  /**
   * Разбирает VCard представление
   * @param {string} input Строка VCard
   * @param {string} url
   * @returns {VCard}
   */
  VCard.parse = function (input, url) {
    var Re1 = /^(version|fn|title|org|nickname|note|uid|n|rev|prodid):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase().trim();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase().trim();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z\-]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ['TYPE' + (i === 0 ? '' : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0].toLowerCase()] = p[1].toLowerCase();
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        });
      }
    });

    return new VCard(fields, url);
  };


  namespace.VCard = VCard;
})(typeof window !== 'undefined' ? window : module.exports);
