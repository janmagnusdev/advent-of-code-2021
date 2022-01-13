import axios from "axios";

const getData = async () =>
  await axios.get("https://adventofcode.com/2021/day/3/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fcd01739818d6d32714847f740139d63198a1338a6890b2efde467b312dc5da5164680836385cb744",
    },
  });

const getMostCommonBit = (input: string[], position: number) => {
  let ones = 0;
  let zeros = 0;
  const row = input.map((str) => str[position]);
  row.forEach((entry) => {
    if (entry === "1") {
      ones++;
    } else if (entry === "0") {
      zeros++;
    }
  });
  if (ones > zeros) {
    return "1";
  } else {
    return "0";
  }
};

(async () => {
  try {
    const res = await getData();
    const input = res.data;
    const inputArray = input.split("\n").filter((input) => input);
    const positions = inputArray[0].length;
    let gammaString = "";
    for (let i = 0; i < positions; i++) {
      getMostCommonBit(inputArray, 0);
      gammaString = gammaString + getMostCommonBit(inputArray, i);
    }
    let gammaDec = parseInt(gammaString, 2);
    let epsilon = gammaString
      .split("")
      .map((x) => (x === "1" ? "0" : "1"))
      .join("");
    let epsilonDec = parseInt(epsilon, 2);
    console.log(gammaDec * epsilonDec);
  } catch (e) {
    console.error(e);
  }
})();

const oxygenCriteria = (
  input: string[],
  bits: string[],
  bitPosition: number
) => {
  // most common value and fallback is 1
  let ones = bits.filter((bit) => bit === "1").length;
  let zeros = bits.filter((bit) => bit === "0").length;
  let filterBit = zeros > ones ? "0" : "1";
  if (zeros === ones) {
    filterBit = "1";
  }
  return input.filter((input) => input.charAt(bitPosition) !== filterBit);
};

const carbonDyoxideCriteria = (
  input: string[],
  bits: string[],
  bitPosition: number
) => {
  // least common value and fallback is 0
  let ones = bits.filter((bit) => bit === "1").length;
  let zeros = bits.filter((bit) => bit === "0").length;
  let filterBit = zeros > ones ? "1" : "0";
  if (zeros === ones) {
    filterBit = "0";
  }
  return input.filter((input) => input.charAt(bitPosition) !== filterBit);
};

const findRating = (filterBitCriteria: Function, input: string[]) => {
  let bitPosition = 0;
  let maxBits = input[0].length;
  while (input.length != 1) {
    let newInput: string[] = [];
    const currentBits = input.map((number) => number.charAt(bitPosition));
    newInput = filterBitCriteria(input, currentBits, bitPosition);
    input = newInput;
    if (bitPosition < maxBits) {
      bitPosition++;
    } else {
      return "nothing found";
    }
  }
  return input[0];
};

const findOxygenRating = (input: string[]) => {
  return findRating(oxygenCriteria, input);
};

(async () => {
  try {
    const res = await getData();
    const input = res.data.split("\n").filter((input) => input);
    const oxygenRatingBinary = findRating(oxygenCriteria, input);
    const oxygenRatingDec = parseInt(oxygenRatingBinary, 2);
    const carbonDyoxideRatingBinary = findRating(carbonDyoxideCriteria, input);
    const carbonDyoxideRatingDec = parseInt(carbonDyoxideRatingBinary, 2);
    if (isNaN(oxygenRatingDec) || isNaN(carbonDyoxideRatingDec)) {
      console.error("No number found");
    }
    console.log(
      `Life Support Rating is: ${oxygenRatingDec * carbonDyoxideRatingDec}`
    );
  } catch (e) {
    console.error(e);
  }
})();
