class FloatTxt {
    constructor(x, y, txt) { this.x = x; this.y = y; this.txt = txt; this.l = 40; this.vy = -1.5; }
    update() { this.y += this.vy; this.l--; }
    draw() { 
        ctx.fillStyle = '#ff4d4d'; ctx.globalAlpha = Math.max(0, this.l / 40); 
        ctx.font = "bold 16px sans-serif"; ctx.shadowBlur = 2; ctx.shadowColor = 'black';
        ctx.fillText(this.txt, this.x - 10, this.y); 
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }
}

class Part {
    constructor(x, y, c) { 
        this.x = x; this.y = y; this.c = c; this.l = 15 + Math.random() * 15; 
        this.vx = (Math.random() - 0.5) * 6; this.vy = (Math.random() - 0.5) * 6; 
    }
    update() { this.x += this.vx; this.y += this.vy; this.l--; }
    draw() { ctx.fillStyle = this.c; ctx.globalAlpha = Math.max(0, this.l / 30); ctx.fillRect(this.x, this.y, 3, 3); ctx.globalAlpha = 1; }
}

class Proj {
    constructor(x, y, tgt, dmg, tm, typ) {
        this.x = x; this.y = y; this.tgt = tgt; 
        this.dmg = dmg; this.tm = tm; this.typ = typ;
        const a = Math.atan2(tgt.y - y, tgt.x - x);
        const spd = typ === 'cannonball' ? 18 : 12;
        this.vx = Math.cos(a) * spd; this.vy = Math.sin(a) * spd; this.act = true;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if(Math.random() > 0.3) particles.push(new Part(this.x, this.y, this.typ === 'cannonball' ? '#555' : '#fff'));
        if(this.x < 0 || this.x > cvs.width || this.y < 0 || this.y > cvs.height) this.act = false;
        
        if(this.tgt && this.tgt.hp > 0 && Math.hypot(this.x - this.tgt.x, this.y - this.tgt.y) < (this.tgt.r === 'elephant' ? 45 : 25)) {
            this.tgt.hp -= this.dmg; this.tgt.ft = 5;
            addVFX(this.tgt.x, this.tgt.y, this.dmg);
            
            let pr = this.tgt.r === 'elephant' ? 0.1 : (this.tgt.r === 'cannon' ? 0 : 0.5); 
            if(this.typ === 'cannonball') pr *= 4;
            this.tgt.vx += this.vx * pr; this.tgt.vy += this.vy * pr; this.act = false;
        }
    }
    draw() {
        ctx.shadowBlur = 10; ctx.shadowColor = 'transparent';
        ctx.fillStyle = this.typ === 'cannonball' ? '#222' : '#fff';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.typ === 'cannonball' ? 8 : 6, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
    }
}
