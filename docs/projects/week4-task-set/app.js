
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

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

let longestWord = "";

function getLongestWord(words) {
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }
    return longestWord;
}

console.log(getLongestWord(words)); // Expected output: banana
