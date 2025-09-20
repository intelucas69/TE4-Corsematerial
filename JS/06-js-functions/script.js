//* funktioners

console.log(greet("Alex", 19));

function greet(name, age) {
  return `Hello my name is ${name}, i am ${age} years old...`;
}

//! BMI KLALKYLATÅR name wikt länngd
function calculateBMI(name, age, weight, height) {
  const bmi = (weight / (height * height)).toFixed(2);
  return `${name}, who is ${age} years old, has a BMI of ${bmi}.`;
}

console.log(calculateBMI("Lucas", 19, 92, 1.85));

// Default parameters
const calculateAge = (birthYear, currentYear = 2025) => {
  const age = currentYear - birthYear;
  console.log(age);
};
calculateAge(2006, 2025);

// Early returns

const showTemp = (temp = 10) => {
  if (temp < 0) return `frezzing🥶`;
  if (temp < 20) return `cool⛄️`;
  if (temp < 32) return `warm🌤️`;
  return `hot🔥`;
};
console.log(showTemp(19));

// calculate score
const calculateGrade = (grade = 0) => {
  if (grade > 100) return `frank fucked upp`;
  if (grade >= 90) return `A`;
  if (grade >= 80) return `B`;
  if (grade >= 70) return `C`;
  if (grade >= 60) return `D`;
  if (grade >= 0) return `F`;
  return `frank fucked upp`;
};

console.log(calculateGrade(101));
console.log(calculateGrade(100));
console.log(calculateGrade(80));
console.log(calculateGrade(70));
console.log(calculateGrade(60));
console.log(calculateGrade(50));
console.log(calculateGrade(-1));
