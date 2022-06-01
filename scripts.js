import * as THREE from "three";

let correct = 0;
let accuracy = 0;
let tries = 0;
let num_correct = 0;

function guess(num) {
    tries+=1;
    if (num == correct) {
        num_correct+=1;
    }
    accuracy = Math.round((num_correct/tries)*100);
    
    document.getElementById("accuracy").innerHTML = "Accuracy: "+accuracy+"%";
    document.getElementById("tries").innerHTML = "Tries: "+tries;
    document.getElementById("num_correct").innerHTML = "Number Correct: "+num_correct;
}

function render(cube) {

}