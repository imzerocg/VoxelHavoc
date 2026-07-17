class Bldg {
    constructor(x, y, t, typ) { this.x = x; this.y = y; this.t = t; this.typ = typ; }
    
    draw() {
        ctx.save(); 
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'rgba(0,0,0,0.4)'; 
        ctx.beginPath(); 
        ctx.ellipse(0, 10, 25, 10, 0, 0, Math.PI*2); 
        ctx.fill();
        ctx.strokeStyle = colors[this.t]; 
        ctx.lineWidth = 2;
        
        if(this.typ === 'house') { 
            ctx.fillStyle = '#8B4513'; ctx.fillRect(-15,-10,30,20); 
            ctx.fillStyle = '#A52A2A'; ctx.beginPath(); ctx.moveTo(-20,-10); ctx.lineTo(0,-25); ctx.lineTo(20,-10); ctx.fill(); 
            ctx.strokeRect(-15,-10,30,20); 
        }
        ctx.restore();
    }
}
