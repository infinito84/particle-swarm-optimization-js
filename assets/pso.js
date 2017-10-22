window.start=function(){var a=new Problem,b=new Plot(a),c=new Swarm(a,b);c.initialize(),c.step()};
function Problem(){this.mind=parseFloat(mind.value),this.maxd=parseFloat(maxd.value),this.minD=parseFloat(minD.value),this.maxD=parseFloat(maxD.value),this.minr=parseFloat(minr.value),this.maxr=parseFloat(maxr.value),this.l1=parseFloat(l1.value),this.l2=parseFloat(l2.value),this.maxSigma=parseFloat(maxSigma.value),this.p=parseFloat(p.value),this.g=canvas.getContext("2d"),this.checkBoundaries=function(a){return this.mind<=a.d&&a.d<=this.maxd&&this.minD<=a.D&&a.D<=this.maxD&&this.minr<=a.r&&a.r<=this.maxr&&a.D>a.d&&a.r<=(a.D-a.d)/2&&a.sigma<this.maxSigma},this.kt=function(a){for(var b=[[1.01,.984,-.105],[1.05,1.005,-.171],[1.2,.963,-.255],[1.5,1,-.282],[2,1.015,-.3]],c=a.D/a.d,d=b[b.length-1],e=0;e<b.length-1;e++)c<=b[e][0]&&(d=b[e]);return d[1]*Math.pow(a.r/a.d,d[2])},this.fitness=function(a){a.volume=Math.PI/4*(Math.pow(a.D,2)*this.l1+Math.pow(a.d,2)*this.l2),a.sigma=4*this.kt(a)*this.p/(Math.PI*Math.pow(a.d,2)),this.checkBoundaries(a)||(a.volume=1e3)}}
function Plot(a){var b=a.g,c=1.2,d=.06*canvas.width,e=.1*canvas.height,f="rgba(0,0,255,0.7)";this.axis=function(){b.fillStyle="black",b.strokeStyle="black",b.beginPath(),b.moveTo(x(0),y(0)),b.lineTo(x(a.maxd*c),y(0)),b.stroke(),b.beginPath(),b.moveTo(x(0),y(0)),b.lineTo(x(0),y(a.maxD*c)),b.stroke(),b.font="normal 7pt monospace",b.fillText(1e3*a.minD+"mm",0,y(a.minD)),b.fillText(1e3*a.maxD+"mm",0,y(a.maxD)),b.fillText(1e3*a.mind+"mm",x(a.mind)-10,canvas.height-10),b.fillText(1e3*a.maxd+"mm",x(a.maxd)-10,canvas.height-10)},this.feasibleRegion=function(){b.beginPath(),b.rect(x(a.mind),y(a.maxD),x(a.maxd)-x(a.mind),y(a.minD)-y(a.maxD)),b.fillStyle="rgba(0,0,0,0.05)",b.fill()},this.showRvalues=function(){b.beginPath();var c=canvas.height-2*e,g=canvas.width-2*d;b.rect(g,e,d,c),b.lineWidth=.5,b.strokeStyle=f,b.stroke();for(var h=40,i=0;h>i;i++){var j="rgba(0,0,255,"+.7*(h-i)/h+")";b.beginPath(),b.rect(g,e+i*c/h,d,c/h),b.fillStyle=j,b.fill()}b.fillStyle="black",b.font="normal 9pt monospace",b.fillText(1e3*a.maxr+"mm",g,e-5),b.fillText(1e3*a.minr+"mm",g,c+e+10)},this.drawLabels=function(c){b.fillStyle="rgba(0,255,0,0.8)",b.font="normal 12pt monospace",b.fillText("D",d/2-10,y(c.best.D)),b.fillText("d",x(c.best.d),canvas.height-e/2+5);var f=canvas.height-2*e,g=f-f*(c.best.r-a.minr)/(a.maxr-a.minr);b.fillText("r",canvas.width-d/2-10,e+g),b.fillText("Paso #"+c.currentStep,canvas.width/2-30,e)},this.clear=function(){b.clearRect(0,0,canvas.width,canvas.height)},window.x=function(b){var e=.8*canvas.width,f=b*e/(Math.max(a.maxd,a.maxD)*c);return d+f},window.y=function(b){var d=.8*canvas.height,f=b*d/(Math.max(a.maxd,a.maxD)*c);return canvas.height-(e+f)},this.axis(),this.feasibleRegion(),this.showRvalues()}
function Swarm(a,b){var c=parseFloat(N_swarm.value),d=parseFloat(c1_swarm.value),e=parseFloat(c2_swarm.value),f=parseFloat(w_swarm.value),g=50;this.particles=[],this.currentStep=0,this.best=new Particle(a),this.initialize=function(){for(var b=0;c>b;){var d=new Particle(a);this.particles.push(d),d.show(),b++}this.bestGlobal()},this.bestGlobal=function(){this.particles.forEach(function(b){a.fitness(b),b.volume<b.bestLocal.volume&&(b.bestLocal=b.clone())}),this.particles.sort(function(a,b){return a.volume-b.volume});var b=this.particles[0].clone();b.volume<this.best.volume&&(this.best=b),doptimo.value=this.best.d,Doptimo.value=this.best.D,roptimo.value=this.best.r,sigmaoptimo.value=this.best.sigma,voptimo.value=this.best.volume;var c=a.g;c.beginPath(),c.arc(x(this.best.d),y(this.best.D),4,0,2*Math.PI,!1),c.fillStyle="rgba(0,255,0,0.8)",c.fill()},this.step=function(){this.currentStep++,b.clear(),b.axis(),b.feasibleRegion(),b.showRvalues();for(var a=0;c>a;a++){var h=this.particles[a],i=Math.random(),j=Math.random(),k=Math.random(),l=Math.random(),m=Math.random(),n=Math.random();h.velD=f*h.velD+d*i*(h.bestLocal.D-h.D)+e*j*(this.best.D-h.D),h.veld=f*h.veld+d*k*(h.bestLocal.d-h.d)+e*l*(this.best.d-h.d),h.velr=f*h.velr+d*m*(h.bestLocal.r-h.r)+e*n*(this.best.r-h.r),h.show(),h.r+=h.velr,h.D+=h.velD,h.d+=h.veld}b.drawLabels(this),this.bestGlobal();var o=this;setTimeout(function(){o.step()},g)}}
function Particle(a){this.D=(a.maxD-a.minD)*Math.random()+a.minD,this.d=(a.maxd-a.mind)*Math.random()+a.mind,this.r=(a.maxr-a.minr)*Math.random()+a.minr,this.velD=(Math.random()<.5?-1:1)*(a.maxD-a.minD)*Math.random()*velPer,this.veld=(Math.random()<.5?-1:1)*(a.maxd-a.mind)*Math.random()*velPer,this.velr=(Math.random()<.5?-1:1)*(a.maxr-a.minr)*Math.random()*velPer,this.sigma=0,this.volume=0,a.fitness(this),this.clone=function(){var a={};for(var b in this)a[b]=this[b];return a},this.show=function(){var b=a.g;b.beginPath(),a.checkBoundaries(this)?(b.fillStyle="rgba(0,0,255,"+.7*(this.r-a.minr)/(a.maxr-a.minr)+")",b.strokeStyle="rgba(0,0,255,0.7)"):(b.fillStyle="rgba(255,0,0,0.3)",b.strokeStyle="rgba(255,0,0,0.7)"),b.lineWidth=.5,b.arc(x(this.d),y(this.D),4,0,2*Math.PI,!1),b.fill(),b.stroke(),b.beginPath(),b.lineWidth=1,b.moveTo(x(this.d),y(this.D)),b.lineTo(x(this.d+this.veld),y(this.D+this.velD)),b.stroke()},this.bestLocal=this.clone()}var velPer=.1;