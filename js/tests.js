//WE RUN LOCALSTORAGE.CLEAR IN ALL THE TESTS REGGARDING LOCAL STORAGE SO WE DO NOT HAVE
//FALSE DATA RUNNING THROUGH THE APPLICATION

QUnit.test( "Saving To Local Storage", function( assert ) {
  localStorage.clear();
  assert.strictEqual(saveToLocalStorage("test","test0", "test1", "Test2"), true ,"This needs to save the values into an object then pass to local storage" );
  localStorage.clear();
});

QUnit.test( "Saving Correct Values To Local Storage", function( assert ) {
  localStorage.clear();
  //save to local storage first with the results
  saveToLocalStorage("test", "test0", "test1", "Test2")

  //hard code expected value
  var expected = {
    name: "test",
    description : "test0",
    schedule : "test1",
    lastcomplete : ""
  }

  assert.strictEqual(localStorage.getItem("Test2"), JSON.stringify(expected) ,"This needs to save the correct values to local storage" );
  localStorage.clear();
});

QUnit.test("Failing to save to local storage catches correctly", function(assert){
  localStorage.clear();
  assert.strictEqual(saveToLocalStorage("test0", "test1", "Test2"), false ,"This should fail as it is not passing through 4 values" );
  localStorage.clear();
});

QUnit.test("Removing correct localstorage item", function(assert){
  localStorage.clear();
  //set a dummy item
  var key = "removeTest"
  localStorage.setItem(key, "test1");
  removeMaintenance(key)

  var expected = localStorage.getItem(key);

  assert.strictEqual(null, expected ,"This test should remove the correct item from local storage" );
  localStorage.clear();
});

QUnit.test("Catching correctly when function does not remove the item successfully", function(assert){
  localStorage.clear();
  //set a dummy item
  var key = "test8"
  localStorage.setItem(key, "test1");
  removeMaintenance("fakeKey")

  //try to remove an item with a key which does not exist
  assert.strictEqual(removeMaintenance("fakeKey"), false ,"This test should not remove anything from local storage and return false" );
  localStorage.clear();
});
