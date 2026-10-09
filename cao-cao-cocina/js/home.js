const KEY='caocao_reviews_v1',PLACE_ID='ChIJ2ZNBfgxb04URwVCVzOPLg_w';
const GOOGLE_URL='https://search.google.com/local/writereview?placeid='+PLACE_ID;
const FOTOS=['Chilaquiles en salsa de la casa','Huevos Cazuela','Bagel de Salmón','Toast con Jocoque','Jocoque Toreado y costillas de elote','Hamburguesa Cao Cao','Taco de pulpo al ajillo','Chamorro Rasurado','Postres y café de la casa','Molcajete Mar y Tierra y pastas'];
const stars=n=>[1,2,3,4,5].map(i=>`<span class="star ${i>n?'off':''}" aria-hidden="true">★</span>`).join('');
$('#gallery').innerHTML=FOTOS.map((t,i)=>`<figure class="ph reveal"><img src="images/foto-${i+1}.jpg" alt="${esc(t)}" width="600" height="800" loading="lazy" decoding="async"><figcaption>${esc(t)}</figcaption></figure>`).join('');
let all=[],mine=[];
try{mine=JSON.parse(localStorage.getItem(KEY)||'[]')}catch{}
function renderReviews(){
  const box=$('#reviews');
  box.innerHTML=all.map(r=>`<article class="rev reveal${r.mine?' new':''}"><div>${stars(r.rating)}</div><p>${esc(r.text)}</p><footer>${esc(r.name)}</footer></article>`).join('');
  watch(box);
  const avg=all.reduce((s,r)=>s+r.rating,0)/(all.length||1);
  $('#rating-summary').textContent=`${avg.toFixed(1)} de 5 · ${all.length} reseñas`;
}
all=[...mine,...window.REVIEWS];renderReviews();
let rating=0,lastText='';
const box=$('#stars');
box.innerHTML=[1,2,3,4,5].map(i=>`<button type="button" role="radio" aria-checked="false" aria-label="${i} de 5" data-v="${i}">★</button>`).join('');
box.onclick=e=>{const b=e.target.closest('button');if(!b)return;rating=+b.dataset.v;
  box.querySelectorAll('button').forEach(x=>{const on=+x.dataset.v<=rating;x.classList.toggle('on',on);x.setAttribute('aria-checked',+x.dataset.v==rating)})};
$('#nueva-resena').onsubmit=e=>{
  e.preventDefault();
  const name=$('#r-name').value.trim(),text=$('#r-text').value.trim(),err=$('#form-error');
  if(!name||!text||!rating){err.textContent='Escribe tu nombre, elige una calificación y cuéntanos tu experiencia.';return}
  err.textContent='';
  const r={name,text,rating,mine:true};
  try{localStorage.setItem(KEY,JSON.stringify([r,...mine]));mine=[r,...mine]}catch{}
  all.unshift(r);renderReviews();lastText=text;
  e.target.reset();rating=0;box.querySelectorAll('button').forEach(x=>x.classList.remove('on'));
  const g=$('#gbox');g.hidden=false;$('#gmsg').textContent='';
  g.scrollIntoView({behavior:'smooth',block:'center'});
};
// Google no permite publicar reseñas desde un sitio externo: copiamos el texto y abrimos su formulario oficial
$('#gbtn').onclick=async()=>{
  let ok=false;try{await navigator.clipboard.writeText(lastText);ok=true}catch{}
  $('#gmsg').textContent=ok?'Texto copiado. Pégalo en Google y toca Publicar.':'No pudimos copiarlo automáticamente; selecciona tu texto de la reseña y pégalo en Google.';
  window.open(GOOGLE_URL,'_blank','noopener');
};
