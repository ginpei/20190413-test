import dummyAccountRecords from '../testMocks/dummyAccountRecords';
import * as AccountRecord from './AccountRecord';

describe('AccountRecord', () => {
  /** @type {IAccountRecord[]} */
  let records;

  /** @type {IAccountRecord} */
  let record;

  /** @type {IAccountRecord[]} */
  let result;

  /**
   * @param {IAccountRecord[]} array
   */
  function pluckId (array) {
    return array.map((v) => v.id);
  }

  beforeEach(() => {
    // clone deeply in order to avoid from accidental modification
    records = dummyAccountRecords.map((v) => {
      const cloned = Object.assign({}, v);
      return cloned;
    });
  });

  describe('findIndex()', () => {
    it('finds index even if different instances', () => {
      record = { ...records[1] };
      const index = AccountRecord.findIndex(records, record);
      expect(index).toBe(1);
    });

    it('throws if not includes', () => {
      record = AccountRecord.createEmpty();
      expect(() => {
        const index = AccountRecord.findIndex(records, record);
      }).toThrow('Record must be listed');
    });
  });

  describe('sort()', () => {
    it('sorts array', () => {
      records[1].date = '2000-01-01';
      AccountRecord.sort(records);
      expect(pluckId(records)).toEqual(['101', '100', '102', '103']);
    });

    it('returns the same array', () => {
      const sorted = AccountRecord.sort(records);
      expect(sorted).toBe(records);
    });
  });

  describe('add()', () => {
    describe('with new record', () => {
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(1230);
        jest.spyOn(Math, 'random').mockReturnValue(0.0789);

        record = {
          amount: 123.45,
          category: 'Category 1',
          date: '2000-01-01',
          id: '',
        };
        result = AccountRecord.add(records, record);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('adds a record', () => {
        expect(result.includes(record)).toBeTruthy();
      });

      it('creates and sets ID', () => {
        expect(record.id).toBe('12300789');
      });

      it('returns new array', () => {
        expect(result).not.toBe(records);
      });

      it('sorts result', () => {
        expect(pluckId(result)).toEqual([
          '12300789',
          '100',
          '101',
          '102',
          '103',
        ]);
      });
    });

    describe('with invalid ID', () => {
      it('throws', () => {
        record = {
          amount: 123.45,
          category: 'Category 1',
          date: '2000-01-01',
          id: '1',
        };

        expect(() => {
          AccountRecord.add(records, record);
        }).toThrow('New record must not have ID');
      });
    });

    describe('with invalid record', () => {
      it('throws', () => {
        record = {
          amount: 123.45,
          category: '',
          date: '2000-01-01',
          id: '',
        };

        expect(() => {
          AccountRecord.add(records, record);
        }).toThrow('Invalid record');
      });
    });
  });

  describe('update()', () => {
    describe('with valid record', () => {
      beforeEach(() => {
        record = {
          ...records[1],
          date: '2000-01-01',
        };
        result = AccountRecord.update(records, record);
      });

      it('updates the record', () => {
        expect(result[0].date).toBe('2000-01-01');
      });

      it('returns new array', () => {
        expect(result).not.toBe(records);
      });

      it('sorts result', () => {
        expect(pluckId(result)).toEqual(['101', '100', '102', '103']);
      });
    });

    describe('with invalid record', () => {
      it('throws', () => {
        record = {
          ...records[1],
          date: '',
        };

        expect(() => {
          AccountRecord.update(records, record);
        }).toThrow('Invalid record');
      });
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      record = {
        ...records[1],
      };
      result = AccountRecord.remove(records, record);
    });

    it('removes the record', () => {
      const found = result.find((v) => v.id === record.id);
      expect(found).toBe(undefined);
    });

    it('returns new array', () => {
      expect(result).not.toBe(records);
    });
  });

  describe('createEmpty()', () => {
    it('creates new record', () => {
      const r1 = AccountRecord.createEmpty();
      const r2 = AccountRecord.createEmpty();
      expect(r1).not.toBe(r2);
    });
  });
});
