const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// State Arrays
let ppl = [];
let projs = [];
let bldgs = [];
let particles = [];
let dmgTexts = [];

// Game States
let curPwr = 'spawn-normal';
let wallOpen = false;
let civOn = true;
let shakeTime = 0;
let tIdx = 0;

// Configuration
const teams = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];
const colors = { 
    blue:'#3498db', red:'#e74c3c', green:'#2ecc71', 
    yellow:'#f1c40f', orange:'#e67e22', purple:'#9b59b6', 
    luffy:'#c0392b', gojo:'#bdc3c7', naruto:'#f39c12', 
    goku:'#e67e22', kurama:'#d35400' 
};

// Shared Global Functions
function addVFX(x, y, dmg) { 
    if(dmg > 0) dmgTexts.push(new FloatTxt(x, y - 20, "-" + Math.floor(dmg))); 
    for(let i = 0; i < 5; i++) {
        particles.push(new Part(x, y, '#e74c3c')); 
    }
}

