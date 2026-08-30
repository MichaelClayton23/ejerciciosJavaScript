const longestPalindrome = function(s) {
    let longitud = s.length;
    let dp = Array.from({ length: longitud }, () => new Array(longitud).fill(false));
    let indices_palindromo = [0, 0];
    //caso base para word impar
    for (let i = 0; i < longitud; i++) {
        dp[i][i] = true;
    }
    //caso base para word par
    for (let i = 0; i < longitud - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            indices_palindromo = [i, i + 1];            
        }
    }
    for (let diff = 2; diff < longitud; diff++) {
        for (let i = 0; i < longitud - diff; i++) {
            let j = i + diff;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                indices_palindromo = [i, j];
            }
        }
    }
    return s.slice(indices_palindromo[0], indices_palindromo[1]+ 1);    
};

console.log(longestPalindrome('ddffrffdrrdd'));
console.log(longestPalindrome('d'));


/*Opocion Ganadora en cuanto a rendimiento*/
const longestPalindromeOptimus = function(s) {
    let longest = "";

    if (s === reverseString(s)) {
        return s;
    }

    for (let i = 0; i < s.length; i++) {
        let odd = expandAroundCenter(s, i, i);
        let even = expandAroundCenter(s, i, i + 1);

        let current = odd.length > even.length ? odd : even;

        if (current.length > longest.length) {
            longest = current;
        }
    }

    return longest;
};

const reverseString = function(temp) {
    return temp.split("").reverse().join("");
};

const expandAroundCenter = function(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return s.slice(left + 1, right);
};

console.log(longestPalindromeOptimus('ddffrffdrrdd'));
console.log(longestPalindromeOptimus('d'));