let correct = 0;
let accuracy = 0;
let tries = 0;
let num_correct = 0;

let scene0;
let scene1;
let cube0;
let cube1;
let camera0;
let camera1;

let item1;
let item2;
let old1;
let old2;

let items = [[1, 1, 1], [1, 2, 1], [3, 2, .5], [1, 1, 2], [4,3,.2]];

function volume(arr) {
    //calculate the volume of a 3 dimensional array
    let volume = 0;
    volume += arr[0] * arr[1] * arr[2];
    return volume;
}

function setCorrect(arr0, arr1) {
    //compare the volume of the two arrays and set "correct" to the larger one
    let vol0 = volume(arr0);
    let vol1 = volume(arr1);

    console.log(vol0);
    console.log(vol1);
    if (vol0 >= vol1) {
        correct = 0;
    } else {
        correct = 1;
    }
}

function start() {

    item1 = items[Math.floor(Math.random()*items.length)];
    item2 = items[Math.floor(Math.random()*items.length)];

    while (item1 == item2) {
        item1 = items[Math.floor(Math.random()*items.length)];
        item2 = items[Math.floor(Math.random()*items.length)];
        console.log("same");
    }

    old1 = item1;
    old2 = item2;

    setCorrect(item1, item2);

    cube0 = createCube(item1);
    startScene0();
    renderScene0();

    cube1 = createCube(item2);
    startScene1();
    renderScene1();
}

function guess(num) {

    scene0.remove(cube0);
    scene1.remove(cube1);

    item1 = items[Math.floor(Math.random()*items.length)];
    item2 = items[Math.floor(Math.random()*items.length)];

    while (item1 == item2 || item1 == old1 || item2 == old2) {
        item1 = items[Math.floor(Math.random()*items.length)];
        item2 = items[Math.floor(Math.random()*items.length)];
        console.log("same");
    }

    old1 = item1;
    old2 = item2;

    setCorrect(item1, item2);

    console.log(correct);

    cube0 = createCube(item1);
    cube0.position.set(0, 0, -7.0);
    scene0.add(cube0);
    cube0.rotation.y -= 0.4;
    cube0.rotation.x += 0.3;

    cube1 = createCube(item2);
    cube1.position.set(0, 0, -7.0);
    scene1.add(cube1);
    cube1.rotation.y -= 0.5;
    cube1.rotation.x += 0.5;

    renderScene0();
    renderScene1();

    tries+=1;
    if (num == correct) {
        num_correct+=1;
    }
    accuracy = Math.round((num_correct/tries)*100);
    
    document.getElementById("accuracy").innerHTML = "Accuracy: "+accuracy+"%";
    document.getElementById("tries").innerHTML = "Tries: "+tries;
    document.getElementById("num_correct").innerHTML = "Number Correct: "+num_correct;
}

function createCube(vals) {
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({color:0xFF00FF}),
        new THREE.MeshBasicMaterial({color:0x393CCE}),
        new THREE.MeshBasicMaterial({color:0x34F4F4}),
        new THREE.MeshBasicMaterial({color:0xFF00FF}),
        new THREE.MeshBasicMaterial({color:0x393CCE}),
        new THREE.MeshBasicMaterial({color:0x34F4F4}),
    ];

    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var cubeGeometry = new THREE.BoxGeometry(vals[0], vals[1], vals[2]);

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    return cube;
}

function startScene0() {
    var canvas0 = document.getElementById('canvas0');
    render0 = new THREE.WebGLRenderer();

    render0.setClearColor(0x000000, 1);

    var canvas0Width = canvas0.getAttribute('width');
    var canvas0Height = canvas0.getAttribute('height');
    render0.setSize(canvas0Width, canvas0Height);

    canvas0.appendChild(render0.domElement);

    scene0 = new THREE.Scene();
    var aspect0 = canvas0Width / canvas0Height;

    camera0 = new THREE.PerspectiveCamera(45, aspect0);
    camera0.position.set(0, 0, 0);
    camera0.lookAt(scene0.position);
    scene0.add(camera0);

    cube0.position.set(0, 0, -7.0);
    scene0.add(cube0);
    cube0.rotation.y -= 0.5;
    cube0.rotation.x += .5;
}

function startScene1() {
    var canvas1 = document.getElementById('canvas1');
    render1 = new THREE.WebGLRenderer();

    render1.setClearColor(0x000000, 1);

    var canvas1Width = canvas1.getAttribute('width');
    var canvas1Height = canvas1.getAttribute('height');
    render1.setSize(canvas1Width, canvas1Height);

    canvas1.appendChild(render1.domElement);

    scene1 = new THREE.Scene();
    var aspect1 = canvas1Width / canvas1Height;

    camera1 = new THREE.PerspectiveCamera(45, aspect1);
    camera1.position.set(0, 0, 0);
    camera1.lookAt(scene1.position);
    scene1.add(camera1);

    cube1.position.set(0, 0, -7.0);
    scene1.add(cube1);
    cube1.rotation.y -= 0.4;
    cube1.rotation.x += 0.3;
}

function renderScene0() {
    render0.render(scene0, camera0);
}

function renderScene1() {
    render1.render(scene1, camera1);
}