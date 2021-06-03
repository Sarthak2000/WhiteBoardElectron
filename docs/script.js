let canvas = document.querySelector("#canvas");

// set height width of cavas
let { top: topofscreen } = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - (topofscreen+5);
canvas.width = window.innerWidth;

// resize canvas on screensize change
canvas.addEventListener("resize", (e) => {
    canvas.height = window.innerHeight - (topofscreen+5);
    canvas.width = window.innerWidth;
})

// canvas can draw by default
let ismousedown = false;
let ctx = canvas.getContext('2d');
ctx.lineCap = "round";
// for undo i need to save all mouse events in a db
let db=[];
let lineevent=[];
let toredo = [];
canvas.addEventListener("mousedown", function (e) {
    toredo=[]; // I cannot redo more lines after a new line is drawn
    ismousedown = true;
    let x = e.clientX;
    let y = e.clientY-topofscreen;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let obj={
        type:"md",
        xcord:x,
        ycord:y,
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    lineevent.push(obj);
})
canvas.addEventListener("mousemove", (e)=>{
    if (ismousedown) {
        let x = e.clientX;
        let y = e.clientY-topofscreen;
        ctx.lineTo(x,y);
        ctx.stroke();
        let obj={
            type:"mm",
            xcord:x,
            ycord:y,
        }
        lineevent.push(obj);
    }
})
canvas.addEventListener("mouseup", (e)=>{
    if (ismousedown) {
        ismousedown=false;
        db.push(lineevent);
        lineevent=[];
    }
})
