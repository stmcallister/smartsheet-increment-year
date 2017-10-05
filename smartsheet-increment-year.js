var client = require('Smartsheet');
var token = "your_token_here"; 
var smartsheet = client.createClient({ accessToken: token });
var sheetId = "your_sheet_id_here"; // your sheetId goes here
var dateColumnName = "Birthday"; // your date columns you want incremented
var dateColumnIds = 0;
var rowsToUpdate = [];
var weekAgo = new Date(new Date().setDate(new Date().getDate()-7)); // increasing the buffer to a week to account for differing dates and times across systems

function incrementYear(sheetId) {
    // get sheet
    smartsheet.sheets.getSheet({ id: sheetId }).then(function(sheet) {
        // for each column title listed in the dateColumnNames array, get the columnId for that column and add it to the dateColumnIds array.
        for (var i = 0; i < sheet.columns.length; i++) {
            if (sheet.columns[i].title == dateColumnName) {
                dateColumnIds.push(sheet.columns[i].id);
            }
        }
        // loop the rows in the sheet
          for (var r = 0; r < sheet.rows.length; r++) {
            var row = {
                    "id": sheet.rows[r].id,
                    "cells": []
                };
            // loop the cells in the row
            for (var c = 0; c < sheet.rows[r].cells.length; c++) {
                for (var x = 0; x < dateColumnIds.length; x++) {
                    // for each cell with a columnId that matches a dateColumnId check the value of the date
                    if (sheet.rows[r].cells[c].columnId == dateColumnIds[x]) {
                        var columnValueDate = new Date(sheet.rows[r].cells[c].value);
                        
                        // if the date value is in the past, increment the year   
                        if (columnValueDate < weekAgo) {
                            // set the value to new year
                            var newDate = new Date(columnValueDate.setFullYear(columnValueDate.getFullYear() + 1));
                            // create a cell object for updating the sheet
                            var cell = {
                                "columnId": sheet.rows[r].cells[c].columnId,
                                "value": newDate
                            };
                            // add the cell object to updated row object
                            row.cells.push(cell);
                        }
                    }
                }
            }
            // if the row contains cells add the row to the rowsToUpdate array
            if (row.cells.length > 0) {
                rowsToUpdate.push(row);
            }
        }
        // build options object to send as part of the update request for smartsheet
        var options = {
            "sheetId": sheetId,
            "body": rowsToUpdate
        };
        // send updateRow request to Smartsheet
       smartsheet.sheets.updateRow(options).then(function (data) {
           console.log('updateRow: '+ JSON.stringify(data));
       })
       .catch(function (error) {
           console.log(error);
       });
    });
};

// execute script
incrementYear(sheetId);
