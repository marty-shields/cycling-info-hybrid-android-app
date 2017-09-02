Template7.registerHelper('json_stringify', function (context) {
      return JSON.stringify(context);
});

// Initialize app
var myApp = new Framework7({
  // Enable templates auto precompilation
  precompileTemplates: true,
  // Enabled pages rendering using Template7
  template7Pages: true
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {

});

//cyclelist
function getCycleParts() {
  $$.getJSON('js/cycleparts.json', function (json) {
   myApp.template7Data.cycleparts = json;
  });
};

getCycleParts();

//end cyclelist

//maintenance
myApp.onPageInit('maintenance', function (page) {
  refreshMaintanence();
})

//end maintenance
