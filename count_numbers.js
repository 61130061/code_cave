function solve (input) {
  const map = new Map();
  let max = 0;
  let ans;

  for (let i = 0; i < input.length; i++) {
    const cur = map.get(input[i].toString());
    let count = 1;

    if (cur) {
      count = cur + 1;
    }

    map.set(input[i].toString(), count);

    if (count > max) {
      max = count;
      ans = { result: input[i], count: max };
    }
  }

  return ans;
}

const input = [6, -1, 6, 3, 3, 6, 5, 6, 6, 7]
console.log(input)
console.log(solve(input))