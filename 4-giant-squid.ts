import axios from "axios";

const getData = async () =>
  await axios.get("https://adventofcode.com/2021/day/4/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fcd01739818d6d32714847f740139d63198a1338a6890b2efde467b312dc5da5164680836385cb744",
    },
  });

(async () => {
  const res = await getData();
  const input = res.data;
})();
