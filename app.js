$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyDMU8lnpPShAJPAyax9uLcnWFLUfrxkyWU",
        authDomain: "train-scheduler-kev.firebaseapp.com",
        databaseURL: "https://train-scheduler-kev.firebaseio.com",
        projectId: "train-scheduler-kev",
        storageBucket: "train-scheduler-kev.appspot.com",
        messagingSenderId: "1019043627899"
      };
      firebase.initializeApp(config);

// variable to reference firebase database
var database = firebase.database();

// event listener that takes user input from add train form
$("#submit-train-info").on("click", function() {
    console.log("Form submitted");
    // trim removes before and after space from input fields
    var trainName = $("#train-name-field").val().trim();
    var destination = $("#train-destination-field").val().trim();
    var frequency = $("#train-frequency-field").val().trim();
    var firstTrainTime = moment($("#train-time-arrival-field").val().trim(),"HH:mm").subtract(10, "years").format("x");
   // console.log("You clicked the submit train info button");

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime
    }

database.ref().push(newTrain);

alert("Your train was added!");

$("train-name-field").val("");
$("train-destination-field").val("");
$("train-frequency-field").val("");
$("train-time-arrival-field").val("");

database.ref().on("child_added", function(snapshot){
    var trainName = snapshot.val().name;
    var destination = snapshot.val().name;
    var frequency = snapshot.val().name;
    var firstTrainTime = snapshot.val().name;
})

// dynamically adds new train fields onto the form
$(".table > tBody").append("<tr><td>" + trainName + "<td>" + destination + "<td>" + frequency + "<td>" + firstTrainTime);
// end of rows being dynamically appended

$('.form-group').children('input').val('')
// return false;
})})
