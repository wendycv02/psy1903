let conditions = [];

for (i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let condition = {
        num1: num1,
        num2: num2,
        answer: num1 + num2
    }
    conditions.push(condition);
}
console.log(conditions);
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}