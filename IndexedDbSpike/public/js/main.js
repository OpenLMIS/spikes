function FormController($scope) {

  var db;
  var request = indexedDB.open("MyDb", 4);
  var transaction;

  $scope.refreshData = function () {
    var objectStore = db.transaction('objects').objectStore('objects');
    $scope.dataArr = [];

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        $scope.dataArr.push(cursor.value);
        cursor.continue();
      }
      $scope.$apply();

    };
  };

  request.onsuccess = function (event) {
    db = request.result;
    $scope.refreshData();
  };

  request.onerror = function (e) {
    console.error(e, request);
  };

  request.onupgradeneeded = function (evt) {
    db = request.result;
    db.deleteObjectStore('objects');
    var formsStore = db.createObjectStore("objects", {
      "keyPath": "id",
      "autoIncrement": true
    });
    formsStore.createIndex("by_code", "code", { unique: true});
    formsStore.createIndex("by_name", "name", {});
    console.info(db);
  };


  $scope.save = function (data) {
    var isUpdate = false;
    if (data.id) isUpdate = true;
    transaction = db.transaction('objects', 'readwrite');
    var objects = transaction.objectStore('objects');

    objects.put(data);

    transaction.oncomplete = function () {
      if (isUpdate) console.log('updated');
      else console.log('created');

      $scope.refreshData();
    }
    transaction.onabort = function () {
      console.log(transaction.error);
      $scope.refreshData();
    }
  }

  $scope.searchByCode = function (query) {
    var by_code = db.transaction('objects').objectStore('objects').index('by_code');

    by_code.get(query).onsuccess = function (evt) {
      var result = evt.target.result;
      $scope.dataArr = [result];
      $scope.$apply();
    }
  }

  $scope.searchByName = function (query) {
    $scope.dataArr = [];
    var transaction = db.transaction('objects');
    var by_name = transaction.objectStore('objects').index('by_name');

    var request = by_name.openCursor(IDBKeyRange.only(query));

    request.onsuccess = function () {
      var cursor = request.result;

      if (cursor) {
        $scope.dataArr.push(cursor.value);
        cursor.continue();
      }
    }
    transaction.oncomplete = function () {
      $scope.$apply();
    }
  }


  $scope.delete = function (data) {
    transaction = db.transaction('objects', 'readwrite');
    var objects = transaction.objectStore('objects');

    objects.delete(data.id);

    transaction.oncomplete = function () {
      console.log('deleted');
      $scope.refreshData();
    }
  }

}