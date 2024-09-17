alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

// First Equation

let start1 = Date.now();

let randNum1a = Math.floor(Math.random() * 10) + 1;
let randNum1b = Math.floor(Math.random() * 10) + 1;

let response1 = prompt("What is " + randNum1a + " + " + randNum1b + "?");

let end1 = Date.now();

let timing1 = (end1 - start1) / 1000;

let correctAnswer1 = randNum1a + randNum1b;

let positiveFeedback1 = "(correct)";
let negativeFeedback1 = "(incorrect)";

if (response1 == correctAnswer1) {
    alert("You answered " + response1 + " " + positiveFeedback1 + " in " + timing1 + " seconds");
} else {
    alert("You answered " + response1 + " " + negativeFeedback1 + " in " + timing1 + " seconds");
}

// Second Equation

let start2 = Date.now();

let randNum2a = Math.floor(Math.random() * 10) + 1;
let randNum2b = Math.floor(Math.random() * 10) + 1;

let response2 = prompt("What is " + randNum2a + " + " + randNum2b + "?");

let end2 = Date.now();

let timing2 = (end2 - start2) / 1000;

let correctAnswer2 = randNum2a + randNum2b;

let positiveFeedback2 = "(correct)";
let negativeFeedback2 = "(incorrect)";

if (response2 == correctAnswer1) {
    alert("You answered " + response2 + " " + positiveFeedback2 + " in " + timing2 + " seconds");
} else {
    alert("You answered " + response2 + " " + negativeFeedback2 + " in " + timing2 + " seconds");
}

// Third Equation

let start3 = Date.now();

let randNum3a = Math.floor(Math.random() * 10) + 1;
let randNum3b = Math.floor(Math.random() * 10) + 1;

let response3 = prompt("What is " + randNum3a + " + " + randNum3b + "?");

let end3 = Date.now();

let timing3 = (end2 - start2) / 1000;

let correctAnswer3 = randNum3a + randNum3b;

let positiveFeedback3 = "(correct)";
let negativeFeedback3 = "(incorrect)";

if (response3 == correctAnswer1) {
    alert("You answered " + response3 + " " + positiveFeedback3 + " in " + timing3 + " seconds");
} else {
    alert("You answered " + response3 + " " + negativeFeedback3 + " in " + timing3 + " seconds");
}

alert("Thank you for your participation!");