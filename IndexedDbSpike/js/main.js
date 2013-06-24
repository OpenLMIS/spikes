function FormController($scope) {

  var db;
  var request = indexedDB.open("form", 9);

  request.onsuccess = function (event) {
    db = request.result;
    console.log(db);
  };

  request.onerror = function (e) {
    console.error(e, request);
  };

  request.onupgradeneeded = function (evt) {
    db = request.result;
    db.deleteObjectStore("forms");
    db.createObjectStore("forms", {
      "keyPath": "id",
      "autoIncrement": true
    });
    var objectStore = evt.currentTarget.transaction.objectStore('forms');
    objectStore.createIndex("price", "price", { unique: false });
    console.info(db);
  };

  $scope.save = function (data) {
    var transactionRequest = db.transaction([], IDBTransaction.READ_WRITE);
    transactionRequest.onsuccess = function (event) {
      console.log(event);
    }
    transactionRequest.onerror = function (event) {
      console.log(event);
    }
  }
}