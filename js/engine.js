function rsz() { 
    cvs.width = window.innerWidth - 280; 
    cvs.height = window.innerHeight; 
}
window.addEventListener('resize', rsz); 
rsz();

function startGame() { 
    document.getElementById('start-screen').style.display = 'none'; 
}

function toggleTeam() {
    tIdx = (tIdx + 1) % teams.length;
    let t = teams[tIdx];
    let btn = document.getElementById('teamToggle');
    btn.style.background = colors[t]; 
    btn.innerText = `Team: ${t.toUpperCase()}`;
}

function toggleWall() { 
    wallOpen = !wallOpen; 
    document.getElementById('wallBtn').innerText = wallOpen ? "Wall: OPEN" : "Wall: CLOSED"; 
    document.getElementById('wallBtn').style.background = wallOpen ? "#e67e22" : "#c0392b"; 
}

function toggleCiv() { 
    civOn = !civOn; 
    document.getElementById('civBtn').innerText = civOn ? "Civ: ON" : "Civ: OFF"; 
}

function setPower(p, btn) {
    curPwr = p; 
    let displayTxt = p.replace('spawn-', '').toUpperCase();
    document.getElementById('current-tool').innerText = displayTxt === 'STRIKE' ? 'SMITE' : displayTxt;
    
    document.querySelectorAll('#sidebar button').forEach(b => { 
        if(!b.id.includes('Toggle') && !b.id.includes('Btn')) {
            b.classList.remove('active'); 
        }
    });
    btn.classList.add('active');
}

cvs.addEventListener('mousedown', (e) => {
    let r = cvs.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    
    if(curPwr === 'cannon') { 
        let pE = false; 
        ppl.forEach(p => { 
            if(p.r === 'elephant' && p.t === teams[tIdx] && Math.hypot(p.x - x, p.y - y) < 60 && !p.hC) { 
                p.hC = true; 
                pE = true; 
            }
        }); 
        if(!pE && ppl.filter(p => p.t === teams[tIdx]).length < 150) {
            ppl.push(new Person(x, y, teams[tIdx], 'cannon')); 
        }
    }
    else if(curPwr.startsWith('spawn-')) { 
        let rl = curPwr.split('-')[1];
        let tm = ['luffy', 'gojo', 'naruto', 'goku'].includes(rl) ? rl : teams[tIdx]; 
        if(ppl.filter(p => p.t === tm).length < 150) {
            ppl.push(new Person(x, y, tm, rl)); 
        }
    }
    else { 
        ppl.forEach(p => { 
            if(Math.hypot(p.x - x, p.y - y) < (p.r === 'elephant' ? 120 : 100)) { 
                if(curPwr === 'fire') { p.hF = true; p.hI = p.hL = p.hW = false; } 
                if(curPwr === 'ice') { p.hI = true; p.hF = p.hL = p.hW = false; } 
                if(curPwr === 'light') { p.hL = true; p.hF = p.hI = p.hW = false; } 
                if(curPwr === 'wind') { p.hW = true; p.hF = p.hI = p.hL = false; } 
                if(curPwr === 'weapon' && !p.isA && p.r !== 'elephant' && p.r !== 'cannon') {
                    p.wpn = Math.random() > 0.5 ? 'sword' : 'spear'; 
                }
                if(curPwr === 'strike') { 
                    p.hp = 0; 
                    p.ft = 10; 
                    addVFX(p.x, p.y, 9999); 
                } 
            }
        });
    }
});

function animate() {
    ctx.save();
    if(shakeTime > 0) { 
        ctx.translate((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15); 
        shakeTime--; 
    }

    let wH = cvs.height * 0.3;  
    let sH = cvs.height * 0.55; 

    // Ocean
    ctx.fillStyle = '#0984e3'; 
    ctx.fillRect(0, 0, cvs.width, wH);
    let t = Date.now() / 300;
    ctx.fillStyle = '#74b9ff'; 
    ctx.globalAlpha = 0.4;
    for(let i=0; i<cvs.width; i+=40) {
        ctx.beginPath(); 
        ctx.arc(i + (Math.sin(t + i*0.05)*10), wH + (Math.cos(t + i*0.05)*5) - 10, 20, 0, Math.PI); 
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Sand
    ctx.fillStyle = '#ffeaa7'; 
    ctx.fillRect(0, wH, cvs.width, sH - wH);

    // Plains
    ctx.fillStyle = '#2d5a27'; 
    ctx.fillRect(0, sH, cvs.width, cvs.height - sH);
    
    // Grid
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; 
    ctx.lineWidth = 1;
    for(let i=0; i<cvs.width; i+=50){ ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); } 
    for(let j=0; j<cvs.height; j+=50){ ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }
    
    // Peace Wall
    if(!wallOpen){ 
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; 
        ctx.fillRect(cvs.width/2 - 5, 0, 10, cvs.height); 
    }
    
    bldgs.forEach(b => b.draw()); 
    ppl = ppl.filter(p => p.hp > 0); 
    ppl.forEach(p => { p.update(); p.draw(); });
    
    projs.forEach(p => { p.update(); p.draw(); }); 
    projs = projs.filter(p => p.act);
    
    particles.forEach(p => { p.update(); p.draw(); }); 
    particles = particles.filter(p => p.l > 0);
    
    dmgTexts.forEach(d => { d.update(); d.draw(); }); 
    dmgTexts = dmgTexts.filter(d => d.l > 0);

    ctx.restore();
    
    document.getElementById('total-count').innerText = ppl.length;
    requestAnimationFrame(animate);
} 

setTimeout(animate, 100);
