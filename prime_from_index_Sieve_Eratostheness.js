/*
  This approach is fast but not work with large number

  TODO: Figure out why
*/

function primeAt (n) { // Usingn Sieve of Eratosthenes algorithm
  // generate array fron [2, 3, 4, ..., n]
  const ceiling = Math.ceil(n * Math.log(n) + n * Math.log(Math.log(n)));
  let soe = Array.from({ length: ceiling }, (_, i) => i + 2);

  for (let i = 0; i * i < ceiling; i++) {
    if (soe[i] != -1) { // still prime number
      for (let l = i + soe[i]; l < soe.length; l += soe[i]) {
        soe[l] = -1;
      }
    }
  }

  const ans = soe.filter(item => item != -1);

  return ans[n-1]
}

console.time('timer')

console.log(primeAt(50000))

console.timeEnd('timer');