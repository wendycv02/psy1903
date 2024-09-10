alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let start1 = Date.now();
let randNum1a = Math.floor(Math.random() * 10) + 1;
let randNum1b = Math.floor(Math.random() * 10) + 1;
let response1 = prompt("What is " + randNum1a + " + " + randNum1b + "?");
let end1 = Date.now();
let timing1 = (end1 - start1) / 1000;
alert("You answered " + response1 + " in " + timing1 + " seconds");

let start2 = Date.now();
let randNum2a = Math.floor(Math.random() * 10) + 1;
let randNum2b = Math.floor(Math.random() * 10) + 1;
let response2 = prompt("What is " + randNum2a + " + " + randNum2b + "?");
let end2 = Date.now();
let timing2 = (end2 - start2) / 1000;
alert("You answered " + response2 + " in " + timing2 + " seconds");

let start3 = Date.now();
let randNum3a = Math.floor(Math.random() * 10) + 1;
let randNum3b = Math.floor(Math.random() * 10) + 1;
let response3 = prompt("What is " + randNum3a + " + " + randNum3b + "?");
let end3 = Date.now();
let timing3 = (end2 - start2) / 1000;
alert("You answered " + response3 + " in " + timing3 + " seconds");

alert("Thank you for your participation!");