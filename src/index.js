import AccountBook from './components/AccountBook';
import dummyRecords from './testMocks/dummyAccountRecords';
import './index.css';

const el = document.querySelector('#root');
// eslint-disable-next-line no-new
new AccountBook({ el, initialRecords: dummyRecords });
