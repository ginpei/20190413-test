import AccountBook from './AccountBook';

describe('AccountBook', () => {
  /** @type AccountBook */
  let accountBook;

  /** @type HTMLDivElement */
  let el;

  /** @type HTMLFormElement */
  let elForm;

  /**
   * @param {Partial<IAccountRecord>} record
   */
  function fillForm (record) {
    /** @type {HTMLInputElement} */
    const elId = el.querySelector('.AccountBook-idInput');
    elId.value = record.id || '';

    /** @type {HTMLInputElement} */
    const elDate = el.querySelector('.AccountBook-dateInput');
    elDate.value = record.date || '';

    /** @type {HTMLInputElement} */
    const elAmount = el.querySelector('.AccountBook-amountInput');
    elAmount.value = record.amount ? record.amount.toFixed(2) : '';

    /** @type {HTMLInputElement} */
    const elCategory = el.querySelector('.AccountBook-categoryInput');
    elCategory.value = record.category || '';

    elCategory.dispatchEvent(new Event('input'));
  }

  function getRenderedRecords () {
    const elRows = [...el.querySelectorAll('tbody tr')];
    const recordTextList = elRows.map((v) => {
      const elCells = [...v.querySelectorAll('td')];
      return elCells
        .slice(0, 3) // remove buttons
        .map((w) => w.textContent.trim());
    });
    return recordTextList;
  }

  /**
   * @param {IAccountRecord[]} [initialRecords]
   */
  function prepareWithRecords (initialRecords) {
    el = window.document.createElement('div');
    accountBook = new AccountBook({ el, initialRecords });

    elForm = el.querySelector('.AccountBook-form');
  }

  describe('form', () => {
    describe('for new', () => {
      beforeEach(() => {
        prepareWithRecords();
      });

      describe('with valid input', () => {
        beforeEach(() => {
          fillForm({
            amount: 12.34,
            category: 'Category 1',
            date: '2000-01-01',
          });
        });

        it('activates add button', () => {
          /** @type {HTMLButtonElement} */
          const elAdd = elForm.querySelector('.AccountBook-add');
          expect(elAdd.disabled).toBeFalsy();
        });

        it('adds a new record', () => {
          elForm.dispatchEvent(new Event('submit'));

          const recordTextList = getRenderedRecords();
          expect(recordTextList).toHaveLength(1);
          expect(recordTextList[0]).toEqual([
            '2000-01-01',
            '12.34',
            'Category 1',
          ]);
        });
      });

      describe('with invalid input', () => {
        beforeEach(() => {
          fillForm({
            amount: 12.34,
            category: '',
            date: '2000-01-01',
          });
        });

        it('does not activate add button', () => {
          /** @type {HTMLButtonElement} */
          const elAdd = elForm.querySelector('.AccountBook-add');
          expect(elAdd.disabled).toBeTruthy();
        });

        it('does not add if invalid', () => {
          elForm.dispatchEvent(new Event('submit'));

          const recordTextList = getRenderedRecords();
          expect(recordTextList[0]).toEqual(['(No records found)']);
        });
      });
    });

    describe('for existing', () => {
      /** @type {IAccountRecord[]} */
      let records;

      beforeEach(() => {
        records = [
          {
            amount: 12.34,
            category: 'Category 1',
            date: '2000-01-01',
            id: '101',
          },
        ];
        prepareWithRecords(records);
      });

      describe('with valid input', () => {
        beforeEach(() => {
          fillForm({
            ...records[0],
            category: 'Updated',
          });
        });

        it('activates update button', () => {
          /** @type {HTMLButtonElement} */
          const elUpdate = elForm.querySelector('.AccountBook-update');
          expect(elUpdate.disabled).toBeFalsy();
        });

        it('updates the record', () => {
          elForm.dispatchEvent(new Event('submit'));

          const recordTextList = getRenderedRecords();
          expect(recordTextList).toHaveLength(1);
          expect(recordTextList[0]).toEqual([
            '2000-01-01',
            '12.34',
            'Updated',
          ]);
        });
      });

      describe.skip('with invalid input', () => {
      });
    });
  });

  describe.skip('table', () => {
    it('shows empty message', () => {});
  });
});
