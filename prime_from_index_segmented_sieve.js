/*
  Thank you: https://github.com/mCodingLLC/prime_sieve.git
  for the approash reference

  This approach consume large amount of stack size of memery when collecting too many prime number in array
  Recommended to increase stack-size when running with node

  node --stack-size=8192 prime_from_index_segmented_sieve.js
*/

function smallest_multiple_of_n_geq_m (n, m) {
  return m + -m % n
}

class PrimeListSieve {

  constructor() {
    this._primes = [2, 3, 5, 7];
    this.end_segment = 1;
    this.extend_at_most_n_segments_target = 10;
  }

  get primes() {
    return this._primes;
  }

  _extend_at_most_n_segments(n) {
    let k = this.end_segment;
    n = Math.min(n, (this._primes.length) - 1 - k);
    let p = this._primes[k];
    let q = this._primes[k + n];
    let segment = Array.from({ length: q * q - p * p - 1 }, (_, i) => p * p + i);
    // let segment_min = Math.min(...segment);
    const segment_sorted = segment.sort((a, b) => a-b);
    let segment_min = segment_sorted[0];
    let segment_len = segment.length;
    let is_prime = Array.from({ length: segment_len }, () => true);

    for (let i = 0; i < k + n; i++) {
      let pk = this._primes[i];
      let start = smallest_multiple_of_n_geq_m(pk, segment_min);
      for (let j=start-segment_min; j<(segment_len-(start-segment_min)); j+=pk) {
        is_prime[j] = false;
      }
    }

    let primesToAdd = segment.filter((_, i) => is_prime[i]);
    this._primes.push(...primesToAdd);
    this.end_segment += n;
  }

  _extend() {
    this._extend_at_most_n_segments(this.extend_at_most_n_segments_target);
  }
}


function primeAt (n) {
  // Rename the variable to avoid a naming conflict with the class
  const myPrimeSieve = new PrimeListSieve();

  // Generate primes up to 1000
  while (myPrimeSieve.primes.length < n) {
    myPrimeSieve._extend();
    process.stdout.write(`\rCurrent prime number generated: ${myPrimeSieve.primes.length} of ${n}`);
  }

  return myPrimeSieve.primes[n-1]
}

console.time('timer')

const input = 20000000;
const output = primeAt(input);
console.log("\n\nInput: " + input)
console.log("Output: " + output + "\n");

console.timeEnd('timer');

