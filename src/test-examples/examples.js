import getJson from './getJson';

/**
 *       q (x2, y2)
 *      /|
 *     / |
 *    /  |
 *   /___|
 * p (x1, y1)
 *
 * @param {ICoordination} p
 * @param {ICoordination} q
 */
export function getDistance (p, q) {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const distance = Math.sqrt((dx ** 2) + (dy ** 2));
  return distance;
}

/**
 * Used in `addTax()`.
 * @type {number}
 */
export const taxRate = 0.08;

/**
 * @param {number} price
 */
export function addTax (price) {
  return price + price * taxRate;
}

/**
 * @param {string} source
 */
export function capitalize (source) {
  const initial = source[0] || ''; // 'alpha' -> 'a'
  const rest = source.slice(1); // 'alpha' -> 'lpha'
  const capitalized = `${initial.toUpperCase()}${rest}`;
  return capitalized;
}

export function snakeToCamel (source) {
  const [head, ...words] = source.split('_');
  const result = `${head}${words.map((v) => capitalize(v)).join('')}`;
  return result;
}

/**
 * @param {number} ms
 * @returns {Promise<any>}
 */
export function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} s
 * @param {number} n
 * @param {(error: Error | null, result?: any) => void} callback
 */
export function doSomethingOld (s, n, callback) {
  sleep(1).then(() => {
    if (s === 'error') {
      callback(new Error('wow'));
      return;
    }

    const result = s + String(n);
    callback(null, result);
  });
}

/**
 * @param {string} s
 * @param {number} n
 */
export async function doSomething (s, n) {
  await sleep(1000);
  // throw new Error('wow');
  return s + String(n);
}

/**
 * Returns a new function which will postpone its execution
 * until after specified time have elapsed.
 * The function respects parameters and context.
 * @param {(...args: any[]) => void} fn
 * @param {number} delay In milliseconds.
 * @returns {(this: any, ...args: any[]) => void}
 * @example
 * const f0 = (n) => console.log(n);
 * const f1 = debounce(f0);
 * f1(1); // skipped
 * f1(2); // skipped
 * f1(3); // invoked later
 */
export function debounce (fn, delay = 500) {
  let tm = 0;
  return function f (...args) {
    window.clearTimeout(tm);
    tm = window.setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * @param {string} userName
 */
export async function getGitHubIcon (userName) {
  const url = `https://api.github.com/users/${userName}`;
  const json = await getJson(url);
  const iconUrl = json.avatar_url;
  return iconUrl;
}
