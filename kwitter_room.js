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
  apiKey: "AIzaSyCs_cXwxfXAitTDVgsoBV7mkzs9OXOL0Jw",
  authDomain: "kwitter2-51029.firebaseapp.com",
  databaseURL: "https://kwitter2-51029-default-rtdb.firebaseio.com",
  projectId: "kwitter2-51029",
  storageBucket: "kwitter2-51029.appspot.com",
  messagingSenderId: "412259820331",
  appId: "1:412259820331:web:590b08b1e66611183c9b6e",
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
