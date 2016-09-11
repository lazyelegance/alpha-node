var firebase = require("firebase");
var dateFormat = require('dateformat');

var now = new Date();
var nowString = dateFormat(now, "d mmmm yyyy");

var month = dateFormat(now, "mmmm");
var week = dateFormat(now, "mmmm");
var day = dateFormat(now, "d");

var monthString = "m_" + dateFormat(now, "mmmm");
var weekString = "w_" + dateFormat(now, "mmmm");
var monthCounterString = "counter_m_" + dateFormat(now, "mmmm");
var weekCounterString = "counter_w_" + dateFormat(now, "mmmm");

function saveExpense(db, task) {
  var expensesRef = db.ref("expenses").child(task.userId);

  console.log(task);
  var newExpense = expensesRef.push();
  newExpense.set({
    description: task.expense,
    billAmount: task.amount,
    // dateAdded: task.
    category: task.category
  });

  var categoriesRef = expensesRef.child("categories").child(task.category);

  var categoryTotal = 0.0;
  var categoryMonthTotal = 0.0;
  var categoryWeekTotal = 0.0;

  var categoryMonthCounter = 1;
  var categoryWeekCounter = 1;




  categoriesRef.once("value", function(snapshot) {
    if (snapshot.exists()) {
      var categoryRecord = snapshot.val();

        if (snapshot.hasChild(monthString)) {
          categoryMonthTotal = category.monthString + task.amount;
          categoryMonthCounter = category.monthCounterString + categoryMonthCounter;
        } else {
          categoryMonthTotal =  task.amount;
        }

        if (snapshot.hasChild(weekString)) {
          categoryWeekTotal = category.weekString + task.amount;
          categoryWeekCounter = category.weekCounterString + categoryWeekCounter;
        } else {
          categoryWeekTotal =  task.amount;
        }

        console.log("category record... " + categoryRecord);

        var newCounter = categoryRecord.counter + 1;
        var newTotal = categoryRecord.total + task.amount;

        console.log(newCounter);
        console.log(newTotal);

        categoriesRef.update({
          counter: newCounter,
          total: newTotal,
          [monthString]: categoryMonthTotal,
          [monthCounterString]: categoryMonthCounter,
          [weekString]: categoryWeekTotal,
          [weekCounterString]: categoryWeekCounter
        });
    };
  });

  var totalsRef = expensesRef.child("totals");

};

function updateNextDate(task) {


}

exports.saveExpense = saveExpense;
