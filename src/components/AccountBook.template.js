export default `
  <div class="AccountBook">
    <div class="AccountBook-header">
      <div class="container">
        <form class="AccountBook-form" data-new="true">
          <input class="AccountBook-idInput" type="hidden">
          <input class="AccountBook-dateInput" type="date">
          <span class="AccountBook-amountPrefix">$</span>
          <input
            class="AccountBook-amountInput"
            min="0"
            placeholder="0"
            step="0.01"
            type="number"
          >
          <input
            class="AccountBook-categoryInput"
            placeholder="外食"
            type="text"
          >
          <button class="AccountBook-add">Add</button>
          <button class="AccountBook-update">Update</button>
          <button class="AccountBook-cancel" type="button">Cancel</button>
        </form>
      </div>
    </div>
    <div class="AccountBook-body">
      <div class="container">
        <table class="AccountBook-table">
          <thead>
            <tr>
              <th class="AccountBook-dateCell">Date</th>
              <th class="AccountBook-amountCell">$</th>
              <th class="AccountBook-categoryCell">Category</th>
              <th class="AccountBook-operationsCell"></th>
            </tr>
          </thead>
          <tbody class="AccountBook-tableBody"></tbody>
        </table>
      </div>
    </div>
  </div>
`;
