document.getElementById('speedSlider').addEventListener('input', (e) => {
    gameSpeed = parseInt(e.target.value);
    document.getElementById('speed-val').innerText = gameSpeed + 'x';
});

document.addEventListener('keydown', (e) => {
    if(document.getElementById('sidebar').style.display === 'none') return; 
    if(e.code === 'Space') { toggleWall(); e.preventDefault(); }
    if(e.key === 'c' || e.key === 'C') toggleCiv();
    const hotkeys = {
        '1': 'spawn-normal', '2': 'spawn-archer', '3': 'spawn-knight', '4': 'spawn-ninja',
        '5': 'spawn-swapper', '6': 'spawn-shifter', '7': 'spawn-elephant', '8': 'cannon'
    };
    if(hotkeys[e.key]) {
        let btnStr = hotkeys[e.key].replace('spawn-', '');
        let btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes(btnStr));
        setPower(hotkeys[e.key], btn);
    }
});

cvs.addEventListener('mousedown', (e) => {
    if(document.getElementById('sidebar').style.display === 'none') return;
    let r = cvs.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    
    if(curPwr === 'cannon') { 
        let pE = false; 
        ppl.forEach(p => { if(p.r === 'elephant' && p.t === teams[tIdx] && Math.hypot(p.x - x, p.y - y) < 60 && !p.hC) { p.hC = true; pE = true; }}); 
        if(!pE && ppl.filter(p => p.t === teams[tIdx]).length < 150) ppl.push(new Person(x, y, teams[tIdx], 'cannon')); 
    }
    else if(curPwr.startsWith('spawn-')) { 
        let rl = curPwr.split('-')[1];
        let tm = ['luffy', 'gojo', 'naruto', 'goku', 'ichigo', 'zoro', 'sukuna', 'eren'].includes(rl) ? rl : teams[tIdx]; 
        if(ppl.filter(p => p.t === tm).length < 150) ppl.push(new Person(x, y, tm, rl)); 
    }
    else { 
        ppl.forEach(p => { 
            if(Math.hypot(p.x - x, p.y - y) < (p.r === 'elephant' ? 120 : 100)) { 
                // Removed all elements. Only Smite remains.
                if(curPwr === 'strike') { p.hp = 0; p.ft = 10; addVFX(p.x, p.y, 9999); } 
            }
        });
    }
});

// NEW: Smite All Function
function smiteAll() {
    ppl.forEach(p => { p.hp = 0; });
    shakeTime = 40; // Massive screen shake
    // Add chaotic hit effects everywhere
    for(let i=0; i<60; i++) {
        particles.push(new Part(Math.random()*cvs.width, Math.random()*cvs.height, '#e74c3c'));
    }
}

function animate() {
    ctx.save();
    if(shakeTime > 0) { ctx.translate((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15); shakeTime--; }

    let wH = cvs.height * 0.3, sH = cvs.height * 0.55; 

    if(selectedMap === 'Coastal') {
        ctx.fillStyle = '#0984e3'; ctx.fillRect(0, 0, cvs.width, wH);
        let t = Date.now() / 300;
        ctx.fillStyle = '#74b9ff'; ctx.globalAlpha = 0.4;
        for(let i=0; i<cvs.width; i+=40) { ctx.beginPath(); ctx.arc(i + (Math.sin(t + i*0.05)*10), wH + (Math.cos(t + i*0.05)*5) - 10, 20, 0, Math.PI); ctx.fill(); }
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffeaa7'; ctx.fillRect(0, wH, cvs.width, sH - wH);
        ctx.fillStyle = '#2d5a27'; ctx.fillRect(0, sH, cvs.width, cvs.height - sH);
    } 
    else if (selectedMap === 'Volcano') {
        ctx.fillStyle = '#2c3e50'; ctx.fillRect(0, 0, cvs.width, cvs.height); 
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 0, cvs.width, wH); 
        let t = Date.now() / 200;
        ctx.fillStyle = '#f1c40f'; ctx.globalAlpha = 0.6;
        for(let i=0; i<cvs.width; i+=50) { ctx.beginPath(); ctx.arc(i + (Math.sin(t + i*0.08)*5), wH + (Math.cos(t + i*0.08)*5) - 10, 15, 0, Math.PI); ctx.fill(); }
        ctx.globalAlpha = 1;
    }
    else if (selectedMap === 'Mountains') {
        ctx.fillStyle = '#ecf0f1'; ctx.fillRect(0, 0, cvs.width, wH); 
        ctx.fillStyle = '#95a5a6'; ctx.fillRect(0, wH, cvs.width, sH - wH); 
        ctx.fillStyle = '#27ae60'; ctx.fillRect(0, sH, cvs.width, cvs.height - sH); 
    }

    if (document.getElementById('ui-layer').style.display === 'none') {
        ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 1;
        for(let i=0; i<cvs.width; i+=50){ ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); } 
        for(let j=0; j<cvs.height; j+=50){ ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }
        
        if(!wallOpen){ ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(cvs.width/2 - 5, 0, 10, cvs.height); }
        
        bldgs.forEach(b => b.draw()); 
        
        for(let steps = 0; steps < gameSpeed; steps++) {
            ppl.forEach(p => p.update()); projs.forEach(p => p.update());
            particles.forEach(p => p.update()); dmgTexts.forEach(d => d.update());
        }

        ppl = ppl.filter(p => p.hp > 0); ppl.forEach(p => p.draw());
        projs = projs.filter(p => p.act); projs.forEach(p => p.draw());
        particles = particles.filter(p => p.l > 0); particles.forEach(p => p.draw());
        dmgTexts = dmgTexts.filter(d => d.l > 0); dmgTexts.forEach(d => d.draw());

        document.getElementById('total-count').innerText = ppl.length;
    }

    ctx.restore();
    requestAnimationFrame(animate);
} 
setTimeout(animate, 100);
