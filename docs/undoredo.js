ctx.lineCap = "round";

// UNDO
document.querySelector("#undo").addEventListener("click", function (e) {
    toredo.push(db.pop());
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // redraw lines
    for (let i = 0; i < db.length; i++) {
        let line = db[i];
        let highlighterundo = false;
        for (let j = 0; j < line.length; j++) {
            let pointobj = line[j];
            if (pointobj.type == "md") {
                ctx.beginPath();
                ctx.moveTo(pointobj.xcord, pointobj.ycord);
                if (pointobj.tool == "highlighter") {
                    highlighterundo = true;
                    ctx.globalCompositeOperation = "multiply";
                    ctx.fillStyle = "#ff0";
                    ctx.fillRect(pointobj.xcord, pointobj.ycord, 20, 20);
                } else {
                    ctx.globalCompositeOperation = "source-over";
                    ctx.strokeStyle = pointobj.color;
                    ctx.lineWidth = pointobj.width;
                }
            }
            else {
                if (highlighterundo) {
                    ctx.fillRect(pointobj.xcord, pointobj.ycord, 20, 20);
                } else {
                    ctx.globalCompositeOperation = "source-over";
                    ctx.lineTo(pointobj.xcord, pointobj.ycord);
                    ctx.stroke();
                }
            }

        }
    }
    ctx.strokeStyle = pencilcolor;
    ctx.lineWidth = pencilstroke;

})

// REDO 


document.querySelector("#redo").addEventListener("click", function (e) {
    if (toredo.length == 0) {
        return;
    }
    let line = toredo.pop();
    let highlighteredo = false;
    db.push(line);
    for (let j = 0; j < line.length; j++) {
        let pointobj = line[j];
        if (pointobj.type == "md") {
            ctx.beginPath();
            ctx.moveTo(pointobj.xcord, pointobj.ycord);
            if (pointobj.tool == "highlighter") {
                highlighteredo=true;
                ctx.globalCompositeOperation = "multiply";
                ctx.fillStyle = "#ff0";
                ctx.fillRect(pointobj.xcord, pointobj.ycord, 20,20);
            } else {
            ctx.strokeStyle = pointobj.color;
            ctx.lineWidth = pointobj.width;
            }
        } 
        else {
            if(highlighteredo){
                ctx.fillRect(pointobj.xcord, pointobj.ycord, 20,20);
            }else{
            ctx.lineTo(pointobj.xcord, pointobj.ycord);
            ctx.stroke();
            }
        }
    }
    highlighteredo = false;
    ctx.strokeStyle = pencilcolor;
    ctx.lineWidth = pencilstroke;
})
