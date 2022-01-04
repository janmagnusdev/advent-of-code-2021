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

// do all this bit stuff in binary numbers??

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
