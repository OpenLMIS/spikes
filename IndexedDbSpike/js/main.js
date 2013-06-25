function FormController($scope) {

  var db;
  var request = indexedDB.open("MyDb", 2);

  request.onsuccess = function (event) {
    db = request.result;
  };

  request.onerror = function (e) {
    console.error(e, request);
  };

  request.onupgradeneeded = function (evt) {
    db = request.result;
    var formsStore = db.createObjectStore("objects", {
      "keyPath": "id",
      "autoIncrement": true
    });
    formsStore.createIndex("by_code", "code", { unique: true});
    formsStore.createIndex("by_name", "name", { unique: true });
    console.info(db);
  };

  $scope.save = function (data) {
    var transaction = db.transaction(['objects'], 'readwrite');
    var objects = transaction.objectStore('objects');

    objects.put(data);

    transaction.oncomplete = function() {
      console.log('done');
    }
  }
}