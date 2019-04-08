$(document).ready(function () {
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
    $("#submit-train-info").on("click", function () {
        // trim removes before and after space from input fields
        var trainName = $("#train-name-field").val().trim();
        var destination = $("#train-destination-field").val().trim();
        var frequency = $("#train-frequency-field").val().trim();
        var firstTrainTime = $("#train-time-arrival-field").val().trim();

        console.log("First Train: " + firstTrainTime);
        // console.log("You clicked the submit train info button");

        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime
        }

        $('.form-group').children('input').val('')

        database.ref().push(newTrain);

        alert("Your train was added!");

        $("train-name-field").val("");
        $("train-destination-field").val("");
        $("train-frequency-field").val("");
        $("train-time-arrival-field").val("");
    })

    // add values from event listenter to Firebase
    database.ref().on("child_added", function (snapshot) {
        var trainName = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrainTime = snapshot.val().firstTrainTime;

        var timeArr = firstTrainTime.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    
    // MomentJS within here
    var firstTimeConverted = moment(trainTime);
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // end of MomentJS code to covert next arrival and minutes away

    // dynamically adds new train fields onto the form
    $(".table > tBody").append("<tr><td>" + trainName + "<td>" + destination + "<td>" + "Every " + frequency + " minutes" + "<td>" + nextTrain.format("LT") + "<td>" + tMinutesTillTrain + " minutes away");
    // end of rows being dynamically appended
    })
})
