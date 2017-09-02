function saveMaintenance(){
  //if statement t see if any of the fields are empty
 if(document.getElementById("mainName").value != "" && document.getElementById("mainDesc").value != "")
  {
    var uniqKey = new Date().getTime();
    var value = {name : document.getElementById("mainName").value,
                description : document.getElementById("mainDesc").value,
                schedule : document.getElementById("scheduled").value,
                lastcomplete : ""};

    localStorage.setItem(uniqKey, JSON.stringify(value));

    //set up variables for local storage for debugging
    var storage = localStorage;
    var i = 0, len = storage.length, key, value;

    console.log("list of objects");
    for (i; i < len; i++)
    {
      key = storage.key(i);
        value = storage.getItem(key);
        value = JSON.parse(value);
        console.log(value);
    }

    //alert to tell that data is saved
    myApp.alert("Details Saved", "Success!");

    //clean up boxes
    document.getElementById("mainName").value = "";
    document.getElementById("mainDesc").value = "";
  }
  else {
    myApp.alert("Please fill in all fields", "Error!");
  }
}

function showDetails(key){
    //delay for information
    var delay=100; //1 second

    setTimeout(function() {
      //get item from key
      maint = localStorage.getItem(key);
      maint = JSON.parse(maint);

      if (maint != null)
      {
        console.log(maint);

        //insert item details onto page
        document.getElementById("title").innerHTML = maint.name;
        document.getElementById("descript").innerHTML = maint.description;
        document.getElementById("schedule").innerHTML = maint.schedule;
        if (maint.lastcomplete != "")
        {
          document.getElementById("complete").innerHTML = maint.lastcomplete;
        }
        else {
          document.getElementById("complete").innerHTML = "Never";
        }

        var button = document.getElementById('updateMaint');
        button.setAttribute('onclick', "updateMaintenance(" + key + ")");
      }
    }, delay);
}

function updateMaintenance(key){
  maint = localStorage.getItem(key);
  maint = JSON.parse(maint);

  //get Date
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  console.log(year + " " + month + " " + day);
  date = day + "/" + month + "/" + year;

  maint.lastcomplete = date;

  console.log(maint);

  localStorage.setItem(key, JSON.stringify(maint));

  myApp.alert("Maintenance is updated", "Success!");

  document.getElementById("complete").innerHTML = maint.lastcomplete;
}

function refreshMaintanence(){
  // clear out the list first
  var ul = document.getElementById('maintenanceList');
  ul.innerHTML = null;

  //set up variables for local storage
  var storage = localStorage;
  var i = 0, len = storage.length, key, value;

  for (i; i < len; i++)
  {
    //get the key then the item and store them in vals
    key = storage.key(i);
    value = storage.getItem(key);
    value = JSON.parse(value);

    //create card div elemetn
    var card = document.createElement("div");
    card.setAttribute('class', 'card');

    //create new card header for the title
    var cardHeader = document.createElement("div");
    cardHeader.setAttribute('class', 'card-header');
    cardHeader.textContent = value.name;

    card.appendChild(cardHeader);

    //create the card content
    var contentInner = document.createElement("div");
    contentInner.setAttribute('class', 'card-content-inner');

    var lastcomp;

    if (value.lastcomplete == "")
    {
      lastcomp = "Last Completed: " + "Never";
    }
    else{
      lastcomp = "Last Completed: " + value.lastcomplete;
    }

    var completed = document.createElement("p");
    completed.setAttribute('class', 'color-gray');
    completed.textContent = lastcomp;

    contentInner.appendChild(completed);

    var contentdesc = document.createElement("p");
    //split the string of the description so we only get a little bit of it.
    if (value.description.length > 51)
    {
      var desc = value.description.substr(0, 50);
      desc = desc + "...";
    }
    else {
      desc = value.description;
    }
    contentdesc.textContent = desc;

    contentInner.appendChild(contentdesc);

    var cardContent = document.createElement("div");
    cardContent.setAttribute('class', 'card-content');
    cardContent.appendChild(contentInner);

    card.appendChild(cardContent);

    //create card footer buttons
    var moreInfo = document.createElement("a");
    moreInfo.setAttribute('class', "link");
    moreInfo.setAttribute('href', "maintenance-info.html");
    moreInfo.setAttribute('onclick', "showDetails(" + key + ")");
    moreInfo.textContent = "More Info";

    var remButton = document.createElement("a");
    remButton.setAttribute('class', "link");
    remButton.setAttribute('href', "#");
    remButton.setAttribute('onclick', "removeMaintenance(" + key + ")");
    remButton.textContent = "Remove";

    //put buttons into footer
    var footer = document.createElement("div");
    footer.setAttribute('class', 'card-footer');

    footer.appendChild(moreInfo);
    footer.appendChild(remButton);

    card.appendChild(footer);

    ul.appendChild(card);
  }
}

function removeMaintenance(key){
  //take out the item on the list that is selected
  localStorage.removeItem(key);

  //refresh the list
  refreshMaintanence();
}
