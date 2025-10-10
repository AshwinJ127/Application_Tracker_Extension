function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.company,
      data.link,
      data.status,
      new Date()
    ]);

    return ContentService.createTextOutput("Success");
  } catch (error) {
    // Log any errors for debugging
    Logger.log(error.toString());
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}