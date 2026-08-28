let findNthDigit = function(n) {
    let longitud=1;
    let count=9;
    let inicio = 1;
    //console.log(longitud,count,inicio,n);
    while (n>longitud*count){        
        n -= longitud * count;
		longitud += 1;
		count *= 10;
		inicio *= 10;
	}
    console.log(n,inicio,longitud);
	inicio += (n - 1)/longitud | 0;
    let s = String(inicio);    
    return Number(s[((n - 1) % s.length)]);
};
    

//console.log(findNthDigit(3));//3

//console.log(findNthDigit(11));//0

console.log(findNthDigit(13));//1
