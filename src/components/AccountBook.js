// @ts-check

import { htmlToDom, toSafeText } from '../misc';
import * as AccountRecord from '../models/AccountRecord';
import './AccountBook.css';
import template from './AccountBook.template';

export default class AccountBook {
  /**
   * @param {IAccountBookProps} options
   */
  constructor ({ el, initialRecords = [] }) {
    this._el = el;

    /** @type {IAccountBookState} */
    this._state = {
      editingRecord: AccountRecord.createEmpty(),
      records: initialRecords,
    };
    this._lastState = {};
    this._prepareElements();
  }

  /**
   * @param {Partial<IAccountBookState>} newState
   */
  setState (newState) {
    Object.keys(newState).forEach((key) => {
      this._state[key] = newState[key];
    });
    this._render();
  }

  submitRecordForm () {
    const record = this._getFormRecord();
    const valid = AccountRecord.isValid(record);

    if (!valid) {
      return;
    }

    if (record.id) {
      this.updateRecord(record);
    } else {
      this.addRecord(record);
    }
  }

  /**
   * @param {IAccountRecord} record
   */
  addRecord (record) {
    this.setState({
      editingRecord: AccountRecord.createEmpty(),
      records: AccountRecord.add(this._state.records, record),
    });
  }

  /**
   * @param {IAccountRecord} record
   */
  updateRecord (record) {
    this.setState({
      editingRecord: AccountRecord.createEmpty(),
      records: AccountRecord.update(this._state.records, record),
    });
  }

  /**
   * @param {IAccountRecord} record
   */
  editRecord (record) {
    this.setState({
      editingRecord: record,
    });
  }

  /**
   * @param {IAccountRecord} record
   */
  deleteRecord (record) {
    const baseMessage = 'Are you sure you want to delete this record?';
    const sRecord = `${record.date} $${record.amount} ${record.category}`;
    // eslint-disable-next-line no-alert
    const ok = window.confirm(`${baseMessage}\n${sRecord}`);
    if (ok) {
      this.setState({
        records: AccountRecord.remove(this._state.records, record),
      });
    }
  }

  _prepareElements () {
    const el = this._el;

    el.innerHTML = template;

    /** @type {HTMLFormElement} */
    this._elRecordForm = el.querySelector('.AccountBook-form');
    this._elRecordForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitRecordForm();
    });

    /** @type {HTMLInputElement} */
    this._elRecordFormId = el.querySelector('.AccountBook-idInput');

    /** @type {HTMLInputElement} */
    this._elRecordFormDate = el.querySelector('.AccountBook-dateInput');
    this._elRecordFormDate.addEventListener(
      'change',
      () => this._validateForm(),
    );

    /** @type {HTMLInputElement} */
    this._elRecordFormAmount = el.querySelector('.AccountBook-amountInput');
    this._elRecordFormAmount.addEventListener(
      'change',
      () => this._validateForm(),
    );

    /** @type {HTMLInputElement} */
    this._elRecordFormCategory = el.querySelector('.AccountBook-categoryInput');
    this._elRecordFormCategory.addEventListener(
      'input',
      () => this._validateForm(),
    );

    /** @type {HTMLButtonElement} */
    this._elRecordFormAdd = el.querySelector('.AccountBook-add');

    /** @type {HTMLButtonElement} */
    this._elRecordFormUpdate = el.querySelector('.AccountBook-update');

    /** @type {HTMLButtonElement} */
    this._elRecordFormCancel = el.querySelector('.AccountBook-cancel');
    this._elRecordFormCancel.addEventListener('click', () => {
      this.setState({
        editingRecord: AccountRecord.createEmpty(),
      });
    });

    /** @type {HTMLTableSectionElement} */
    this._elTableBody = el.querySelector('.AccountBook-tableBody');

    this._render();
  }

  _render () {
    this._renderForm();
    this._renderTable();

    this._validateForm();
  }

  _renderForm () {
    const record = this._state.editingRecord;
    if (this._lastState.editingRecord === record) {
      return;
    }
    this._lastState.editingRecord = record;

    this._elRecordForm.dataset.new = String(!record.id);
    this._elRecordFormId.value = record.id;
    this._elRecordFormDate.value = record.date;
    this._elRecordFormAmount.value = record.amount.toFixed(2);
    this._elRecordFormCategory.value = record.category;

    this._elRecordFormAmount.select();
  }

  _renderTable () {
    const { records } = this._state;
    if (this._lastState.records === records) {
      return;
    }
    this._lastState.records = records;

    const body = this._elTableBody;
    body.innerHTML = '';

    if (records.length < 1) {
      const elRow = htmlToDom(`
        <tr>
          <td colspan="4">(No records found)</td>
        </tr>
      `, 'tbody');
      body.appendChild(elRow);
      return;
    }

    records.forEach((record) => {
      const elRow = this._renderAccounrRow(record);
      if (elRow) {
        elRow.querySelector('.AccountBook-editRecord').addEventListener(
          'click',
          () => this.editRecord(record),
        );
        elRow.querySelector('.AccountBook-deleteRecord').addEventListener(
          'click',
          () => this.deleteRecord(record),
        );

        body.appendChild(elRow);
      }
    });
  }

  /**
   * @param {IAccountRecord} record
   */
  _renderAccounrRow (record) {
    const html = `
      <tr
        data-key="${record.id}"
      >
        <td class="AccountBook-dateCell">${toSafeText(record.date)}</td>
        <td class="AccountBook-amountCell">${record.amount.toFixed(2)}</td>
        <td class="AccountBook-categoryCell">${toSafeText(record.category)}</td>
        <td class="AccountBook-operationsCell">
          <button
            class="AccountBook-editRecord"
          >
            Edit
          </button>
          <button
            class="AccountBook-deleteRecord"
          >
            Delete
          </button>
        </td>
      </tr>
    `;

    const el = htmlToDom(html, 'tbody');
    return el;
  }

  _validateForm () {
    const record = this._getFormRecord();
    const valid = AccountRecord.isValid(record);
    this._elRecordForm.dataset.valid = String(valid);

    this._elRecordFormAdd.disabled = !valid;
    this._elRecordFormUpdate.disabled = !valid;
  }

  _getFormRecord () {
    /** @type {IAccountRecord} */
    const record = {
      id: this._elRecordFormId.value,
      amount: Number(this._elRecordFormAmount.value),
      category: this._elRecordFormCategory.value,
      date: this._elRecordFormDate.value,
    };
    return record;
  }
}
