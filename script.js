const dataInizioScuola = new Date('September 14, 2026 08:15:00').getTime();
const dataFineScuola = new Date('June 12, 2027 12:25:00').getTime();
const dataGta6 = new Date('November 19, 2026 19:00:00').getTime();
const data2027 = new Date('January 1, 2027 00:00:00').getTime();
const dataEclissi = new Date('August 2, 2027 00:00:00').getTime();
const dataGrecia = new Date('July 1, 2027 00:00:00').getTime();
function calcolaTempo(target) {
    const adesso = new Date().getTime();
    const diff = target - adesso;
    if (diff <= 0) {
        return { giorni: '00', ore: '00', minuti: '00', secondi: '00', finito: true };
    }
    const g = Math.floor(diff / (1000 * 60 * 60 * 24));
    const o = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return {
        giorni: g.toString().padStart(2, '0'),
        ore: o.toString().padStart(2, '0'),
        minuti: m.toString().padStart(2, '0'),
        secondi: s.toString().padStart(2, '0'),
        finito: false
    };
}
function aggiornaTimer(prefix, target) {
    const t = calcolaTempo(target);
    if (t.finito) {
        document.getElementById(`timer-${prefix}`).innerHTML = "<div style='grid-column: span 4; font-size: 24px; font-weight: 900; text-align: center; color: #4c7af7;'>raggiunto</div>";
    } else {
        document.getElementById(`giorni-${prefix}`).innerText = t.giorni;
        document.getElementById(`ore-${prefix}`).innerText = t.ore;       
        const minutiEl = document.getElementById(`minuti-${prefix}`);
        if(minutiEl) minutiEl.innerText = t.minuti;
        
        document.getElementById(`secondi-${prefix}`).innerText = t.secondi;
    }
}
function aggiornaMondo() {    
    const adesso = new Date();
    const fineAnno = new Date(adesso.getFullYear(), 11, 31, 23, 59, 59).getTime(); 
    const diff = fineAnno - adesso.getTime();   
    const g = Math.floor(diff / (1000 * 60 * 60 * 24));
    const o = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000); // Salta i minuti come richiesto
    document.getElementById('anni-mondo').innerText = "5 Mld"; // Numero e lettera
    document.getElementById('giorni-mondo').innerText = g.toString().padStart(2, '0');
    document.getElementById('ore-mondo').innerText = o.toString().padStart(2, '0');
    document.getElementById('secondi-mondo').innerText = s.toString().padStart(2, '0');
}
function aggiornaOrologio() {
    const ora = new Date(); 
    const formatter = new Intl.DateTimeFormat('it-IT', { 
        timeZone: 'Europe/Rome', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    const timeString = formatter.format(ora); 
    const [h, m, s] = timeString.split(':');
    const ms = ora.getMilliseconds().toString().padStart(3, '0');
    document.getElementById('ore-ita').innerText = h;
    document.getElementById('minuti-ita').innerText = m;
    document.getElementById('secondi-ita').innerText = s;
    document.getElementById('msec-ita').innerText = ms;
}
function aggiorna() {
    aggiornaTimer('inizio', dataInizioScuola);
    aggiornaTimer('fine', dataFineScuola);
    aggiornaTimer('gta', dataGta6);
    aggiornaTimer('2027', data2027);
    aggiornaTimer('eclissi', dataEclissi);
    aggiornaTimer('grecia', dataGrecia);
    aggiornaMondo();
}
setInterval(aggiorna, 1000);
aggiorna();
setInterval(aggiornaOrologio, 30);
aggiornaOrologio();