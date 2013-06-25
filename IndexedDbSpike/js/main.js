function FormController($scope) {

    var db;
    var request = indexedDB.open("MyDb", 3);
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
        var formsStore = db.createObjectStore("objects", {
            "keyPath": "id",
            "autoIncrement": true
        });
        formsStore.createIndex("by_code", "code", { unique: true});
        formsStore.createIndex("by_name", "name", { unique: true });
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
        transaction.onabort = function() {
            console.log(transaction.error);
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