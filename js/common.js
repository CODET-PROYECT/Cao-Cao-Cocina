const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -4% 0px'});
function watch(root=document){root.querySelectorAll('.reveal:not(.in)').forEach((el,i)=>{el.style.transitionDelay=Math.min(i%4,3)*70+'ms';io.observe(el)})}
// Menú hamburguesa
const nav=$('.nav'),burger=$('#burger'),drawer=$('#drawer');
function setMenu(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Cerrar menú de navegación':'Abrir menú de navegación');
  document.body.classList.toggle('menu-open',open);
  if(open){drawer.hidden=false;requestAnimationFrame(()=>drawer.classList.add('open'))}
  else{drawer.classList.remove('open');setTimeout(()=>{if(!drawer.classList.contains('open'))drawer.hidden=true},250)}}
burger.onclick=()=>setMenu(burger.getAttribute('aria-expanded')!=='true');
drawer.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus()}});
document.addEventListener('click',e=>{if(burger.getAttribute('aria-expanded')==='true'&&!e.target.closest('.nav'))setMenu(false)});
// Barra de progreso y sombra
const bar=document.createElement('div');bar.className='progress';document.body.prepend(bar);
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>8);
  const h=document.documentElement;bar.style.transform=`scaleX(${scrollY/Math.max(1,h.scrollHeight-innerHeight)})`},{passive:true});
document.addEventListener('DOMContentLoaded',()=>watch());
