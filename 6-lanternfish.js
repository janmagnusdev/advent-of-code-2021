// this is the stupid first solutions that came to my mind at first. resulted in an OOM in part two.

const observedFish = [1, 2, 5, 1, 1, 4, 1, 5, 5, 5, 3, 4, 1, 2, 2, 5, 3, 5, 1, 3, 4, 1, 5, 2, 5, 1, 4, 1, 2, 2, 1, 5, 1, 1, 1, 2, 4, 3, 4, 2, 2, 4, 5, 4, 1, 2, 3, 5, 3, 4, 1, 1, 2, 2, 1, 3, 3, 2, 3, 2, 1, 2, 2, 3, 1, 1, 2, 5, 1, 2, 1, 1, 3, 1, 1, 5, 5, 4, 1, 1, 5, 1, 4, 3, 5, 1, 3, 3, 1, 1, 5, 2, 1, 2, 4, 4, 5, 5, 4, 4, 5, 4, 3, 5, 5, 1, 3, 5, 2, 4, 1, 1, 2, 2, 2, 4, 1, 2, 1, 5, 1, 3, 1, 1, 1, 2, 1, 2, 2, 1, 3, 3, 5, 3, 4, 2, 1, 5, 2, 1, 4, 1, 1, 5, 1, 1, 5, 4, 4, 1, 4, 2, 3, 5, 2, 5, 5, 2, 2, 4, 4, 1, 1, 1, 4, 4, 1, 3, 5, 4, 2, 5, 5, 4, 4, 2, 2, 3, 2, 1, 3, 4, 1, 5, 1, 4, 5, 2, 4, 5, 1, 3, 4, 1, 4, 3, 3, 1, 1, 3, 2, 1, 5, 5, 3, 1, 1, 2, 4, 5, 3, 1, 1, 1, 2, 5, 2, 4, 5, 1, 3, 2, 4, 5, 5, 1, 2, 3, 4, 4, 1, 4, 1, 1, 3, 3, 5, 1, 2, 5, 1, 2, 5, 4, 1, 1, 3, 2, 1, 1, 1, 3, 5, 1, 3, 2, 4, 3, 5, 4, 1, 1, 5, 3, 4, 2, 3, 1, 1, 4, 2, 1, 2, 2, 1, 1, 4, 3, 1, 1, 3, 5, 2, 1, 3, 2, 1, 1, 1, 2, 1, 1, 5, 1, 1, 2, 5, 1, 1, 4]

const test = [3, 4, 3, 1, 2]

// 6 - 0 valid days for starter fish
// new fish starts at 8
// if x after day < 0 then x == 6

// mutates in place
const iterateDay = (input) => {
  // save size at beginning of day, new fish come at the end of the array
  const size = input.length
  for (let i = 0; i < size; i++) {
    let lanternfish = input[i];
    lanternfish--;
    if (lanternfish < 0) {
      // reset
      lanternfish = 6
      // add new fish
      input.push(8)
    }
    input[i] = lanternfish
  }
}


const getResult = (input, daysToSimulate, logSteps = false) => {
  console.log("initial state = " + input)
  for (let i = 0; i < daysToSimulate; i++) {
    iterateDay(input);
    if (logSteps) {
      console.log(`After ${i + 1} days: ${input}`)
    }
  }
  console.log(`Resulting fish after ${daysToSimulate} days: ${input.length}`)
}

console.log("TEST")
getResult(test, 18, true)
console.log("-------------------------------------\n")

console.log("REAL INPUT")
getResult(observedFish, 80)
console.log("-------------------------------------\n")

console.log("REAL INPUT PART TWO")
getResult(test, 256)
console.log("-------------------------------------\n")