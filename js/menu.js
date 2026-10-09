// Páginas del PDF original, mostradas como imágenes (se ven igual en celular y escritorio)
const N=16;
const SEC=[['desayunos','Desayunos',1],['dulces','Dulces y niños',3],['entradas','Entradas',4],['sopas','Sopas y burgers',5],['tacos','Tacos y cortes',6],['fuertes','Fuertes',7],['pastas','Pastas',8],['postres','Postres',9],['cafe','Café',10],['carajillos','Carajillos',11],['vinos','Vinos',12],['mixologia','Mixología',13],['mimosas','Mimosas y cerveza',15],['destilados','Destilados 2x1',16]];
const anchor={};SEC.forEach(s=>anchor[s[2]]=s[0]);
$('#pages').innerHTML=Array.from({length:N},(_,i)=>{const n=i+1,id=anchor[n]?` id="${anchor[n]}"`:'';
  return `<figure class="sheet reveal ${n%2?'l':'r'}"${id}><button class="sheet-btn" data-n="${n}" aria-label="Ampliar página ${n}"><img src="images/menu/p-${String(n).padStart(2,'0')}.jpg" alt="Menú Cao Cao Cocina, página ${n} de ${N}" width="900" height="1158" loading="${n<3?'eager':'lazy'}" decoding="async"></button><figcaption>${n} / ${N}</figcaption></figure>`}).join('');
$('#tabs').innerHTML=SEC.map(s=>`<a class="tab" href="#${s[0]}">${s[1]}</a>`).join('');
watch($('#pages'));
// Saltar a una sección: desplazamiento controlado (evita que otros eventos lo interrumpan)
const tabsEl=$('#tabs'),tabs=[...document.querySelectorAll('.tab')];
const offset=()=>document.querySelector('.nav').offsetHeight+document.querySelector('.tabs-bar').offsetHeight+8;
let lock=false,lockT;
function setOn(id,center){tabs.forEach(t=>{const on=t.getAttribute('href')==='#'+id;t.classList.toggle('on',on);
  if(on&&center)tabsEl.scrollTo({left:t.offsetLeft-(tabsEl.clientWidth-t.offsetWidth)/2,behavior:'smooth'})})}
function goTo(id,smooth=true){const el=document.getElementById(id);if(!el)return;
  lock=true;clearTimeout(lockT);setOn(id,true);
  let y=0,n=el;while(n){y+=n.offsetTop;n=n.offsetParent}  // posición real, sin contar transformaciones de animación
  scrollTo({top:y-offset(),behavior:smooth?'smooth':'instant'});
  lockT=setTimeout(()=>{lock=false},smooth?1600:100);
  history.replaceState(null,'','#'+id)}
tabsEl.addEventListener('click',e=>{const t=e.target.closest('.tab');if(!t)return;e.preventDefault();goTo(t.getAttribute('href').slice(1))});
// Resaltar la sección visible al hacer scroll a mano
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.target.id&&!lock)setOn(e.target.id,true)}),{rootMargin:'-35% 0px -55% 0px'});
document.querySelectorAll('.sheet[id]').forEach(el=>so.observe(el));
if(location.hash)addEventListener('load',()=>goTo(location.hash.slice(1),false),{once:true});
addEventListener('hashchange',()=>goTo(location.hash.slice(1)));
// Ampliar página (con scroll para hacer zoom)
const lb=$('#lightbox'),lbi=$('#lb-img');
$('#pages').onclick=e=>{const b=e.target.closest('.sheet-btn');if(!b)return;const im=b.querySelector('img');lbi.src=im.src;lbi.alt=im.alt;lb.hidden=false;document.body.classList.add('lb-open');$('#lb-close').focus()};
const closeLb=()=>{lb.hidden=true;document.body.classList.remove('lb-open')};
$('#lb-close').onclick=closeLb;lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)closeLb()});
