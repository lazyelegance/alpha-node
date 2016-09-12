var firebase = require("firebase");
var save = require("./save");
var dateFormat = require('dateformat');
const config = require('./config');

firebase.initializeApp({
  serviceAccount: "alpha-keys.json",
  databaseURL: config.firebaseDb
});

var now = new Date();
var nowString = dateFormat(now, "d mmmm yyyy");

var db = firebase.database();
var ref = db.ref("tasks");
ref.orderByChild("nextDate").once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var task = childSnapshot.val();
    var taskRef = childSnapshot.ref;
    if (task.nextDate == nowString) {
      save.saveExpense(db, task);
      save.updateNextDate(taskRef, task);
    } else {
      console.log("NO");
    }
  });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
