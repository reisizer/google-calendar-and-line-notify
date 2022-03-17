function dailyEventMessage() {
  var googleCalendarId = "google calendar id";
  
  var calendar = CalendarApp.getCalendarById(googleCalendarId);
  var today = new Date();
  //var today2 = new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
  var today2 = new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"})
  var dailyEventList = calendar.getEventsForDay(today);

  //Logger.log(today)
  //Logger.log(today2)

  Logger.log(dailyEventList);
  
  var message = "";
  
  for (var i = 0; i < dailyEventList.length; i++) {
  
    var eventTitle = "หัวเรื่อง: " + " " + dailyEventList[i].getTitle();
    //var eventTime = "เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
    var eventTime = "เวลา: " + " " + dailyEventList[i].getStartTime().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"});
    var eventDescription = "คำอธิบาย: " + " " + dailyEventList[i].getDescription() + " \n ";
    
    message += "\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    
  }
  
  if (message !== "") {
    
    Logger.log(message);
    sendMessage(message);
    
  }
}

function tomorrowEventMessage() {
  var googleCalendarId = "google calendar id";
  
  var calendar = CalendarApp.getCalendarById(googleCalendarId);
  var today = new Date();
  var tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
  var tomorrowEventList = calendar.getEventsForDay(tomorrow);
  
  //Logger.log(tomorrowEventList);
  
  var message = "ตารางงาน พรุ่งนี้";
  
  for (var i = 0; i < tomorrowEventList.length; i++) {
  
    var eventTitle = "หัวเรื่อง: " + " " + tomorrowEventList[i].getTitle();
    var eventTime = "เวลา: " + " " + tomorrowEventList[i].getStartTime().toTimeString().slice(0,8);
    var eventDescription = "คำอธิบาย: " + " " + tomorrowEventList[i].getDescription();
    
    message += "\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    
  }
  
  if (message !== "") {
    
    Logger.log(message);
    sendMessage(message);
    
  }
}


function sendMessage(message) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = "line notify token";
  var formData = {
    "message": message
  };
  
  var options = {
    "headers" : {"Authorization" : "Bearer " + accessToken},
    "method" : 'post',
    "payload" : formData
  };

  try {
    var response = UrlFetchApp.fetch(lineNotifyEndPoint, options);
  }
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
    
  if (response.getResponseCode() !== 200) {
    Logger.log("Sending message failed.");
  } 
}
