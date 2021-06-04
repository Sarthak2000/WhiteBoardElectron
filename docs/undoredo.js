ctx.lineCap = "round";

// UNDO
document.querySelector("#undo").addEventListener("click", function (e) {
    if (db.length == 0) {
        return;
    }
    document.querySelector("#undo").classList.add("active-class");
    setTimeout(() => {
        document.querySelector("#undo").classList.remove("active-class");
    }, 100);
    toredo.push(db.pop());
    //activate redo
    document.querySelector("#redo").classList.remove("opacity");
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // redraw lines
    redrawundolines(db)
    // Reset Previous style
    ctx.strokeStyle = pencilcolor;
    if (activetool == "pencil") {
        ctx.lineWidth = pencilstroke;
    } else {
        ctx.lineWidth = eraserstroke;
    }
})


// REDO 
document.querySelector("#redo").addEventListener("click", function (e) {

    if (toredo.length == 0) {
        document.querySelector("#redo").classList.add("opacity");
        return;
    }
    document.querySelector("#redo").classList.add("active-class");
    setTimeout(() => {
        document.querySelector("#redo").classList.remove("active-class");
    }, 100);

    // get a line from redo array
    let line = toredo.pop();
    let highlighteredo = false;

    //store it in db
    db.push(line);

    // redraw that line
    for (let j = 0; j < line.length; j++) {
        let pointobj = line[j];
        if (pointobj.type == "md") {
            ctx.beginPath();
            ctx.moveTo(pointobj.xcord, pointobj.ycord);
            if (pointobj.tool == "highlighter") {
                highlighteredo = true;
                ctx.globalCompositeOperation = "multiply";
                ctx.fillStyle = "#ff0";
                ctx.fillRect(pointobj.xcord, pointobj.ycord, 20, 20);
            } else {
                ctx.strokeStyle = pointobj.color;
                ctx.lineWidth = pointobj.width;
            }
        }
        else {
            if (highlighteredo) {
                ctx.fillRect(pointobj.xcord, pointobj.ycord, 20, 20);
            } else {
                ctx.lineTo(pointobj.xcord, pointobj.ycord);
                ctx.stroke();
            }
        }
    }
    // Reset Previous Style
    highlighteredo = false;
    ctx.strokeStyle = pencilcolor;
    ctx.strokeStyle = pencilcolor;
    if (activetool == "pencil") {
        ctx.lineWidth = pencilstroke;
    } else {
        ctx.lineWidth = eraserstroke;
    }
})


function redrawundolines (db){
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
}

