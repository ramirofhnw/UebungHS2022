function faerben() {
    console.log("Text wird gefärbt")

    var random = Math.floor(Math.random()*16777215).toString(16);

    var farbe = "#" + random;

    var d = document.getElementById("output");
    d.style.color = farbe;
    d.style.fontSize = '200px';
    d.innerHTML = document.querySelector("input").value;
   
}

