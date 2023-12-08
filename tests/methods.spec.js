import moment from 'moment';
import Pikaday from '../';

function createPikaday(options = {}) {
  const pikaday = new Pikaday(options);

  pikaday.useMoment(moment);

  return pikaday;
}

describe('Pikaday public method', () => {
  describe('#getDate()', () => {
    it('should return null if date not set', () => {
      expect(createPikaday().getDate()).toBe(null);
    });
  });

  describe('#toString()', () => {
    it('should return empty string when date not set', () => {
      expect(createPikaday().toString()).toBe('');
    });

    it('should return date string, formatted by moment, when date is set', () => {
      const date = new Date(2014, 3, 25);
      const pikaday = createPikaday({
        format: 'DD-MM-YY'
      });

      pikaday.setDate(date);

      expect(pikaday.toString()).toBe('25-04-14');
    });

    it('should use toString function if one is provided', function () {
        const date = new Date(2014, 3, 25),
        pikaday = createPikaday({
          toString: function(d) {
            const date = d.getDate();
            const month = d.getMonth() + 1;

            return 'custom: ' + date + '/' + month;
          }
        });

        pikaday.setDate(date);

        expect(pikaday.toString()).toBe('custom: 25/4');
    });

    it('should pass current format option to the toString function', function () {
      const date = new Date(2014, 3, 25);
      const expectedFormat = 'DD/MM/YYYY';
      let passedFormat;

      const pikaday = createPikaday({
        format: expectedFormat,
        toString: function(d, format) {
          passedFormat = format;

          return '';
        }
      });

      pikaday.setDate(date);
      pikaday.toString(); // invoke toString to set the passedFormat variable

      expect(passedFormat).toBe(expectedFormat);
    });

    it('should use parse function if one is provided', function () {
      const expectedDate = new Date(2017, 3, 6);
      const pikaday = createPikaday({
        parse: function() {
          return new Date(2017, 3, 6);
        }
      });

      // mock input field
      pikaday._o.field = {
        value: '',
        setAttribute: function() {},
        dispatchEvent: function() {},
      };
      pikaday._onInputChange({});

      expect(pikaday.getDate().getTime()).toBe(expectedDate.getTime());
    });

    it('should pass input value and current format to the parse function', function () {
      const expectedValue = 'test value';
      const expectedFormat = 'DD/MM/YYYY';
      let passedValue;
      let passedFormat;
      const pikaday = createPikaday({
        format: expectedFormat,
        parse: function(value, format) {
          passedValue = value;
          passedFormat = format;

          return new Date(2017, 3, 6);
        }
      });

      // mock input field
      pikaday._o.field = {
        value: expectedValue,
        setAttribute: function() {},
        dispatchEvent: function() {},
      };
      pikaday._onInputChange({});

      expect(passedValue).toBe(expectedValue);
      expect(passedFormat).toBe(expectedFormat);
    });
  });

  describe('When specifying minDate option in Constructor', function () {
    it('Should remove the time portion (flattening to midnight)', function () {
      const date = new Date(2015, 1, 17, 22, 10, 5);
      const expected = new Date(2015, 1, 17, 0, 0, 0);
      const pikaday = createPikaday({ minDate: date });

      expect(pikaday._o.minDate).toEqual(expected);
    });
  });

  describe('#setMinDate()', function () {
    it('should flatten date to midnight ignoring time portion (consistent with minDate option in ctor)', function () {
      const date = new Date(2015, 1, 17, 22, 10, 5);
      const expected = new Date(2015, 1, 17, 0, 0, 0);
      const pikaday = createPikaday();

      pikaday.setMinDate(date);

      expect(pikaday._o.minDate).toEqual(expected);
    });
  });

  describe('#render()', function() {
    it('starts with the correct week number according to ISO8601', function() {
      const pikaday = createPikaday({ showWeekNumber: true });

      expect(pikaday.render(2016, 0)).toMatch('<td class="pika-week">53</td>');
    });
  });
});
