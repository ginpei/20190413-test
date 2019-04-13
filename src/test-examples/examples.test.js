import * as examples from './examples';
import getJson from './getJson';

jest.mock('./getJson');

describe('test-examples', () => {
  describe('getDistance()', () => {
    it('returns distance', () => {
      /** @type {ICoordination} */
      const p = { x: 0, y: 0 };

      /** @type {ICoordination} */
      const q = { x: 300, y: 400 };

      const result = examples.getDistance(p, q);
      expect(result).toBe(500);
    });
  });

  describe('capitalize', () => {
    it('converts', () => {
      expect(examples.capitalize('alphabet')).toBe('Alphabet');
    });

    it('does not throw if empty', () => {
      expect(examples.capitalize('')).toBe('');
    });
  });

  describe('snakeToCamel', () => {
    it('converts', () => {
      expect(examples.snakeToCamel('foo_bar_boo')).toBe('fooBarBoo');
    });

    it('does not throw if empty', () => {
      expect(examples.snakeToCamel('')).toBe('');
    });
  });

  describe('debounce', () => {
    /** @type {jest.Mock} */
    let spy;

    /** @type {any} */
    let context;

    beforeEach(() => {
      jest.useFakeTimers();
      spy = jest.fn();
      context = {};

      const f = examples.debounce(spy, 100);
      f(11, 22);
      f(33, 44);
      f.call(context, 55, 66);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe('just after calls', () => {
      it('does not run immediately', () => {
        expect(spy).not.toBeCalled();
      });
    });

    describe('after the elapse', () => {
      beforeEach(() => {
        jest.advanceTimersByTime(100);
      });

      it('runs only once after interval', () => {
        expect(spy).toBeCalledTimes(1);
      });

      it('passes last parameters', () => {
        expect(spy).toBeCalledWith(55, 66);
      });

      it('respects context', () => {
        expect(spy.mock.instances[0]).toBe(context);
      });
    });
  });

  describe('getGitHubIcon', () => {
    beforeEach(() => {
      // eslint-disable-next-line global-require
      const json = require('./getGitHubIcon.json');

      // @ts-ignore
      getJson.mockReturnValue(json);
    });

    it('returns image file URL', async () => {
      const expected = 'https://avatars1.githubusercontent.com/u/355808?v=4';

      const result = await examples.getGitHubIcon('ginpei');
      expect(result).toBe(expected);
    });
  });
});
