const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

let ppl = [], projs = [], bldgs = [], particles = [], dmgTexts = [];
let curPwr = 'spawn-normal', wallOpen = false, civOn = true, shakeTime = 0, tIdx = 0;
let gameSpeed = 1; 

let selectedMap = 'Coastal';
let selectedMode = 'Civilization';

const teams = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];
const colors = { 
    blue:'#3498db', red:'#e74c3c', green:'#2ecc71', 
    yellow:'#f1c40f', orange:'#e67e22', purple:'#9b59b6', 
    luffy:'#c0392b', gojo:'#bdc3c7', naruto:'#f39c12', goku:'#e67e22', kurama:'#d35400',
    ichigo:'#222', zoro:'#27ae60', sukuna:'#c0392b', eren:'#7f8c8d' 
};

function setMap(m) {
    selectedMap = m;
    document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function setMode(m) {
    selectedMode = m;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function showLogs() {
    document.getElementById('log-modal').style.display = 'flex';
}

function hideLogs() {
    document.getElementById('log-modal').style.display = 'none';
}

function startGame() {
    document.getElementById('ui-layer').style.display = 'none';
    document.getElementById('log-btn').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    
    // Apply Mode Settings
    if (selectedMode === 'Normal' || selectedMode === 'Animal War' || selectedMode === 'Modern') {
        civOn = false;
    } else {
        civOn = true;
    }
    
    document.getElementById('civBtn').innerText = civOn ? "Civ: ON [C]" : "Civ: OFF [C]"; 
    document.getElementById('current-map-ui').innerText = selectedMap;
    document.getElementById('current-mode-ui').innerText = selectedMode;
    
    rsz(); 
}

function toggleTeam() {
    tIdx = (tIdx + 1) % teams.length;
    let t = teams[tIdx], btn = document.getElementById('teamToggle');
    btn.style.background = colors[t]; btn.innerText = `Team: ${t.toUpperCase()}`;
}

function toggleWall() { 
    wallOpen = !wallOpen; 
    let btn = document.getElementById('wallBtn');
    btn.innerText = wallOpen ? "Wall: OPEN [Spc]" : "Wall: CLOSED [Spc]"; 
    btn.style.background = wallOpen ? "#e67e22" : "#c0392b"; 
}

function toggleCiv() { 
    civOn = !civOn; 
    document.getElementById('civBtn').innerText = civOn ? "Civ: ON [C]" : "Civ: OFF [C]"; 
}

function setPower(p, btn) {
    curPwr = p; 
    let displayTxt = p.replace('spawn-', '').toUpperCase();
    document.getElementById('current-tool').innerText = displayTxt === 'STRIKE' ? 'SMITE' : displayTxt;
    document.querySelectorAll('#sidebar button').forEach(b => { 
        if(!b.id.includes('Toggle') && !b.id.includes('Btn')) b.classList.remove('active'); 
    });
    if(btn) btn.classList.add('active');
}

function addVFX(x, y, dmg) { 
    if(dmg > 0) dmgTexts.push(new FloatTxt(x, y - 20, "-" + Math.floor(dmg))); 
    for(let i = 0; i < 5; i++) particles.push(new Part(x, y, '#e74c3c')); 
}

function rsz() { 
    if (document.getElementById('sidebar').style.display === 'block') {
        cvs.width = window.innerWidth - 280; 
    } else {
        cvs.width = window.innerWidth;
    }
    cvs.height = window.innerHeight; 
}
window.addEventListener('resize', rsz); 
rsz();
