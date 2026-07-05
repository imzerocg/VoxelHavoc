class Person {
    constructor(x,y,tm,r) {
        this.x=x; this.y=y; this.t=tm; this.r=r; 
        this.isA = ['luffy','gojo','naruto','goku','kurama','ichigo','zoro','sukuna','eren'].includes(r);
        if(this.isA) this.t=r;
        
        this.hp = r==='elephant'?750:(r==='knight'?150:(r==='swapper'?120:(r==='cannon'?1:(this.isA?500:100))));
        if(r==='goku'||r==='sukuna') this.hp=750; if(r==='kurama'||r==='eren_titan') this.hp=1000;
        
        this.mHp = this.hp; this.age = 0; this.task = null; this.tTmr = 0; this.cW = false; this.cP = false;
        this.wpn = null; this.hF=false; this.hI=false; this.hL=false; this.hW=false; this.hC=false;
        this.frz=0; this.blnd=0; this.ft=0; this.cd=0; this.pCd=0; this.dT=0;
        this.nO = Math.random()>0.5?1:-1; this.wA = Math.random()*Math.PI*2; this.aA = 0; this.vx=0; this.vy=0;
        this.pTmr=0; this.pX=0; this.pY=0; this.kUse=false; this.kTmr=0; this.gTmr=0; this.gAtk=0;
        this.wTmr=0; this.isSwim=false; 
    }
    
    draw() {
        let bs = (this.r==='elephant'||this.r==='eren_titan')?30:(this.r==='cannon'?15:(this.r==='kurama'?40:12));
        ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(this.x,this.y+bs,bs,bs/2,0,0,Math.PI*2); ctx.fill();
        ctx.save();
        ctx.fillStyle = this.ft>0 ? 'white' : (colors[this.t]||'#fff');
        
        if(this.ft<=0 && this.hF) { ctx.fillStyle='#ff4500'; ctx.shadowBlur=15; ctx.shadowColor='#ff4500'; } 
        if(this.ft<=0 && this.hI) { ctx.fillStyle='#a0e7ff'; ctx.shadowBlur=15; ctx.shadowColor='#a0e7ff'; }
        
        let dir = Math.cos(this.aA)>=0?1:-1; if(this.vx!==0) dir=this.vx>=0?1:-1;

        if(this.r==='luffy' && this.pTmr>0) { ctx.strokeStyle='#f1c27d'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(this.x,this.y); ctx.lineTo(this.pX,this.pY); ctx.stroke(); ctx.fillStyle='#e67e22'; ctx.beginPath(); ctx.arc(this.pX,this.pY,15,0,Math.PI*2); ctx.fill(); this.pTmr--; }
        if(this.r==='goku' && this.kTmr>0) { ctx.shadowBlur=30; ctx.shadowColor='#00ffff'; ctx.fillStyle=`rgba(0,255,255,${this.kTmr/60})`; ctx.fillRect(0,this.y-40,cvs.width,80); ctx.fillStyle=`rgba(255,255,255,${this.kTmr/60})`; ctx.fillRect(0,this.y-20,cvs.width,40); this.kTmr--; ctx.shadowBlur=0; }
        if(this.r==='ichigo' && this.kTmr>0) { ctx.shadowBlur=20; ctx.shadowColor='red'; ctx.fillStyle=`rgba(0,0,0,${this.kTmr/30})`; ctx.fillRect(this.x+(dir*20),this.y-50,dir*150,100); this.kTmr--; ctx.shadowBlur=0; }
        if(this.r==='zoro' && this.kTmr>0) { ctx.shadowBlur=20; ctx.shadowColor='#2ecc71'; ctx.strokeStyle=`rgba(46,204,113,${this.kTmr/20})`; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(this.x,this.y,60,0,Math.PI*2); ctx.stroke(); this.kTmr--; ctx.shadowBlur=0; }
        if(this.r==='sukuna' && this.kTmr>0) { ctx.fillStyle=`rgba(192,57,43,0.3)`; ctx.beginPath(); ctx.arc(this.x,this.y,150,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='red'; ctx.lineWidth=1; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(this.x-150+(Math.random()*300),this.y-150); ctx.lineTo(this.x-150+(Math.random()*300),this.y+150); ctx.stroke(); } this.kTmr--; }
        if(this.r==='gojo' && this.gTmr>0) { 
            ctx.beginPath(); ctx.arc(this.x,this.y,(30-this.gTmr)*5,0,Math.PI*2); 
            if(this.gAtk===1){ctx.shadowBlur=20; ctx.shadowColor='red'; ctx.fillStyle=`rgba(255,0,0,${this.gTmr/30})`; ctx.fill();} 
            if(this.gAtk===2){ctx.shadowBlur=20; ctx.shadowColor='blue'; ctx.fillStyle=`rgba(0,0,255,${this.gTmr/30})`; ctx.fill();} 
            if(this.gAtk===3){ctx.shadowBlur=30; ctx.shadowColor='#8e44ad'; ctx.fillStyle=`rgba(142,68,173,${this.gTmr/30})`; ctx.fillRect(0,this.y-60,cvs.width,120);} 
            this.gTmr--; ctx.shadowBlur=0; 
        }

        if(this.r==='elephant') {
            ctx.beginPath(); ctx.ellipse(this.x,this.y,30,25,0,0,Math.PI*2); ctx.fill();
            ctx.fillRect(this.x-20,this.y+10,10,20); ctx.fillRect(this.x+10,this.y+10,10,20);
            ctx.beginPath(); ctx.arc(this.x+(25*dir),this.y-5,18,0,Math.PI*2); ctx.fill(); ctx.fillRect(this.x+(30*dir),this.y,16*dir,20);
            ctx.fillStyle=colors[this.t]; ctx.beginPath(); ctx.ellipse(this.x+(15*dir),this.y-5,10,15,0,0,Math.PI*2); ctx.fill();
            ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(this.x+(28*dir),this.y-10,3,0,Math.PI*2); ctx.fill();
        } else if(this.r==='cannon') {
            ctx.fillStyle='#333'; ctx.beginPath(); ctx.arc(this.x,this.y,12,0,Math.PI*2); ctx.fill();
            ctx.strokeStyle='#111'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(this.x,this.y); ctx.lineTo(this.x+Math.cos(this.aA)*22,this.y+Math.sin(this.aA)*22); ctx.stroke();
            ctx.fillStyle=colors[this.t]; ctx.beginPath(); ctx.arc(this.x,this.y,6,0,Math.PI*2); ctx.fill();
        } else if(this.r==='kurama') {
            ctx.fillStyle='#d35400'; ctx.shadowBlur=20; ctx.shadowColor='#d35400'; ctx.fillRect(this.x-30,this.y-20,60,40); ctx.beginPath(); ctx.arc(this.x+(30*dir),this.y-10,20,0,Math.PI*2); ctx.fill();
            ctx.fillStyle='#111'; ctx.beginPath(); ctx.moveTo(this.x+(30*dir),this.y-25); ctx.lineTo(this.x+(20*dir),this.y-35); ctx.lineTo(this.x+(40*dir),this.y-25); ctx.fill();
            ctx.strokeStyle='#e67e22'; ctx.lineWidth=5; for(let i=0;i<9;i++){ ctx.beginPath(); ctx.moveTo(this.x-(25*dir),this.y+10); ctx.quadraticCurveTo(this.x-(60*dir),this.y-20+(i*5),this.x-(40*dir),this.y-40+(i*10)); ctx.stroke(); }
            ctx.shadowBlur=0;
        } else if(this.r==='eren_titan') {
            ctx.fillStyle='#d2b48c'; ctx.fillRect(this.x-20,this.y-15,40,30); 
            ctx.beginPath(); ctx.arc(this.x,this.y-25,18,0,Math.PI*2); ctx.fill(); 
            ctx.fillStyle='#111'; ctx.fillRect(this.x-20,this.y-35,40,10); 
        } else {
            ctx.beginPath(); ctx.arc(this.x,this.y-16,10,0,Math.PI*2); ctx.fill(); ctx.fillRect(this.x-8,this.y-6,16,24); ctx.fillRect(this.x-8,this.y+18,6,14); ctx.fillRect(this.x+2,this.y+18,6,14);
            if(this.r==='knight'){ ctx.fillStyle='#8B4513'; ctx.fillRect(this.x-15,this.y-5,30,15); ctx.fillRect(this.x+(10*dir),this.y-15,12,15); ctx.fillStyle='#bdc3c7'; ctx.fillRect(this.x-5,this.y-15,10,15); ctx.beginPath(); ctx.arc(this.x,this.y-20,6,0,Math.PI*2); ctx.fill(); }
            else if(this.r==='ninja'){ ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(this.x,this.y-16,10,0,Math.PI*2); ctx.fill(); ctx.fillRect(this.x-8,this.y-6,16,24); ctx.fillStyle=colors[this.t]; ctx.fillRect(this.x-10,this.y-20,20,5); }
            else if(this.r==='archer'){ ctx.fillStyle='#2ecc71'; ctx.beginPath(); ctx.arc(this.x,this.y-22,8,Math.PI,0); ctx.fill(); ctx.save(); ctx.translate(this.x,this.y-6); ctx.rotate(this.aA); ctx.strokeStyle='#8B4513'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(10,0,15,-Math.PI/2.5,Math.PI/2.5); ctx.stroke(); ctx.restore(); }
            else if(this.r==='luffy'){ ctx.fillStyle='#f1c40f'; ctx.beginPath(); ctx.ellipse(this.x,this.y-22,14,4,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='red'; ctx.fillRect(this.x-8,this.y-23,16,3); }
            else if(this.r==='gojo'){ ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(this.x,this.y-20,11,Math.PI,0); ctx.fill(); ctx.fillStyle='#111'; ctx.fillRect(this.x-10,this.y-18,20,6); }
            else if(this.r==='goku'){ ctx.fillStyle='#111'; for(let i=0;i<5;i++){ctx.beginPath(); ctx.moveTo(this.x,this.y-16); ctx.lineTo(this.x-15+(i*7),this.y-30); ctx.lineTo(this.x+5,this.y-16); ctx.fill();} ctx.fillStyle='#e67e22'; ctx.fillRect(this.x-8,this.y-6,16,24); }
            else if(this.r==='ichigo'){ ctx.fillStyle='#f39c12'; ctx.beginPath(); ctx.arc(this.x,this.y-16,10,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#111'; ctx.fillRect(this.x-8,this.y-6,16,24); ctx.strokeStyle='#bdc3c7'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(this.x+(10*dir),this.y-10); ctx.lineTo(this.x+(10*dir),this.y-40); ctx.stroke(); }
            else if(this.r==='zoro'){ ctx.fillStyle='#2ecc71'; ctx.beginPath(); ctx.arc(this.x,this.y-16,10,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#27ae60'; ctx.fillRect(this.x-8,this.y-6,16,24); ctx.strokeStyle='#ecf0f1'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(this.x-5,this.y-16); ctx.lineTo(this.x+5,this.y-16); ctx.stroke(); }
            else if(this.r==='sukuna'){ ctx.fillStyle='#ffb8b8'; ctx.beginPath(); ctx.arc(this.x,this.y-16,10,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#111'; ctx.fillRect(this.x-10,this.y-20,20,4); ctx.fillStyle='#ecf0f1'; ctx.fillRect(this.x-8,this.y-6,16,24); }
        }

        let aS = (this.r==='elephant'||this.r==='eren_titan')?60:(this.r==='cannon'?0:40);
        ctx.shadowBlur = 0; 
        if(aS>0){ ctx.lineWidth=3; if(this.hL){ctx.shadowBlur=15; ctx.shadowColor='#f1c40f'; ctx.strokeStyle='#f1c40f'; ctx.beginPath(); ctx.arc(this.x,this.y,aS+4,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0;} if(this.hW){ctx.strokeStyle='rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(this.x,this.y,aS,0,Math.PI*2); ctx.stroke();} }
        if(this.blnd>0){ ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(this.x,this.y-(this.r==='elephant'?40:28),10,0,Math.PI*2); ctx.fill(); }
        if(this.wpn && !this.isA && this.r!=='elephant' && this.r!=='cannon' && this.r!=='knight' && this.r!=='archer'){ ctx.strokeStyle='#ecf0f1'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(this.x,this.y); ctx.lineTo(this.x+Math.cos(this.aA)*(this.wpn==='spear'?40:24),this.y+Math.sin(this.aA)*(this.wpn==='spear'?40:24)); ctx.stroke(); }
        
        if(this.r!=='cannon'){ let hy=this.y-((this.r==='elephant'||this.r==='eren_titan')?55:(this.r==='kurama'?45:40)); ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(this.x-15,hy,30,4); let hR=Math.min(1.2,this.hp/this.mHp); ctx.fillStyle=hR>1?'#f1c40f':(hR>0.4?'#2ecc71':'#e74c3c'); ctx.fillRect(this.x-15,hy,hR*30,4); }
        ctx.restore();
    }

    update() {
        if(this.cd>0) this.cd--; if(this.pCd>0) this.pCd--; if(this.dT>0) this.dT--; this.age++;
        
        let wLimit = cvs.height * 0.3; 
        if(this.y < wLimit && selectedMap === 'Coastal') { this.wTmr++; if(this.wTmr > 300) { this.isSwim = true; if(Math.random() > 0.7 && this.vx !== 0) particles.push(new Part(this.x, this.y, '#74b9ff')); } } else { this.wTmr = 0; this.isSwim = false; }

        let pop = ppl.filter(p=>p.t===this.t).length;

        if(this.r === 'eren' && this.age > 400) { this.r = 'eren_titan'; this.hp = 1000; this.mHp = 1000; shakeTime = 20; addVFX(this.x, this.y, 0); }

        if(!wallOpen && civOn && !this.isA && this.r!=='cannon' && this.r!=='kurama' && this.r!=='eren_titan') {
            if(!this.task) {
                if(this.age>100 && this.age%300===0 && this.r!=='elephant' && pop<50 && (selectedMap !== 'Coastal' || this.y > wLimit)) this.task='house';
                else if(this.age>180 && !this.wpn && this.r!=='elephant' && !this.cW && (selectedMap !== 'Coastal' || this.y > wLimit)) {this.task='stonebox';this.cW=true;}
                else if(this.age>600 && !(this.hF||this.hI||this.hW||this.hL) && !this.cP && (selectedMap !== 'Coastal' || this.y > wLimit)) {this.task='shrine';this.cP=true;}
                else if(this.age===480 && this.r==='normal') { let rls=['archer','knight','ninja']; this.r=rls[Math.floor(Math.random()*rls.length)]; if(this.r==='knight'){this.mHp=150;this.hp=150;} }
            }
            if(this.task) {
                let tB=null, mD=Infinity; bldgs.forEach(b=>{ if(b.t===this.t && b.typ===this.task){ let d=Math.hypot(this.x-b.x,this.y-b.y); if(d<mD){mD=d;tB=b;} }});
                if(!tB) bldgs.push(new Bldg(this.x,this.y,this.t,this.task));
                else {
                    let d=Math.hypot(this.x-tB.x,this.y-tB.y);
                    if(d>30){ this.vx+=Math.cos(Math.atan2(tB.y-this.y,tB.x-this.x))*0.4; this.vy+=Math.sin(Math.atan2(tB.y-this.y,tB.x-this.x))*0.4; }
                    else {
                        this.vx*=0.5; this.vy*=0.5; this.tTmr++;
                        if(this.task==='stonebox') this.x+=Math.sin(this.tTmr*0.8)*2; if(this.task==='shrine') this.y+=Math.sin(this.tTmr*0.3)*1.5;
                        if(this.tTmr>80){
                            if(this.task==='house' && pop<50) ppl.push(new Person(this.x+15,this.y+15,this.t,'normal'));
                            else if(this.task==='stonebox') this.wpn=Math.random()>0.5?'sword':'spear';
                            else if(this.task==='shrine') { let r=Math.random(); if(r<0.25)this.hF=true; else if(r<0.5)this.hI=true; else if(r<0.75)this.hW=true; else this.hL=true; }
                            this.task=null; this.tTmr=0;
                        }
                    }
                }
            } else { this.wA+=(Math.random()-0.5)*0.4; let ws=this.r==='elephant'?0.28:0.3; if(this.isSwim) ws*=4; this.vx+=Math.cos(this.wA)*ws; this.vy+=Math.sin(this.wA)*ws; }
        }

        let nE=null, mD=Infinity;
        if(this.hW && this.r!=='cannon'){ ppl.forEach(o=>{ if(o.t!==this.t && o.hp>0){ let d=Math.hypot(this.x-o.x,this.y-o.y); if(d<100){ let a=Math.atan2(o.y-this.y,o.x-this.x), f=(100-d)*0.1; o.vx+=Math.cos(a)*f; o.vy+=Math.sin(a)*f; o.hp-=0.1; addVFX(o.x,o.y,0.1); }}}); }
        
        if((wallOpen||!civOn||this.isA) && this.blnd<=0) {
            this.task=null; this.tTmr=0;
            ppl.forEach(o=>{ if(o.t!==this.t && o.hp>0){ let bW=!wallOpen&&!this.isA&&!o.isA&&((this.t==='blue'&&o.x>cvs.width/2)||(this.t==='red'&&o.x<cvs.width/2)); if(!bW){ let d=Math.hypot(this.x-o.x,this.y-o.y); if(d<mD){mD=d;nE=o;} } }});
        } else { this.blnd--; }

        let sL = this.isA?4.5:(this.r==='cannon'?0.5:(this.r==='elephant'?2.85:(this.r==='knight'?4.0:3.0)));
        if(this.r==='goku'||this.r==='ichigo') sL=6.0; if(this.r==='kurama'||this.r==='eren_titan') sL=2.0; if(this.dT>0) sL=15.0;
        if(this.isSwim && this.frz<=0) sL *= 4; 

        if(nE) {
            let a = Math.atan2(nE.y-this.y, nE.x-this.x); this.aA = a;
            
            if(this.r==='ichigo' && mD<300 && this.cd<=0) { this.kTmr=30; this.cd=150; ppl.forEach(p=>{if(p.t!==this.t && Math.abs(p.y-this.y)<40 && ((Math.cos(a)>0 && p.x>this.x) || (Math.cos(a)<0 && p.x<this.x))){ p.hp-=250; addVFX(p.x, p.y, 250); }}); }
            if(this.r==='zoro' && mD<60 && this.cd<=0) { this.kTmr=20; this.cd=80; ppl.forEach(p=>{if(p.t!==this.t && Math.hypot(this.x-p.x,this.y-p.y)<60){ p.hp-=150; addVFX(p.x,p.y,150); p.vx+=Math.cos(a)*10; p.vy+=Math.sin(a)*10; }}); }
            if(this.r==='sukuna' && mD<150 && this.cd<=0) { this.kTmr=40; this.cd=400; shakeTime=10; ppl.forEach(p=>{if(p.t!==this.t && Math.hypot(this.x-p.x,this.y-p.y)<150){ p.hp-=500; addVFX(p.x,p.y,500); }}); }
            if(this.r==='luffy' && mD<cvs.width/2 && this.cd<=0) { this.pX=nE.x; this.pY=nE.y; this.pTmr=15; this.cd=300; nE.hp-=150; nE.ft=10; addVFX(nE.x, nE.y, 150); nE.vx+=Math.cos(a)*20; nE.vy+=Math.sin(a)*20; }
            if(this.r==='gojo' && mD<300 && this.cd<=0) {
                this.gTmr=30; this.cd=200; let rl=Math.random(); shakeTime = 20; 
                if(rl<0.33) { this.gAtk=1; ppl.forEach(p=>{if(p.t!==this.t&&Math.hypot(this.x-p.x,this.y-p.y)<150){p.hp-=80; addVFX(p.x, p.y, 80); let ang=Math.atan2(p.y-this.y,p.x-this.x); p.vx+=Math.cos(ang)*25; p.vy+=Math.sin(ang)*25;}}); }
                else if(rl<0.66) { this.gAtk=2; ppl.forEach(p=>{if(p.t!==this.t&&Math.hypot(this.x-p.x,this.y-p.y)<250){p.hp-=50; addVFX(p.x, p.y, 50); let ang=Math.atan2(p.y-this.y,p.x-this.x); p.vx-=Math.cos(ang)*20; p.vy-=Math.sin(ang)*20;}}); }
                else { this.gAtk=3; ppl.forEach(p=>{if(p.t!==this.t&&Math.abs(p.y-this.y)<60) { p.hp-=300; addVFX(p.x, p.y, 300); }}); }
            }
            if(this.r==='goku' && mD<400 && !this.kUse) { this.kUse=true; this.kTmr=60; shakeTime = 30; ppl.forEach(p=>{if(p.t!==this.t&&Math.abs(p.y-this.y)<60) { p.hp-=9999; addVFX(p.x, p.y, 9999); }}); }
            if(this.r==='naruto' && this.cd<=0) { ppl.push(new Person(this.x,this.y,this.t,'kurama')); this.cd=600; shakeTime = 10; }
            
            if((this.r==='cannon'||this.hC) && mD<500 && this.pCd<=0 && (wallOpen||Math.abs(this.x-nE.x)>30)){ projs.push(new Proj(this.x,this.y-(this.r==='elephant'?30:0),nE,75,this.t,'cannonball')); this.pCd=150; let rc=this.r==='elephant'?2:5; this.vx-=Math.cos(a)*rc; this.vy-=Math.sin(a)*rc; }
            if(this.r==='shifter' && this.cd<=0 && mD<150 && !nE.isShifter && nE.r!=='cannon' && !nE.isA) { this.r=nE.r; nE.r='normal'; if(nE.hF){this.hF=true;nE.hF=false;} if(nE.hI){this.hI=true;nE.hI=false;} if(nE.hL){this.hL=true;nE.hL=false;} if(nE.hW){this.hW=true;nE.hW=false;} if(nE.wpn){this.wpn=nE.wpn;nE.wpn=null;} this.cd=10; nE.ft=10; nE.vx-=Math.cos(a)*15; nE.vy-=Math.sin(a)*15; }
            if((this.hF||this.hI) && mD<300 && this.pCd<=0 && (wallOpen||Math.abs(this.x-nE.x)>30)){ projs.push(new Proj(this.x,this.y,nE,10,this.t,this.hF?'fire':'ice')); this.pCd=60; this.vx-=Math.cos(a)*5; this.vy-=Math.sin(a)*5; }
            if(!this.isA && this.r!=='archer' && this.r!=='elephant' && this.r!=='eren_titan' && this.r!=='cannon' && mD<150 && mD>50 && this.cd<=0 && this.dT<=0){ this.dT=10; this.cd=80; this.vx+=Math.cos(a)*15; this.vy+=Math.sin(a)*15; }
            if(this.r==='swapper' && this.cd<=0 && mD<150) { let pts = ppl.filter(p=>p!==this && p.r!=='cannon' && p.hp>0 && !p.isA); if(pts.length>0) { nE.hp-=10; nE.ft=5; addVFX(nE.x, nE.y, 10); nE.vx+=Math.cos(a)*10; nE.vy+=Math.sin(a)*10; let tgt=pts[Math.floor(Math.random()*pts.length)], tX=this.x, tY=this.y; this.x=tgt.x; this.y=tgt.y; tgt.x=tX; tgt.y=tY; this.cd=20; this.dT=0; } } 
            else if(this.r==='knight' && this.hp<30) { this.vx-=Math.cos(a)*0.4; this.vy-=Math.sin(a)*0.4; }
            else if(this.r==='ninja') { if(mD<60 && mD>30){ let oA=a+(Math.PI/2)*this.nO; this.vx+=Math.cos(oA)*0.6; this.vy+=Math.sin(oA)*0.6; }else{ this.vx+=Math.cos(a)*0.4; this.vy+=Math.sin(a)*0.4; } }
            else if(this.r==='archer') { if(mD<300 && (wallOpen||Math.abs(this.x-nE.x)>30)){ if(this.cd<=0){ projs.push(new Proj(this.x,this.y,nE,8,this.t,'normal')); this.cd=50;} if(mD<120){this.vx-=Math.cos(a)*0.3; this.vy-=Math.sin(a)*0.3;} }else{ this.vx+=Math.cos(a)*0.2; this.vy+=Math.sin(a)*0.2; } }
            else if(this.dT<=0 && this.r!=='cannon') { let ac=(this.r==='elephant'||this.r==='eren_titan')?0.18:(this.isA?0.3:0.2); if(this.r==='kurama')ac=0.1; if(this.isSwim)ac*=4; this.vx+=Math.cos(a)*ac; this.vy+=Math.sin(a)*ac; }
        } else if((wallOpen||this.isA) && this.r!=='cannon') { this.wA+=(Math.random()-0.5)*0.4; let ws=(this.r==='elephant'||this.r==='eren_titan')?0.28:0.3; if(this.isSwim) ws*=4; this.vx+=Math.cos(this.wA)*ws; this.vy+=Math.sin(this.wA)*ws; }

        this.vx*=0.88; this.vy*=0.88; if(this.frz>0) sL=0.4; let spd=Math.hypot(this.vx,this.vy); if(spd>sL){this.vx=(this.vx/spd)*sL; this.vy=(this.vy/spd)*sL;}
        this.x+=this.vx; this.y+=this.vy; if(this.frz>0) this.frz--;

        if(!wallOpen && !this.isA) { let cx=cvs.width/2, r=(this.r==='elephant'||this.r==='eren_titan')?25:15; if(this.t==='blue'&&this.x>cx-r){this.x=cx-r;this.vx*=-0.5;} else if(this.t==='red'&&this.x<cx+r){this.x=cx+r;this.vx*=-0.5;} }
        let rad=(this.r==='elephant'||this.r==='eren_titan')?25:(this.r==='kurama'?30:15); if(this.x<rad){this.x=rad;this.vx*=-0.5;} if(this.x>cvs.width-rad){this.x=cvs.width-rad;this.vx*=-0.5;} if(this.y<rad){this.y=rad;this.vy*=-0.5;} if(this.y>cvs.height-rad){this.y=cvs.height-rad;this.vy*=-0.5;}

        if(nE && this.r!=='archer' && this.r!=='cannon' && !['gojo','luffy','sukuna','ichigo'].includes(this.r) && this.dT<=0 && this.cd<=0) {
            const d=Math.hypot(this.x-nE.x, this.y-nE.y); let rh=(this.r==='elephant'||this.r==='eren_titan')?70:(this.r==='kurama'?60:(this.wpn==='spear'?60:40));
            if(d<rh && (wallOpen || this.isA || nE.isA || Math.abs(this.x-nE.x)>30)) {
                let dmg=1.0; if(this.r==='elephant'||this.r==='eren_titan')dmg=8.0; if(this.r==='knight')dmg=2.5; if(this.r==='ninja')dmg=1.5; if(this.r==='goku')dmg=15; if(this.r==='naruto')dmg=5; if(this.r==='kurama')dmg=25; if(this.r==='zoro')dmg=10; if(this.hF)dmg*=1.5; if(this.wpn==='sword')dmg+=1; if(this.wpn==='spear')dmg+=0.8; if(this.hL)dmg+=1.5;
                nE.hp-=dmg; nE.ft=5; this.cd=(this.r==='elephant'||this.r==='eren_titan')?40:(this.r==='kurama'?40:(this.isA?15:25));
                addVFX(nE.x, nE.y, dmg); 
                
                let kF=(this.r==='elephant'||this.r==='eren_titan')?25:(this.r==='kurama'?20:(this.r==='knight'?12:6)), pR=(nE.r==='elephant'||nE.r==='eren_titan')?0.2:(nE.r==='cannon'?0:1), aE=Math.atan2(nE.y-this.y,nE.x-this.x);
                nE.vx+=Math.cos(aE)*kF*pR; nE.vy+=Math.sin(aE)*kF*pR;
                if(this.r!=='elephant'&&this.r!=='kurama'&&this.r!=='eren_titan'){this.vx-=Math.cos(aE)*2; this.vy-=Math.sin(aE)*2;}
                if(this.hI)nE.frz=60; if(this.hL)nE.blnd=80; if(this.r==='ninja'){this.vx-=Math.cos(aE)*15; this.vy-=Math.sin(aE)*15;}
            }
        }
    }
}
