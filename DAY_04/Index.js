

function attachEventListeners(){
    let count=0;
    document.getElementById("clickMe").addEventListener("click", function xyz(){
    console.log("Button clicked",++count);
        });
}
attachEventListeners() ;