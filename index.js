var firebase = require("firebase");
var save = require("./save");
var dateFormat = require('dateformat');

firebase.initializeApp({
  serviceAccount: "alpha-keys.json",
  databaseURL: "https://alpha-53c0d.firebaseio.com"
});

var now = new Date();
var nowString = dateFormat(now, "d mmmm yyyy");
console.log(nowString);

var db = firebase.database();
var ref = db.ref("tasks");
ref.orderByChild("nextDate").once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var task = childSnapshot.val();
    var taskRef = childSnapshot.ref;

    if (task.nextDate == nowString) {
      // TODO move to after save
      // taskRef.update({
      //   nextDate: "3 October 2016"
      // });
      save.saveExpense(db, task);
      // console.log("YES");
      // console.log(task.frequency);
      // var nextDate = dateFormat(task.nextDate, "d mmmm yyyy");

      // var days = 30
      //
      // switch (task.frequency) {
      //   case "M":
      //     days = 30;
      //     break;
      //   case "W":
      //     days = 14;
      //     break;
      //   case "2W":
      //     days = 14;
      //     break;
      //   default:
      //     break;
      // }
      //
      // now.setTime(now.getTime() + days * 86400000 );
      // var newNextDate = dateFormat(now,  "d mmmm yyyy");
      // console.log("nextDate new .. " + newNextDate );
      //
      // console.log("month: " + dateFormat(now, "mmmm"));
      // console.log("week: " + dateFormat(now, "W"));

    } else {
      console.log("NO");
      // console.log(task.nextDate);
      // // TEST date options
      // var date = dateFormat(task.nextDate, "d mmmm yyyy");
      // console.log(date);

    }
  });

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


// var postsRef = db.ref("tasks");
//
// var newPostRef = postsRef.push();
// newPostRef.set({
//   expense: "icloud 200GB",
//   amount: 2.99,
//   startDate: "20 September 2015",
//   nextDate: "3 September 2016",
//   endDate: "30 August 2019",
//   frequecy: "M"
// });


// .replace(/"/g,"")
