/* eslint-disable import/prefer-default-export */

/**
 * @param {any} text
 */
export function toSafeText (text) {
  if (text === undefined) {
    return '';
  }

  return (String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  );
}

/**
 * @param {number} n
 */
export function zeroFill2 (n) {
  return `0${n}`.slice(-2);
}

/**
 * @param {string | number | Date} date
 */
export function readableDate (date) {
  const d = date instanceof Date ? date : new Date(date);
  const yyyy = d.getFullYear();
  const MM = zeroFill2(d.getMonth() + 1);
  const dd = zeroFill2(d.getDate());
  const sDate = `${yyyy}-${MM}-${dd}`;
  return sDate;
}

/**
 * @param {string} html
 */
export function htmlToDom (html, parentTagName = 'div') {
  const container = document.createElement(parentTagName);
  container.innerHTML = html;

  if (container.children.length !== 1) {
    throw new Error('HTML must be only 1 element');
  }

  const el = container.firstElementChild;
  if (el instanceof HTMLElement) {
    return el;
  }

  return null;
}
