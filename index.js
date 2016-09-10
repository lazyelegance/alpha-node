var firebase = require("firebase");
var saveExpense = require("./save");

firebase.initializeApp({
  serviceAccount: "alpha-keys.json",
  databaseURL: "https://alpha-53c0d.firebaseio.com"
});

var db = firebase.database();

var ref = db.ref("tasks");
ref.orderByChild("nextDate").once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var task = childSnapshot.val();
    console.log(task.nextDate);
    if (task.nextDate == "10 September 2016") {
      console.log(task.expense);
      var expensesRef = db.ref("expenses").child(task.userId);
      saveExpense.saveExpense(expensesRef, task);
    } else {
      console.log("NO");
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
