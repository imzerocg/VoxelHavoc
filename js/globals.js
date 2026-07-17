const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

let ppl = [], projs = [], bldgs = [], particles = [], dmgTexts = [];
let curPwr = 'spawn-normal', wallOpen = false, civOn = true, shakeTime = 0, tIdx = 0;
let gameSpeed = 1; 

let selectedMap = 'Coastal';
let selectedMode = 'Civilization';

// FIXED: Reduced to only Blue and Red teams
const teams = ['blue', 'red'];
const colors = { 
    blue:'#3498db', red:'#e74c3c', 
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
function showLogs() { document.getElementById('log-modal').style.display = 'flex'; }
function hideLogs() { document.getElementById('log-modal').style.display = 'none'; }

function startGame() {
    document.getElementById('ui-layer').style.display = 'none';
    document.getElementById('log-btn').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    
    civOn = !(selectedMode === 'Normal' || selectedMode === 'Animal War' || selectedMode === 'Modern');
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
    document.querySelectorAll('#sidebar button').forEach(b => { 
        if(b.classList.contains('army-btn') || b.classList.contains('legend-btn')) b.classList.remove('active'); 
    });
    if(btn) btn.classList.add('active');
}
function addVFX(x, y, dmg) { 
    if(dmg > 0) dmgTexts.push(new FloatTxt(x, y - 20, "-" + Math.floor(dmg))); 
    for(let i = 0; i < 5; i++) particles.push(new Part(x, y, '#e74c3c')); 
}
function rsz() { 
    cvs.width = window.innerWidth - (document.getElementById('sidebar').style.display === 'block' ? 280 : 0);
    cvs.height = window.innerHeight; 
}
window.addEventListener('resize', rsz); rsz();
