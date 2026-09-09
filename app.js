const BASE='web/';
const $=id=>document.getElementById(id);
function open_(src){$('modi').src=BASE+src;$('mod').classList.add('on')}
const LIM=12;let cur=null,lim=LIM;
$('stops').innerHTML=DATA.stops.map(([k,q])=>`<button class="stop" data-k="${k}"><div class="stop-q">${q}</div></button>`).join('');
function cards(list,n){return '<div class="grid">'+list.slice(0,n).map(it=>`<div class="card" onclick="open_('${it.i}')"><img loading="lazy" src="${BASE+it.i}">${it.grp==='A'?'<div class="tagline">Пришла с опытом</div>':''}</div>`).join('')+'</div>'}
function draw(){
 const list=cur?DATA.items.filter(i=>i.t.includes(cur)):DATA.items;
 const title=cur?DATA.stops.find(s=>s[0]===cur)[1]:'Все отзывы практикующих';
 $('feed').innerHTML=`<div class="fhead"><b>${title}</b><span>нажми на карточку, чтобы прочитать</span></div>`+cards(list,lim)+(list.length>lim?'<button class="more" id="mr">Показать ещё →</button>':'');
 const m=$('mr');if(m)m.onclick=()=>{lim+=18;draw()};
}
$('stops').onclick=e=>{const b=e.target.closest('.stop');if(!b)return;
 const k=b.dataset.k;cur=(cur===k?null:k);lim=LIM;
 document.querySelectorAll('.stop').forEach(x=>x.classList.toggle('on',cur&&x===b));
 draw();$('feed').scrollIntoView({behavior:'smooth',block:'start'})};
draw();
let role='buy';
$('roles').innerHTML=[['buy','Менеджер по закупке рекламы'],['sell','Менеджер по продаже рекламы']].map(([k,n])=>`<button class="role${k===role?' on':''}" data-k="${k}">${n}</button>`).join('');
function drawProbs(){
 $('probs').innerHTML=DATA.probs[role].map((p,i)=>`<div class="pitem"><button class="phead"><span class="pnum">${String(i+1).padStart(2,'0')}</span>${p[0]}</button><div class="pbody">
 <div class="plabel">Как это выглядит в работе</div><div class="ptext">${p[1]}</div>
 <div class="plabel">Почему так происходит</div><div class="ptext">${p[2]}</div>
 <div class="plabel">Что закрывает обучение</div><ul class="plist">${p[3].map(x=>`<li>${x}</li>`).join('')}</ul>
 <div class="pchange"><b>Что меняется:</b> ${p[4]}</div></div></div>`).join('');
}
$('roles').onclick=e=>{const b=e.target.closest('.role');if(!b)return;role=b.dataset.k;
 document.querySelectorAll('.role').forEach(x=>x.classList.toggle('on',x===b));drawProbs()};
$('probs').onclick=e=>{const h=e.target.closest('.phead');if(!h)return;h.parentElement.classList.toggle('open')};
drawProbs();
