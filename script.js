document.documentElement.className="js";
(function(){
var nm=document.getElementById('nm'),t=document.getElementById('t'),z=document.getElementById('zoom'),ov=document.getElementById('ov'),hd=document.querySelector('header'),cv=document.getElementById('moon'),sy=1.1,fs=100;
// intro words
var tx='ZAYB® is a creative director and social media marketer, building brand identities and feeds for 50+ projects across 10+ industries in Punjabi, Urdu and English.';
var P=document.getElementById('txt');tx.split(' ').forEach(function(w,i){var s=document.createElement('span');s.className='w'+(/^(creative|director|50\+|10\+)$/.test(w)?' hl':'');s.textContent=w;P.appendChild(s)});
var ws=[].slice.call(document.querySelectorAll('.w')),it=document.getElementById('intro');
// fit name to width
// soft right-side shadow: drawn tiny, then smoothed up in two steps (a cheap blur that works in every browser)
function shadow(vb){var W=nm.offsetWidth,Hh=nm.offsetHeight,pad=80,sx=W/vb[2],sy=Hh/vb[3],w=W+2*pad,h=Hh+2*pad;
function mk(f){var c=document.createElement('canvas');c.width=Math.max(2,Math.round(w*f));c.height=Math.max(2,Math.round(h*f));var q=c.getContext('2d');q.imageSmoothingEnabled=true;q.imageSmoothingQuality='high';return c}
var a=mk(.04),x=a.getContext('2d');x.scale(.04,.04);x.fillStyle='#000';x.font='900 300px Montserrat,"Arial Black",Arial,sans-serif';
x.translate(pad-vb[0]*sx+26*sx,pad-vb[1]*sy);x.scale(sx,sy);x.fillText('ZAYB',0,0);
var b=mk(.12);b.getContext('2d').drawImage(a,0,0,b.width,b.height);
var k=mk(.5),y=k.getContext('2d');y.drawImage(b,0,0,k.width,k.height);
y.globalCompositeOperation='destination-in';var g=y.createLinearGradient(pad*.5,0,(pad+W)*.5,0);g.addColorStop(0,'rgba(0,0,0,.15)');g.addColorStop(1,'rgba(0,0,0,1)');y.fillStyle=g;y.fillRect(0,0,k.width,k.height);
var im=document.getElementById('t2img');im.src=k.toDataURL();im.style.cssText='left:'+(-pad)+'px;top:'+(-pad)+'px;width:'+w+'px;height:'+h+'px'}
function fit(){var c=document.createElement('canvas').getContext('2d');c.font='900 300px Montserrat,"Arial Black",Arial,sans-serif';
var m=c.measureText('ZAYB'),L=m.actualBoundingBoxLeft||0,R=m.actualBoundingBoxRight||m.width||560,A=m.actualBoundingBoxAscent||210,Dn=m.actualBoundingBoxDescent||0;
document.getElementById('sv').setAttribute('viewBox',(-L)+' '+(-A)+' '+(L+R)+' '+(A+Dn));
var bw=innerWidth-2*Math.max(innerWidth*.05,(innerWidth-1400)/2);nm.style.height=Math.min(innerHeight*.64,bw/((L+R)/(A+Dn))*1.3)+'px';document.getElementById('dim').textContent=Math.round(nm.offsetWidth)+' × '+Math.round(nm.offsetHeight);shadow([-L,-A,L+R,A+Dn])}
function init(){fit()}
addEventListener('resize',init);init();
if(document.fonts){document.fonts.ready.then(fit);document.fonts.load('900 300px Montserrat').then(fit,function(){})}
var cl=function(v){return Math.min(1,Math.max(0,v))};
var stg=document.querySelector('.stage'),tg=document.getElementById('tg'),spot=document.getElementById('spot'),ab=document.getElementById('about'),wk=document.getElementById('work'),scu=document.getElementById('sc'),mini=document.getElementById('mini'),ml=[].slice.call(mini.querySelectorAll('div a')),bar=document.getElementById('bar'),TOT=1,WK=1e9,LG=1e9,lv2=-1,FH=700,lce=-1,NAB=0,NWK=0,t2=document.getElementById('t2img'),lY=-1,lW=-1,lv=-1,lc=[],P=0,S=1,mx=0,my=0,ox=0,oy=0;
// fallback if images/ folder was omitted or flattened on deploy
document.addEventListener('error',function(e){var el=e.target;if(!el||el.tagName!=='IMG'||el.dataset.fb)return;var s=el.getAttribute('src');if(!s||/^data:|^https?:/.test(s))return;el.dataset.fb='1';el.src=/^(\.\/)?images\//.test(s)?s.replace(/^(\.\/)?images\//,''):'images/'+s.replace(/^\.\//,'')},true);
var fine=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('pointermove',function(e){if(e.pointerType==='mouse'){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5}});
// hero 3D pose: scroll zoom + a mouse tilt that fades out as the zoom begins
function pose(){var k=P<.06?1-P/.06:0;
nm.style.transform='perspective(1400px) rotateX('+(-oy*10*k).toFixed(2)+'deg) rotateY('+(ox*14*k).toFixed(2)+'deg) scale('+S+')';
cv.style.transform='translate('+(-ox*28*k).toFixed(1)+'px,'+(-oy*16*k).toFixed(1)+'px) scale('+(1.06+Math.min(P,1)*.3)+')';
t2.style.transform='translate('+(-ox*34*k).toFixed(1)+'px,'+(-oy*14*k).toFixed(1)+'px)';
spot.style.transform='translate('+((ox+.5)*innerWidth).toFixed(0)+'px,'+((oy+.5)*innerHeight).toFixed(0)+'px)';spot.style.opacity=k}
(function loop(){
var sc=scrollY!==lY||innerWidth!==lW,mv=fine&&(Math.abs(mx-ox)>.0004||Math.abs(my-oy)>.0004);
if(sc){lY=scrollY;lW=innerWidth;
P=cl((scrollY-z.offsetTop)/(z.offsetHeight-innerHeight));S=Math.exp(P*3.8);
ov.style.opacity=cl((P-.8)/.16);hd.style.opacity=tg.style.opacity=scu.style.opacity=cl(1-P*7);mini.classList.toggle('on',P>.97);var cu=TOT-scrollY<FH*.85?'#contact':scrollY>=NWK-innerHeight*.45?'#work':scrollY>=NAB-innerHeight*.45?'#about':'';if(ml&&cu!==lce){lce=cu;ml.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')===cu)})}stg.classList.toggle('zm',P>.14);bar.style.opacity=P>.97?1:0;bar.style.transform='scaleX('+(TOT>0?cl(scrollY/TOT):0)+')';hd.style.pointerEvents=P>.12?'none':'';
var cv2=cl(1-(WK-scrollY)/innerHeight);var cv3=cl(1-(LG-scrollY)/innerHeight);if(cv3!==lv2){lv2=cv3;wk.style.setProperty('--dk2',(cv3*.65).toFixed(3))}
if(cv2!==lv){lv=cv2;ab.style.setProperty('--dk',(cv2*.6).toFixed(3));ab.style.transform=cv2>0?'scale('+(1-cv2*.06).toFixed(4)+')':''}
var o2=cl(1-P*4);t2.style.opacity=o2;t2.style.display=o2>0?'':'none';
if(P>.85){var r=it.getBoundingClientRect();
if(r.bottom>-100&&r.top<innerHeight+100){var q=(innerHeight*.8-r.top)/(r.height*.9+innerHeight*.1);
ws.forEach(function(w,i){var k=cl(q*ws.length*1.2-i),c=Math.round(205-195*k);if(lc[i]!==c){lc[i]=c;w.style.color='rgb('+c+','+c+','+(c+3)+')';w.style.transform='translateY('+((1-k)*.32).toFixed(3)+'em)';w.classList.toggle('on',k>.98)}})}
}}
if(mv){ox+=(mx-ox)*.08;oy+=(my-oy)*.08}
if(sc||(mv&&P<.06))pose();
requestAnimationFrame(loop)})();
new IntersectionObserver(function(e){if(e[0].isIntersecting)it.classList.add('in')},{threshold:.2}).observe(it);
// page height for the progress bar
function tt(){TOT=document.documentElement.scrollHeight-innerHeight;WK=wk.getBoundingClientRect().top+scrollY;NAB=document.querySelector('.marq').getBoundingClientRect().bottom+scrollY;NWK=NAB+ab.offsetHeight;FH=document.querySelector('.rvl>footer').offsetHeight;lce=-1;LG=document.querySelector('.rvl').getBoundingClientRect().top+scrollY;wk.style.setProperty('--wh',wk.offsetHeight+'px');lv2=-1;lY=-1;ab.style.setProperty('--ah',ab.offsetHeight+'px')}
addEventListener('resize',tt);addEventListener('load',tt);tt();if(document.fonts)document.fonts.ready.then(tt);
// scroll reveals (one-time, observer based, so no per-frame cost)
function cnt(box){box.querySelectorAll('b').forEach(function(b){var raw=b.textContent,n=parseInt(raw,10),sf=raw.replace(/[0-9]/g,''),t0=null;
function st(t){if(t0===null)t0=t;var k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);b.textContent=Math.round(n*e)+sf;if(k<1)requestAnimationFrame(st)}
b.textContent='0'+sf;requestAnimationFrame(st)})}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);if(e.target.classList.contains('stats'))cnt(e.target);if(e.target.classList.contains('about'))e.target.querySelector('.photo').classList.add('vis')}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.about .tx>*,.stats>div,.langs>div,.wi,footer p').forEach(function(n){n.classList.add('rv');n.style.setProperty('--d',(Array.prototype.indexOf.call(n.parentNode.children,n)*.1)+'s')});
document.querySelectorAll('.card').forEach(function(c,i){c.style.setProperty('--d',((i%3)*.12)+'s')});
document.querySelectorAll('.rv,.hd,.about,.stats').forEach(function(n){io.observe(n)});
// menu links: sticky sections move, so jump to their natural positions instead of using the anchor
function go(h){var y=h==='#'?0:h==='#about'?NAB:h==='#work'?NWK:h==='#contact'?document.documentElement.scrollHeight-innerHeight:null;if(y===null)return false;scrollTo({top:Math.max(0,y),behavior:'smooth'});return true}
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href');if(go(h)){e.preventDefault();ml.forEach(function(x){x.classList.toggle('act',x===a)})}})});

// contact box: mailto links are blocked in some browsers/previews, so offer Gmail, copy and social links
var cts=document.getElementById('ct'),cpb=document.getElementById('cpb');
function octs(){cts.classList.add('on');cts.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden'}
function cctx(){cts.classList.remove('on');cts.setAttribute('aria-hidden','true');document.documentElement.style.overflow=''}
document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){if(a.closest('#ct'))return;a.addEventListener('click',function(e){e.preventDefault();octs()})});
cts.addEventListener('click',function(e){if(e.target===cts)cctx()});document.getElementById('ctx').addEventListener('click',cctx);
addEventListener('keydown',function(e){if(e.key==='Escape')cctx()});
cpb.addEventListener('click',function(){var t=document.getElementById('emv').textContent;
function ok(){cpb.textContent='Copied ✓';setTimeout(function(){cpb.textContent='Copy email'},1800)}
function fb(){var x=document.createElement('textarea');x.value=t;x.style.cssText='position:fixed;opacity:0';document.body.appendChild(x);x.select();try{if(document.execCommand('copy'))ok()}catch(e){}document.body.removeChild(x)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fb)}else fb()});
// 3D tilt cards
document.querySelectorAll('.card').forEach(function(c){
c.addEventListener('pointermove',function(e){var b=c.getBoundingClientRect(),px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;
c.style.transform='rotateY('+px*18+'deg) rotateX('+(-py*18)+'deg) scale(1.03)'});
c.addEventListener('pointerleave',function(){c.style.transform=''})});
// project lightbox
var lb=document.getElementById('lb');
function oc(c){var im=c.querySelector('img');document.getElementById('lbi').src=im.currentSrc||im.src;document.getElementById('lbi').alt=c.querySelector('h3').textContent;
document.getElementById('lbk').textContent=c.querySelector('small').textContent;document.getElementById('lbh').textContent=c.querySelector('h3').textContent;
document.getElementById('lbp').innerHTML=c.querySelector('.dsc').innerHTML;document.getElementById('lbg').innerHTML=c.querySelector('.tg').innerHTML;
lb.classList.add('on');lb.setAttribute('aria-hidden','false');lb.scrollTop=0;document.documentElement.style.overflow='hidden';c.blur()}
function cx(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true');document.documentElement.style.overflow=''}
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('click',function(){oc(c)});
c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();oc(c)}})});
lb.addEventListener('click',function(e){if(e.target===lb)cx()});document.getElementById('lbc').addEventListener('click',cx);
addEventListener('keydown',function(e){if(e.key==='Escape')cx()});
})();