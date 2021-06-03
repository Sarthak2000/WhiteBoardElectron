let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");


let activetool = "pencil";
let pencilstroke = 1;
let eraserstroke = 1;
let pencilcolor="black";
ctx.lineCap = "round";
pencil.addEventListener("click", (e) => {
    if (activetool == "pencil") {
        // second time click  
        if (document.querySelector(".pencil-advance").classList.contains("hidden")) {
            document.querySelector(".pencil-advance").classList.remove("hidden");
        }
        else {
            document.querySelector(".pencil-advance").classList.add("hidden");
        }
    } else {
        activetool = "pencil";
        ctx.strokeStyle = pencilcolor;
        ctx.lineWidth = pencilstroke;
    }
})

eraser.addEventListener("click", (e) => {
    if (activetool == "eraser") {
        if (document.querySelector(".eraser-advance").classList.contains("hidden")) {
            document.querySelector(".eraser-advance").classList.remove("hidden");
        }
        else {
            document.querySelector(".eraser-advance").classList.add("hidden");
        }
    } else {
        ctx.lineWidth = eraserstroke;
        activetool = "eraser";
        ctx.strokeStyle = "white";
    }
})

document.querySelector(".pencil-range").addEventListener("change", function (e) {
    pencilstroke = e.target.value;
    ctx.lineWidth = pencilstroke;
})
let clrs = document.querySelectorAll(".clr");
for (let i = 0; i < clrs.length; i++) {
    clrs[i].addEventListener("click", (e) => {
        pencilcolor=e.target.classList[1];
        ctx.strokeStyle = pencilcolor; 
    })
}
document.querySelector(".eraser-range").addEventListener("change", function (e) {
    eraserstroke = e.target.value;
    ctx.lineWidth = eraserstroke;
})