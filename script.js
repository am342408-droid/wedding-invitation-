const params = new URLSearchParams(window.location.search);
const guest = (params.get('guest') || '').trim();
const opening = document.getElementById('opening');
const main = document.getElementById('main');
const openBtn = document.getElementById('openBtn');
const langToggle = document.getElementById('langToggle');
let isArabic = false;

function setGuestText(){
  const dear = document.getElementById('openingDear');
  dear.textContent = isArabic
    ? (guest ? `عزيزي ${guest}،` : 'الأهل والأصدقاء الأعزاء،')
    : (guest ? `Dear ${guest},` : 'Dear family & friends,');
  document.getElementById('openingSub').textContent = isArabic
    ? 'يسعدنا أن نشارككم فرحتنا'
    : 'we have something lovely to share with you';
}
setGuestText();

function openInvitation(){
  opening.classList.add('hide');
  main.classList.remove('locked');
  document.body.style.overflow = '';
}
openBtn.addEventListener('click', openInvitation);
opening.addEventListener('click', (e)=>{ if(e.target===opening || e.target.classList.contains('opening-glow')) openInvitation(); });

function applyLanguage(){
  document.documentElement.lang = isArabic ? 'ar' : 'en';
  document.body.classList.toggle('ar', isArabic);
  langToggle.textContent = isArabic ? 'English' : 'العربية';
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
  });
  setGuestText();
}
langToggle.addEventListener('click', ()=>{ isArabic=!isArabic; applyLanguage(); });

const weddingTime = new Date('2026-10-16T19:00:00+03:00').getTime();
function updateCountdown(){
  const diff = weddingTime - Date.now();
  if(diff<=0){
    ['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id).textContent='00');
    return;
  }
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

document.getElementById('calendarBtn').addEventListener('click',()=>{
  const start='20261016T190000'; const end='20261016T230000';
  const url='https://calendar.google.com/calendar/render?action=TEMPLATE'
    +'&text='+encodeURIComponent('Ali & Mai — Wedding')
    +'&dates='+start+'/'+end
    +'&details='+encodeURIComponent('Wedding of Ali Mohamed & Mai Marwan')
    +'&location='+encodeURIComponent('Garden De La Vie, King Mariout, Alexandria, Egypt');
  window.open(url,'_blank','noopener');
});

// Auto-open after a short delay if the guest taps quickly or shares directly.
setTimeout(()=>{ if(!opening.classList.contains('hide')){} }, 100);
