import { readableDate } from '../misc';

function generateId () {
  return `${Date.now()}${String(Math.random()).slice(2)}`;
}

/**
 * @param {IAccountRecord[]} records
 * @param {IAccountRecord} record
 */
export function findIndex (records, record) {
  const index = records.findIndex((v) => v.id === record.id);
  if (index < 0) {
    throw new Error('Record must be listed');
  }
  return index;
}

/**
 * @param {IAccountRecord} record
 */
export function isValid (record) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
    return false;
  }

  if (record.category === '') {
    return false;
  }

  return true;
}

/**
 * @param {IAccountRecord[]} records
 */
export function sort (records) {
  records.sort((r1, r2) => r1.date.localeCompare(r2.date));
  return records;
}

/**
 * @param {IAccountRecord[]} records
 * @param {IAccountRecord} record
 */
export function add (records, record) {
  if (record.id) {
    throw new Error('New record must not have ID');
  }

  if (!isValid(record)) {
    throw new Error('Invalid record');
  }

  // eslint-disable-next-line no-param-reassign
  record.id = generateId();
  const newRecords = [...records];
  newRecords.push(record);
  sort(newRecords);
  return newRecords;
}

/**
 * @param {IAccountRecord[]} records
 * @param {IAccountRecord} record
 */
export function update (records, record) {
  if (!isValid(record)) {
    throw new Error('Invalid record');
  }

  const newRecords = [...records];
  const index = findIndex(newRecords, record);
  newRecords.splice(index, 1, record);
  sort(newRecords);
  return newRecords;
}

/**
 * @param {IAccountRecord[]} records
 * @param {IAccountRecord} record
 */
export function remove (records, record) {
  const newRecords = [...records];
  const index = findIndex(newRecords, record);
  newRecords.splice(index, 1);
  return newRecords;
}

export function createEmpty () {
  /** @type {IAccountRecord} */
  const record = {
    amount: 0,
    category: '',
    date: readableDate(new Date()),
    id: '',
  };
  return record;
}
