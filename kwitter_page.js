//YOUR FIREBASE LINKS

// Your web app's Firebase configuration
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
    .ref("/" + room_name)
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          names = message_data["username"];
          message = message_data["message"];
          likes = message_data["likes"];
          nt = "<h4>" + names + "<img src='tick.png' class='user_tick'></h4>";
          mt = "<h4>" + message + "</h4>";
          lt = "<button id='firebase_message_id' onclick='updateLike()'>";
          st =
            "<span class='glyphicon glyphicon-thumbs-up'></span>Likes : " +
            likes +
            "</button>";
          row = nt + mt + lt + st;
          document.getElementById("output").innerHTML += row;
          //End code
        }
      });
    });
}
getData();
function logout() {
  localStorage.removeItem("room_name");
  localStorage.removeItem("Username");
  window.location = "index.html";
}
user_name = localStorage.getItem("Username");
room_name = localStorage.getItem("room_name");
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    message: msg,
    likes: 0,
    username: user_name,
  });
}
function updateLike(message_id) {
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  firebase.database().ref(room_name).child(message_id).update({
    likes: updated_likes,
  });
}
