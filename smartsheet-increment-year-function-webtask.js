'use strict'
module.exports = function (ctx, cb) {
  const client = require('smartsheet');
  const smartsheet_access_token = "token_goes_here"; 
  const smartsheet = client.createClient({ accessToken: smartsheet_access_token });
  const sheetId = "sheet_id_here";
  const dateColumnName = "Birthday"; // your date column you want incremented
  let dateColumnId = 0;
  let today = new Date();
  let weekAgo = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7);

       // get sheet
      smartsheet.sheets.getSheet({ id: sheetId }).then(function(sheet) {
          // for each column title listed in the dateColumnNames array, get the columnId for that column and add it to the dateColumnIds array.
          sheet.columns.
            filter((column) => dateColumnName === column.title).
            map((column) => dateColumnId = column.id);

          const rowsToUpdate = sheet.rows.map((row) => { 
              return {
                  id: row.id,
                  cells: row.cells.
                      filter((cell) => dateColumnId === cell.columnId && new Date(cell.value) < weekAgo).
                      map((cell) => {
                          var columnValueDate = new Date(cell.value);
                          cell.value = new Date(columnValueDate.setFullYear(columnValueDate.getFullYear() + 1))
                          return cell;
                      })
              };
          }).filter((row) => row.cells && row.cells.length > 0);
          // build options object to send as part of the update request for smartsheet
          var options = {
              "sheetId": sheetId,
              "body": rowsToUpdate
          };
          // send updateRow request to Smartsheet
         smartsheet.sheets.updateRow(options).then(function (data) {
             console.log('updateRow: '+ JSON.stringify(data));
              cb();
         })
         .catch(function (error) {
             console.log(error);
              cb();
         });
      });
  };