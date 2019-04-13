import * as https from 'https';
import { URL } from 'url';

/**
 * @param {string} url
 */
export default function getJson (url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      headers: {
        'User-Agent': 'Sample Node.js App',
      },
      host: urlObj.host,
      path: urlObj.pathname,
    };
    https.get(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error('Failed to access to API'));
      }

      let buffer = '';
      res.on('data', (chunk) => { buffer += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(buffer);
          resolve(json);
        } catch (error) {
          reject(new Error('Response is not in expected style'));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}
