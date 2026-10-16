/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var possibleStringCount = function(word, k) {
    const MAX = 10**9 + 7;
    const maxPossibleLength = word.length;

    if (k<1 || k>2000)
        return 0;
    if (maxPossibleLength<1 || maxPossibleLength>5*10**5)
        return 0;
    if (k>maxPossibleLength)
        return 0;    
    if (k===maxPossibleLength)
        return 1;    
        
    let numblock=1;
    let blocksQty = [];
    //cuento bloques de misma letra
    for (let i = 1; i<word.length; i++){        
        if (word[i]!==word[i-1]){
            blocksQty.push(numblock);
            numblock=1;            
        }
        else {
            numblock++;
        }
    }
    blocksQty.push(numblock);
    const numBlocks = blocksQty.length;
    
    //console.log("Max Possible Length",maxPossibleLength);
    //Empiezo parte de programacion dinamica, usamos i+1 for block index to make dp table indexing easier (dp[0] is base case)
    const tabla_dp = Array(numBlocks + 1).fill(0).map(() => Array(maxPossibleLength + 1).fill(0));
    //0 bloques para una palabra vacia(j=0) solo hay una forma de colocarlo
    tabla_dp[0][0] = 1;
    for (i=0; i<numBlocks; i++){
        const currentBlockMaxLen = blocksQty[i];
        //console.log("Bloque",i+1,"Longitud Bloque",currentBlockMaxLen);
        //voy a ir viendo que meto en una palabra que como mucho va a ser de larga, la palabra original
        for (let currentOriginalLen = 0; currentOriginalLen <= maxPossibleLength; currentOriginalLen++) {
            if (tabla_dp[i][currentOriginalLen] > 0) {
                //bucle para ir con 1 hasta con todas las letras del bloque
                for (let lenChoice = 1; lenChoice <= currentBlockMaxLen; lenChoice++) {
                    //console.log("Current length",currentOriginalLen,",Length choice",lenChoice);
                    const nextOriginalLen = currentOriginalLen + lenChoice;
                    if (nextOriginalLen <= maxPossibleLength) {
                        //console.log("\tAdd en bloque",i+1,"posicion",nextOriginalLen,"la suma de bloque, pos, valor",i+1,nextOriginalLen,tabla_dp[i + 1][nextOriginalLen],"\n\tmas la suma de bloque anterior con length anterior, val ",i,currentOriginalLen,tabla_dp[i][currentOriginalLen]);
                        tabla_dp[i + 1][nextOriginalLen] = (tabla_dp[i + 1][nextOriginalLen] + tabla_dp[i][currentOriginalLen]) % MAX;
                    }
                }   
            }
        }        
    }
    /*for (i=0; i<=numBlocks; i++)
        console.log(...tabla_dp[i]);*/
    //Aqui falta el recuento de posibilidades
    let possibleStrings = 0;
    for (let j = k; j <= maxPossibleLength; j++) {
        possibleStrings = (possibleStrings + tabla_dp[numBlocks][j]) % MAX;
    }

    return possibleStrings;

    
};

console.log(possibleStringCount("aabbcc",2));
