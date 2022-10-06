"use strict";

// 1. Aufgabe

var L = [];

for (var i=1; i<100; i=i+2) {
    L.push(i);
}

console.log(L)

// 2. Aufgabe

function wuerfeln() {
    var f = [1,2,3,4,5,6];

    var choice = f.length*Math.random();
    var index = Math.floor(choice);
    return f[index];
}

console.log(wuerfeln())