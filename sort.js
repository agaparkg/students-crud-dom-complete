const letters = ["z", "c", "a", "s"];

letters.forEach((letter) => {
  //   console.log(letter, " ", letter.charCodeAt(0));
});

// console.log(letters.sort());
// console.log(letters.reverse());

const numbers = [50, 30, 4, 80, 100, 20, 52];

numbers.forEach((num) => {
  console.log(num, " ", String(num).charCodeAt(0));
});

// console.log(
//   numbers.sort((a, b) => {
//     // > 0 => 50 - 30
//     // < 0 => 30 - 50
//     // 0 => 50 = 50

//     if (a > b) {
//       return 1;
//     } else if (a < b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   })
// );

console.log(
  numbers.sort((a, b) => {
    // > 0 => 50 - 30 postive
    // < 0 => 30 - 50 neg
    // 0 => 50 = 50 0

    return a - b;
  })
);

const students = [
  {
    name: "John",
    age: 19,
  },
  {
    name: "Peter",
    age: 45,
  },
  {
    name: "Alex",
    age: 20,
  },
];

const sortBy = "name";
console.log(
  students.sort((a, b, sortBy) => {
    // > 0 => 50 - 30
    // < 0 => 30 - 50
    // 0 => 50 = 50
    // return a.name - b.name;
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    } else {
      return 0;
    }
  })
);
