
// celciusToFahrenheit

// celsiusToFahrenheit();

// function celsiusToFahrenheit(celsius) {
//     let fahrenheit = (celsius * 1.8) + 32;
//     return fahrenheit;
// }

// console.log(celsiusToFahrenheit(10));
// console.log(celsiusToFahrenheit(-5));

// convertTemp

// function convertTemp(temp, convertTo) {
//     if (convertTo == 'c') {
//         return ((temp - 32) / 1.8);
//     } else {
//         return ((temp * 1.8) + 32);
//     }
// }

// console.log(convertTemp(10, 'c'));
// console.log(convertTemp(10, 'f'));

// getWordLengths 

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// let lengths = [];

// function getWordLengths(words) {
//     for (let word of words) {
//         lengths.push(word.length);
//     }
//     return lengths;
// }

// console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

// getLongestWord 

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

// let longestWord = "";

// function getLongestWord(words) {
//     for (let word of words) {
//         if (word.length > longestWord.length) {
//             longestWord = word;
//         }
//     }
//     return longestWord;
// }

// console.log(getLongestWord(words)); // Expected output: banana

// getOddNumbers 

// function getOddNumbers(numbers) {
//     let results = [];
//     for (let number of numbers) {
//         if (number % 2 == 1) {
//             results.push(number);
//         }
//     }
//     return results;
// }

// console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
// console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]

// filterNumbers 

// function filterNumbers(numbers, evenOrOdd) {
//     let results = [];
//     for (let number of numbers) {
//         if (evenOrOdd == 'even' && number % 2 == 0) {
//             results.push(number);
//         } else if (evenOrOdd == 'odd' && number % 2 == 1) {
//             results.push(number);
//         }
//     }
//     return results;
// }

// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

// console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
// console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]

// Even/Odd Response Time Task

alert(`
    Welcome to the even/odd response time task. 

    You are about to see a series of numbers. 

    If the number you see is EVEN, type the letter "e". 
    If the number you see is ODD, type the letter "o". 
    
    Please answer as quickly and as accurately as possible.`);

let resultsArray = [];

for (let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * 20) + 1;
    let start = Date.now();
    let input = prompt(`
        Number: ${num} 
        Type the letter "e" for EVEN 
        Type the letter "o" for ODD`);
    let end = Date.now();
    let time = (end - start) / 1000;
    let correct = true;
    if ((num % 2 == 0 && input !== 'e') || (num % 2 == 1 && input !== 'o')) {
        correct = false;
    }
    let results = {
        number: num,
        response: input,
        correct: correct,
        responseTime: time
    }
    resultsArray.push(results);
}

console.log(resultsArray);

alert("Thank you for your time!");



