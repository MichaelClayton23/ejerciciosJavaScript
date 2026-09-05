function fib(n) {
  if (n === 0) return 0n;
  
  // Handle negative numbers using the identity: fib(-n) = (-1)^(n+1) * fib(n), I mean the complementary
  let isNegative = n < 0;
  let absN = isNegative ? -n : n;
  
  let [a, b] = fibPair(absN);
  
  if (isNegative && absN % 2 === 0) {
    return -a;
  }
  return a;
}

// Helperfunc Fast Doubling
function fibPair(n) {
  if (n=== 0n || n === 0) return [0n, 1n];
  
  let half = fibPair(Math.floor(n / 2));
  let c = half[0]; // F(k)
  let d = half[1]; // F(k+1)
  
  let twoDMinusC = (2n * d) - c;
  let f2k = c * twoDMinusC;               // F(2k)=F(k)*[2*F(k+1) - F(k)]
  let f2k1 = (c * c) + (d * d);    // F(2k+1)=F(k)^2+ F(k+1)^2
  
  if (n % 2 === 0) {
    return [f2k, f2k1];
  } else {
    return [f2k1, f2k + f2k1];
  }
}

console.log(fib(10));
//console.log(fib(-8));