//Configuring Firebase database
var config = {
  apiKey: "AIzaSyDWyxSSjuox-JQnaTFYlcJ9AL6xEvVcNDM",
  authDomain: "rpgc-f314e.firebaseapp.com",
  databaseURL: "https://rpgc-f314e.firebaseio.com",
  projectId: "rpgc-f314e",
  storageBucket: "rpgc-f314e.appspot.com",
  messagingSenderId: "503309265125"
};
firebase.initializeApp(config);
var database = firebase.database();

//Adding generic variables

var playerName;
var selection;
var player1Connected = false;
var player2Connected = false;
var playerCanClick = true;

//Addibf playerwise variables
var player1Name = "";
var player2Name = "";
var Player1Selection = "";
var player2Selection = "";
var player1Wins;
var player2Wins;
var player1Loose;
var player2Loose;
var player1Tie;
var player2Tie;

//Step1: getting the input value of name and what player selected
$("#nameAdd").on("click", function(e) {
  e.preventDefault();
  playerName = $("#nameInput")
    .val()
    .trim();
  console.log(playerName);
  $("#initialNameDisplay").css("display", "none");
  $("#gameDiv").css("display", "block");
  $('#welcomeMessage').text("Hi, " + playerName+". "+ "Welcome to Rock Paper Scissor.")

});

$(".option").on("click", function(e) {
  e.preventDefault();
  selected = $(this).attr("id");
  console.log(selected);
});

// Game logics starts here
$(".option").on("click", function() {
    //checking if someone has joined or not, if no one then the player will be player 1
  if (player1Connected == false && player2Connected == false) {
    //Using boolean to make sure that the player can only click once
    if (playerCanClick == true) {
      player1Name = playerName;
      player1Selection = selected;
      playerCanClick = false;
      console.log(player1Name, selected);
      //Adding to database
      database.ref().update({
        player1Name: playerName,
        player1Selection: selected,
        player1Connected: true,

        player2Name: "",
        player2Connected: false,
        player2Selection: ""
      });
    }
    //if one is connected then the next one will be player 2
  } else if (player1Connected == true && player2Connected == false) {
    //Using boolean to make sure that the player can only click once
    if (playerCanClick == true) {
      player2Name = playerName;
      player2Selection = selected;
      playerCanClick = false;

      console.log(player2Name, selected);
      //Adding to database
      database.ref().update({
        player2Name: playerName,
        player2Selection: selected,
        player2Connected: true
      });
    }
  } else if (player1Connected == true && player2Connected == true) {
    alert("Game is Full")
  }
});
// Initial values
database.ref().set({
  player1Name: "Waiting for the player",
  player1Selection: "",
  player1Connected: "",

  player2Name: "Waiting for the player",
  player2Connected: "",
  player2Selection: ""
});

//retriving the value and using the if/else to determine the winner
database.ref().on("value", function(childsnapshot) {
  console.log(childsnapshot.val());

  player1Connected = childsnapshot.val().player1Connected;
  player2Connected = childsnapshot.val().player2Connected;

  player1Name = childsnapshot.val().player1Name;
  player2Name = childsnapshot.val().player2Name;

  player1Selection = childsnapshot.val().player1Selection;
  player2Selection = childsnapshot.val().player2Selection;

  if (player1Connected == true && player2Connected == true) {
    $("#player1Name").text(player1Name);
    $("#player2Name").text(player2Name);

    $("#player1Selection").text(player1Selection);
    $("#player2Selection").text(player2Selection);
    if (player1Selection == "rock" && player2Selection == "rock") {
      console.log("tie");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "This game is a tie."
      );
      player1Tie++;
      player2Tie++;
    } else if (player1Selection == "rock" && player2Selection == "paper") {
      console.log("player2");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          " ." +
          player2Name +
          " selected " +
          player2Selection +
          " ." +
          " " +
          player2Name +
          " wins."
      );
      player2Wins++;
      player1Loose++;
    } else if (player1Selection == "rock" && player2Selection == "scissor") {
      console.log("player1");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So" +
          player1Name +
          " wins."
      );
      player1Wins++;
      player2Loose++;
    } else if (player1Selection == "paper" && player2Selection == "rock") {
      console.log("player1");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          player1Name +
          " wins."
      );
      player1Wins++;
      player2Loose++;
    } else if (player1Selection == "paper" && player2Selection == "paper") {
      console.log("tie");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          "this game is a tie."
      );
      player1Tie++;
      player2Tie++;
    } else if (player1Selection == "paper" && player2Selection == "scissor") {
      console.log("player2");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          player2Name +
          " wins."
      );
      player2Wins++;
      player1Loose++;
    } else if (player1Selection == "scissor" && player2Selection == "rock") {
      console.log("player2");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          playerName +
          " wins."
      );
      player2Wins++;
      player1Loose++;
    } else if (player1Selection == "scissor" && player2Selection == "paper") {
      console.log("player1");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          player1Name +
          " wins."
      );
      player1Wins++;
      player2Loose++;
    } else if (player1Selection == "scissor" && player2Selection == "scissor") {
      console.log("tie");
      $("#result").text(
        player1Name +
          " selected " +
          player1Selection +
          ". " +
          player2Name +
          " selected " +
          player2Selection +
          ". " +
          "So " +
          "this game is a tie"
      );
      player1Tie++;
      player2Tie++;
    } else {
      $("#result").text("error");
    }

    //reseting the game 
    database.ref().update({
      player1Connected: ""
    });
    database.ref().update({
      player2Connected: ""
    });
    database.ref().update({
      player1Selection: ""
    });
    database.ref().update({
      player2Selection: ""
    });
// next round will begin in 5 seconds
    setTimeout(function() {
      console.log("thisWokedafter 3 Sec");
      playerCanClick = true;
      player1Connected = false;
      player2Connected = false;
      $("#player1Selection").text("");
      $("#player2Selection").text("");

      $("#player1Name").text("Waiting for the player to click");
      $("#player2Name").text("Waiting for the player to click");
      $("#result").text("Play Again. Will show the result when the other player clicks.");
    }, 5000);

   
  }
});

//this part is for chat
var text = "";
var sendMessage = $("#sendMessage");
var chatMessage;
var chat = $("#chat");
var entireChat;

sendMessage.on("click", function(e) {
  e.preventDefault();
  chatMessage = $("#chatMessage")
    .val()
    .trim();
  console.log(chatMessage);
  text = playerName + ": " + chatMessage;
  console.log(text);

  database.ref().push({
    text: text
  });
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val().text);
  var p = $("<p>");
  p.attr("id", "chatLines")

  text = snapshot.val().text;
  p.append(text);
  chat.append(p);
});
