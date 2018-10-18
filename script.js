//Grab the canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//we have a 400 by 400 square to work with

//This starts the recursive tree drawLine(startx,starty,lengthOfBranch,angle,color,branchPieces)
createBranch(400,800,50,-90,randomColor(),10)

function createBranch(x1,y1,length,angle,color,branchPieces){
        //sin and cos only work with radians so convert
        var radian = (Math.PI/180.0)* angle;
        //find the second point x and y
        var x2 = x1+(length*Math.cos(radian));
        var y2 = y1+(length*Math.sin(radian));

        drawLine(x1,y1,x2,y2,color,branchPieces)

        //decide new random factors
        var branchLength = (Math.random()*20)+10
        var branchReducer = Math.floor(Math.random()*4)//4 is a good number smaller numbers give more branches
        var randomAngle1 = angle-Math.random()*35
        var randomAngle2 = angle+Math.random()*35
        //colors get more complex so moved them in to their own function
        
        var color1= adjustColor(color)
        var color2= adjustColor(color)
        
    //set delay so we can see tree grow
    setTimeout(function(){
        if (branchPieces>0){//<<< this is the exit strategy if we ran out we stop calling the functions
            createBranch(x2,y2,branchLength,randomAngle1,color1,branchPieces-branchReducer)//if we didnt reduce the branchPieces we would continue forever
            createBranch(x2,y2,branchLength,randomAngle2,color2,branchPieces-branchReducer)//branchReducer is just a random number so that some branches end up longer than others
            adjustColor(color1);
        }
        else{
            //here is where you would draw a leaf at the end of a branch
            //x,y,color,radius
            drawLeaf(x2,y2,randomColor(),Math.random()*2)
        }
    },50)    
}

//function to make sure a value always stays within an expected range used to make sure colors dont run outside 0-255
function clamp(value,min,max){
    if (value<max){
        if (value<min){
            return min;
        }
        else{return value;}
    }
    else{return max;}
}
function adjustColor(colorString){
    var newColor = colorString.replace(/[^\d,]/g, '').split(",")
    newColor.forEach(function (color){
        return color
    })
    //convert from string to int and add a random give or take 20 units
    var r = parseInt(newColor[0],10)+(Math.floor(Math.random()*40))-20;
    var g = parseInt(newColor[1],10)+(Math.floor(Math.random()*40))-20;
    var b = parseInt(newColor[2],10)+(Math.floor(Math.random()*40))-20;
    //clamp between values so they dont run away
    r = clamp(r,0,255)
    g = clamp(g,0,255)
    b = clamp(b,0,255)
    
    return `rgb(${r},${g},${b})`
    //console.log(`rgb(${r},${g},${b})`)
    //console.log(r,g,b)
}


//The simpliest form of making a random color true random anything goes
function randomColor(){
    var r = Math.floor(Math.random()*255)
    var g = Math.floor(Math.random()*255)
    var b = Math.floor(Math.random()*255)
    return `rgb(${r},${g},${b})`
}

//forces the colors towards the darker spectrum by limiting the maximum value of all three to 100-300 out of 255*3=765 
function randomDarkColor(){
    var total = Math.floor(Math.random()*200)+100;
    var r = clamp(Math.floor(Math.random()*total),0,255);
    total = clamp(total-r,0,1000);
    var b = clamp(Math.floor(Math.random()*total),0,255);
    total = clamp(total-b,0,1000);
    var g = clamp(Math.floor(Math.random()*total),0,255);
    return `rgb(${r},${g},${b})`
}

//forces the colors towards the lighter spectrum by limiting the maximum value of all three to 565 to 765
function randomLightColor(){
    var total = Math.floor(Math.random()*200)+565;
    var r = clamp(Math.floor(Math.random()*total),0,255);
    total = clamp(total-r,0,1000);
    var b = clamp(Math.floor(Math.random()*total),0,255);
    total = clamp(total-b,0,1000);
    var g = clamp(Math.floor(Math.random()*total),0,255);
    return `rgb(${r},${g},${b})`
}

//do the actual drawing on the canvas
function drawLine(x1,y1,x2,y2,color,width){
    ctx.beginPath()
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = color
    ctx.stroke();
}

function drawLeaf(x,y,color,radius){
    ctx.beginPath()
    ctx.moveTo(x,y);
    ctx.arc(x,y,radius,0,2*Math.PI)
    ctx.strokeStyle = color
    ctx.fill()
    ctx.stroke();
}



