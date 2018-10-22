//Grab the canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var c2 = document.getElementById("overlay");
var overlay = c2.getContext("2d");

setTimeout(()=>{
    drawRect(0,0,800,600,"white",0.6)
},40)
//This starts the recursive tree drawLine(startx,starty,lengthOfBranch,angle,color,branchPieces)
//createBranch(200,600,30,-90,randomDarkColor(),8)
setTimeout(()=>{
    createBranch(400,600,50,-90,randomColor(),12)
    console.log("done")
},5)
// setTimeout(()=>{
//     createBranch(200,600,50,-90,randomColor(),10)
// },1000)
// setTimeout(()=>{
//     createBranch(600,600,50,-90,randomColor(),8)
// },1500)

//createBranch(600,600,30,-90,randomColor(),9)

function createBranch(x1,y1,length,angle,color,branchPieces){
        //sin and cos only work with radians so convert
        var radian = (Math.PI/180.0)* angle;
        //find the second point x and y
        var x2 = x1+(length*Math.cos(radian));
        var y2 = y1+(length*Math.sin(radian));

        //draw the actual branch to the canvas
        drawLine(x1,y1,x2,y2,color,branchPieces)

        //decide new random factors
        var branchLength = (Math.random()*20)+10
        //different branch style
        //var branchLength = length-(Math.random()*8)
        var branchReducer = Math.floor(Math.random()*2)+1//4 is a good number smaller numbers give more branches
        //var branchReducer = 1;
        var randomAngle1 = angle-Math.random()*40
        var randomAngle2 = angle+Math.random()*40
        //colors get more complex so moved them in to their own function
        var color1= adjustColor(color)
        var color2= adjustColor(color)
        
    //set delay so we can see tree grow
    setTimeout(function(){
        if (branchPieces>0){//<<< this is the exit strategy if we ran out we stop calling the functions
            createBranch(x2,y2,branchLength,randomAngle1,color1,branchPieces-branchReducer)//if we didnt reduce the branchPieces we would continue forever
            createBranch(x2,y2,branchLength,randomAngle2,color2,branchPieces-branchReducer)//branchReducer is just a random number so that some branches end up longer than others
            if(Math.random()*10>9){
                createBranch(x2,y2,branchLength,angle,color,branchPieces)
            }
        }
        else{
            //here is where you would draw a leaf at the end of a branch
            //drawLeaf(x,y,color,radius)
            drawLeaf(x2,y2,rotateColor(color),(Math.random()*2)+1)
        }
    },5)    
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
}

//Return the opposite color
function inverseColor(color){
    var newColor = color.replace(/[^\d,]/g, '').split(",")
    newColor.forEach(function (color){
        return color
    })
    //convert from string to int
    var r = 255 - (parseInt(newColor[0],10));
    var g = 255 - (parseInt(newColor[1],10));
    var b = 255 - (parseInt(newColor[2],10));
    
    //clamp between values so they dont run away
    r = clamp(r,0,255)
    g = clamp(g,0,255)
    b = clamp(b,0,255)
    
    return `rgb(${r},${g},${b})`
}
//rotate the color order rgb = gbr
function rotateColor(color){
    var newColor = color.replace(/[^\d,]/g, '').split(",")
    newColor.forEach(function (color){
        return color
    })
    
    //convert from string to int
    var r = 255 - (parseInt(newColor[1],10));
    var g = 255 - (parseInt(newColor[2],10));
    var b = 255 - (parseInt(newColor[0],10));
    
    return `rgb(${r},${g},${b})`
}


//swap the values of color in random direction rgb = rgb,rbg,brg,bgr,grb,gbr
function shuffleColor(color){
    var newColor = color.replace(/[^\d,]/g, '').split(",")
    newColor.forEach(function (color){
        return color
    })
    shuffledColor = shuffle(newColor);
    //convert from string to int
    var r = 255 - (parseInt(shuffledColor[0],10));
    var g = 255 - (parseInt(shuffledColor[1],10));
    var b = 255 - (parseInt(shuffledColor[2],10));
    
    return `rgb(${r},${g},${b})`
}

function shuffle(array){
    var newArray = [];
    var count = array.length
    for (var i=0;i<count;i++){
        random = Math.floor(Math.random()*array.length)
        newArray.push(array[random])
        array.splice(random,1)
    }
    return newArray;
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
    ctx.lineWidth = clamp(width,1,100); // just ensure the width is acutally positive as it could come in negative
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color
    //ctx.lineJoin = "round";
    ctx.stroke();
    //Fill gaps made from attaching two rectangles together at an angle by placing a circle inbetween
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.arc(x2,y2,clamp(width/2,0,100),0,2*Math.PI);  
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function drawLeaf(x,y,color,radius){
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(x,y);
    ctx.arc(x,y,radius,0,2*Math.PI)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke();
}

function drawRect(x1,y1,x2,y2,color,alpha){
    //overlay.beginPath
    overlay.fillStyle = color
    overlay.globalAlpha = alpha;
    overlay.fillRect(x1, y1, x2, y2);
    //overlay.globalAlpha = 1;
}



