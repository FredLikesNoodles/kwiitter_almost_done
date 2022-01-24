username = localStorage.getItem("Username");
document.getElementById("wel_user").innerHTML = "Welcome " + username + " !";
function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name",
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
  apiKey: "AIzaSyDZhw-tQkAvNAp0vCuUsrWM0i8X99iEElI",
  authDomain: "kwitter-c05af.firebaseapp.com",
  databaseURL: "https://kwitter-c05af-default-rtdb.firebaseio.com",
  projectId: "kwitter-c05af",
  storageBucket: "kwitter-c05af.appspot.com",
  messagingSenderId: "504356234718",
  appId: "1:504356234718:web:1435a6c3f04ed865ace94f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code
        console.log("Room Name - " + Room_names);
        row =
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)'>#" +
          Room_names +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
        //End code
      });
    });
}
getData();
function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}
