var firebase = require("firebase");
var dateFormat = require('dateformat');

var now = new Date();
var nowString = dateFormat(now, "d mmmm yyyy HH:MM:ss");

var month = dateFormat(now, "mmmm");
var week = dateFormat(now, "W");
var day = dateFormat(now, "d");

var monthString = "m_" + dateFormat(now, "mmmm_yyyy");
var weekString = "w_" + dateFormat(now, "mmmm_yyyy");
var monthCounterString = "counter_m_" + dateFormat(now, "mmmm_yyyy");
var weekCounterString = "counter_w_" + dateFormat(now, "mmmm_yyyy");

function saveExpense(db, task) {
  var expensesRef = db.ref("expenses").child(task.userId);
  var newExpense = expensesRef.push();
  newExpense.set({
    description: task.expense,
    billAmount: task.amount,
    dateAdded: nowString,
    category: task.category,
    month: month,
    day: day,
    week: week
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
          categoryMonthTotal = categoryRecord[monthString] + task.amount;
          categoryMonthCounter = categoryRecord[monthCounterString] + categoryMonthCounter;
        } else {
          categoryMonthTotal =  task.amount;
        }

        if (snapshot.hasChild(weekString)) {
          categoryWeekTotal = categoryRecord[weekString] + task.amount;
          categoryWeekCounter = categoryRecord[weekCounterString] + categoryWeekCounter;
        } else {
          categoryWeekTotal =  task.amount;
        }

        var newCounter = categoryRecord.counter + 1;
        var newTotal = categoryRecord.total + task.amount;

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



  totalsRef.once("value", function(snapshot) {
    if (snapshot.exists()) {

      var totalsRecord = snapshot.val();
      var monthTotal = task.amount;
      var weekTotal = task.amount;
      var total = task.amount;

      if (snapshot.hasChild(monthString)) {
        monthTotal = totalsRecord[monthString] + task.amount;
      }

      if (snapshot.hasChild(weekString)) {
        weekTotal = totalsRecord[weekString] + task.amount;
      }

      if (snapshot.hasChild("total")) {
        total = totalsRecord.total + task.amount
      }

      totalsRef.update({
        total: total,
        [monthString]: monthTotal,
        [weekString]: weekTotal
      })

    }
  });

};

function updateNextDate(ref, task) {

  var days = 30;
  switch (task.frequency) {
    case "Y":
      days = 365;
      break;
    case "M":
      days = 30;
      break;
    case "W":
      days = 7;
      break;
    case "2W":
      days = 14;
      break;
    default:
      break;
  }

  var newNow = now;

  newNow.setTime(newNow.getTime() + days * 86400000 );
  var newNextDate = dateFormat(newNow,  "d mmmm yyyy");

  ref.update({
    nextDate: newNextDate
  });


}

exports.saveExpense = saveExpense;
exports.updateNextDate = updateNextDate;
