ctx.lineCap = "round";
document.querySelector("#undo").addEventListener("click", function (e) {
    toredo.push(db.pop());
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // redraw lines
    for (let i = 0; i < db.length; i++) {
        let line = db[i];
        for (let j = 0; j < line.length; j++) {
            let pointobj = line[j];
            if (pointobj.type == "md") {
                ctx.beginPath();
                ctx.moveTo(pointobj.xcord, pointobj.ycord);
                ctx.strokeStyle = pointobj.color;
                ctx.lineWidth = pointobj.width;
            } else {
                ctx.lineTo(pointobj.xcord, pointobj.ycord);
                ctx.stroke();
            }
        }
    }
    ctx.strokeStyle = pencilcolor;
    ctx.lineWidth = pencilstroke;
})
document.querySelector("#redo").addEventListener("click", function (e) {
    if (toredo.length == 0) {
        return;
    }
    let line = toredo.pop();
    db.push(line);

    for (let j = 0; j < line.length; j++) {
        let pointobj = line[j];
        if (pointobj.type == "md") {
            ctx.beginPath();
            ctx.moveTo(pointobj.xcord, pointobj.ycord);
            ctx.strokeStyle = pointobj.color;
            ctx.lineWidth = pointobj.width;
        } else {
            ctx.lineTo(pointobj.xcord, pointobj.ycord);
            ctx.stroke();
        }
    }
    ctx.strokeStyle = pencilcolor;
    ctx.lineWidth = pencilstroke;
})
