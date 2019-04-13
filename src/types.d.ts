interface IAccountBookProps {
  el: Element;
  initialRecords?: IAccountRecord[];
}

interface IAccountBookState {
  editingRecord: IAccountRecord;
  records: IAccountRecord[];
}

interface IAccountRecord {
  amount: number;
  category: string;
  date: string; // '2019-04-03'
  id: string;
}
