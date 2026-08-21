function jumpingOnClouds(c) {

    let index = 0;
    let counter = 0;
    let jumpidx1 =0;
    let jumpidx2 =0;
    while (index<c.length-1){
        //console.log(index,"los indices van",jumpidx1,jumpidx2,"y el counter a",counter);
        //salto de 1
        if (c[index+1]==1){
            //console.log("salto de 1 a pos:",index+1,"agua")
        } 
        else {
            jumpidx1 = index+1;
        }
        // salto de 2
        if (c[index+2]==1){
            //console.log("salto de 2 a pos:",index+2,"agua")
        }
        else {
            jumpidx2 = index+2;
        }        
        if (jumpidx1==jumpidx2){            
            counter--;
        }
        index = jumpidx1>jumpidx2?jumpidx1:jumpidx2;        
        counter++;
    }
    return counter;        
}


console.log(jumpingOnClouds([0,1,0,0,0,1,0]));

//console.log(jumpingOnClouds([0,0,1,0,0,1,0]));
