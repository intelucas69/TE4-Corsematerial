console.log("Hello, World!");

function makeMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const multiplyByTwo = makeMultiplier(2);
console.log(multiplyByTwo(5)); // Output: 10

function counter() {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    },
  };
}

const myCounter = counter();
console.log(myCounter.increment());
console.log(myCounter.increment());
console.log(myCounter.reset());
