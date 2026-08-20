/*Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. 
For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:*/

function countChange(money, coins) {
  coins.sort((a, b) => a - b); // Sort coins in ascending order
  let dp = new Array(money + 1).fill(0);
  dp[0] = 1; // There's one way to make change for 0 (use no coins)

  for (let coin of coins) {
    console.log(`Using coin: ${coin}`);
    for (let i = coin; i <= money; i++) {
      dp[i] += dp[i - coin];
    }
    console.log(`DP array after using coin ${coin}:`, dp);
  }

  return dp[money];
}


//countChange(4, [1,2]); // => 3
countChange(10, [5,2,3]); // => 4
//countChange(11, [5,7]); // => 0