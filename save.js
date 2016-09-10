var firebase = require("firebase");

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
};


exports.saveExpense = saveExpense;
