let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

let pencilstroke = 1;
let eraserstroke = 1;
let pencilcolor = "black";
ctx.lineCap = "round";

//Pencil
pencil.addEventListener("click", PencilFunction)
function PencilFunction(e) {
    if (pencil.classList.contains("active-class")) {
        // second time click  
        if (document.querySelector(".pencil-advance").classList.contains("hidden")) {
            document.querySelector(".pencil-advance").classList.remove("hidden");
        }
        else {
            document.querySelector(".pencil-advance").classList.add("hidden");
        }
    } else {
        activetool = "pencil";
        pencilcolor = "black";
        ctx.strokeStyle = pencilcolor;
        ctx.lineWidth = pencilstroke;
    }
    if (document.querySelector(".active-class")) {
        document.querySelector(".active-class").classList.remove("active-class");
    }
    pencil.classList.add("active-class");
}

// Advance Pencil Options
// 1. Pencil Stroke Width
document.querySelector(".pencil-range").addEventListener("change", function (e) {
    pencilstroke = e.target.value;
    ctx.lineWidth = pencilstroke;
})
// 2. Pencil Colors
let clrs = document.querySelectorAll(".clr");
for (let i = 0; i < clrs.length; i++) {
    clrs[i].addEventListener("click", (e) => {
        pencilcolor = e.target.classList[1];
        ctx.strokeStyle = pencilcolor;
    })
}

//Eraser
eraser.addEventListener("click", (e) => {
    if (eraser.classList.contains("active-class")) {
        // Open Advance Eraser Options
        if (document.querySelector(".eraser-advance").classList.contains("hidden")) {
            document.querySelector(".eraser-advance").classList.remove("hidden");
        }
        else {
        // Remove Advance Eraser Options
            document.querySelector(".eraser-advance").classList.add("hidden");
        }
    }
    else {
        ctx.lineWidth = eraserstroke;
        activetool = "eraser";
        pencilcolor = "white";
        ctx.strokeStyle = pencilcolor;
    }

    if (document.querySelector(".active-class")) {
        document.querySelector(".active-class").classList.remove("active-class");
    }
    eraser.classList.add("active-class");
})
// Advance Eraser Menu => Eraser Stroke
document.querySelector(".eraser-range").addEventListener("change", function (e) {
    eraserstroke = e.target.value;
    ctx.lineWidth = eraserstroke;
})

// Highlighter
document.querySelector("#highlighter").addEventListener("click", (e) => {
    if (activetool == "highlighter") {
        return;
    }
    if (document.querySelector(".active-class")) {
        document.querySelector(".active-class").classList.remove("active-class");
    }
    document.querySelector("#highlighter").classList.add("active-class");
    activetool = "highlighter";
    highlighteffect = true;
})
