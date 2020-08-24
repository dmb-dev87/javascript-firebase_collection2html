// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZydYcF89R7POVCPS1e7xFHqolQqWgPsY",
  authDomain: "verifyit-1f2ed.firebaseio.com",
  databaseURL: "https://verifyit-1f2ed.firebaseio.com",
  projectId: "verifyit-1f2ed",
  storageBucket: "verifyit-1f2ed.appspot.com",
  messagingSenderId: "147080022975"
};
firebase.initializeApp(config);

var database = firebase.database();

var rootRef = database.ref('/');

var keys = [
  "Barcode",
  "Document Type",
  "ID",
  "Location",
  "LocationShort",
  "Name",
  "PhoneNumber",
  "RecRef",
  "Time",
  "UUID",
  "myImageURL"
];

rootRef.once('value', function(snapshot){
  var posts = snapshot.val().Posts;

  for (var post in posts) {
    addRecordToTable(posts[post]);
  }
});

function addRecordToTable(post) {
  var html = document.getElementById('data_body').innerHTML;

  var tr_html = "<tr>" ;

  console.log(post);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key == "Location") {
      tr_html += getLocationHtml(post[key]);
    }
    else if (key == "LocationShort") {
      console.log(key);
      console.log(post[key]);
      console.log(getLocationHtml(post[key]));
      tr_html += getLocationHtml(post[key]);
    }
    else if (key == "myImageURL") {
      tr_html += getImageHtml(post[key]);
    }
    else {
      tr_html += getNormalHtml(post[key]);      
    }
  }

  html += tr_html + "</tr>";
  
  document.getElementById('data_body').innerHTML = html;
}

function getLocationHtml(value) {
  if (value === undefined) {
    return "<td>nodata</td><td>nodata</td>";
  }

  var pairs = value.split('\n');
  var obj = pairs.reduce((obj,data)=> {
      var [k, v] = data.split(':');
      obj[k] = v;
      return obj;
  }, {})

  var html = "";

  for (var key in obj) {
    html += getNormalHtml(obj[key]);
  }

  return html;  
}

function getNormalHtml(value) {
  if (value === undefined) {
    return "<td>nodata</td>";
  }

  return "<td>" + value + "</td>";
}

function getImageHtml(value) {
  if (value === undefined) {
    return "<td>nodata</td>";
  }

  var html = "<td>" + value + "</td>";

  var pairs = value.split(',');

  for (var i=0; i<30; i++) {
    html += getImageUrlHtml(pairs[i]);
  }

  return html;
}

function getImageUrlHtml(value) {
  if (value === undefined) {
    return "<td></td>";
  }

  return '<td><img src="' + value + '" width="30px" height="30px" /></td>';
}