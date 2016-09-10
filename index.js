var firebase = require("firebase");
var save = require("./save");

firebase.initializeApp({
  serviceAccount: "alpha-keys.json",
  databaseURL: "https://alpha-53c0d.firebaseio.com"
});

var db = firebase.database();

var ref = db.ref("tasks");
ref.orderByChild("nextDate").once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var task = childSnapshot.val();
    var taskRef = childSnapshot.ref;

    //TODO move to after save
    if (task.nextDate == "3 September 2016") {
      taskRef.update({
        nextDate: "3 October 2016"
      });
      save.saveExpense(db, task);
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
