var firebase = require("firebase");

function saveExpense(ref, task) {
  console.log(task);


  var newExpense = ref.push();
  newExpense.set({
    description: task.expense,
    billAmount: task.amount,
    // dateAdded: task.
    category: task.category
  });


}
exports.saveExpense = saveExpense;
