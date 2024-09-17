// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
// let equation = document.getElementById('equation');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

// console.log(num1);
// console.log(num2);

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

let correctAnswer = num1 + num2;

let positiveFeedback = "(correct)";
let negativeFeedback = "(incorrect)";

// equation.innerHTML = 'What is ' + num1 + ' + ' + num2 + '?';

let start = Date.now();

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    let end = Date.now();
    let timing = (end - start) / 1000;

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    if (response == correctAnswer) {
        results.innerHTML = 'You answered ' + response + " " + positiveFeedback + ' in ' + timing + " seconds";
    } else {
        results.innerHTML = 'You answered ' + response + " " + negativeFeedback + ' in ' + timing + " seconds";
    }
    // Hide the form (including instructions)
    form.style.display = 'none';
});



