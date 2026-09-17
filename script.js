const dataInizioScuola = new Date('September 14, 2026 08:15:00').getTime();
const dataFineScuola = new Date('June 12, 2027 12:25:00').getTime();
const dataGta6 = new Date('November 19, 2026 19:00:00').getTime();

// Nuove date aggiunte
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
        
        // Alcuni timer (come quello del mondo) potrebbero non avere i minuti
        const minutiEl = document.getElementById(`minuti-${prefix}`);
        if(minutiEl) minutiEl.innerText = t.minuti;
        
        document.getElementById(`secondi-${prefix}`).innerText = t.secondi;
    }
}

function aggiornaMondo() {
    // Simulazione scorrimento tempo per un evento lontanissimo (5 Miliardi di anni)
    const adesso = new Date();
    // Calcoliamo il tempo fino a fine anno per far girare giorni, ore e secondi
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

// OROLOGIO ITALIANO
function aggiornaOrologio() {
    const ora = new Date();
    
    // Formattiamo per essere sicuri che sia il fuso orario di Roma (Italia)
    const formatter = new Intl.DateTimeFormat('it-IT', { 
        timeZone: 'Europe/Rome', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    const timeString = formatter.format(ora); // es: "14:05:09"
    const [h, m, s] = timeString.split(':');
    
    // Prendiamo i millisecondi (devono essere sempre a 3 cifre)
    const ms = ora.getMilliseconds().toString().padStart(3, '0');

    document.getElementById('ore-ita').innerText = h;
    document.getElementById('minuti-ita').innerText = m;
    document.getElementById('secondi-ita').innerText = s;
    document.getElementById('msec-ita').innerText = ms;
}

// Funzione di aggiornamento dei countdown (ogni 1 secondo)
function aggiorna() {
    aggiornaTimer('inizio', dataInizioScuola);
    aggiornaTimer('fine', dataFineScuola);
    aggiornaTimer('gta', dataGta6);
    aggiornaTimer('2027', data2027);
    aggiornaTimer('eclissi', dataEclissi);
    aggiornaTimer('grecia', dataGrecia);
    aggiornaMondo();
}

// Intervallo dei countdown normali (1000 millisecondi)
setInterval(aggiorna, 1000);
aggiorna();

// Intervallo ultra veloce (30 millisecondi) solo per aggiornare i millisecondi in modo fluido!
setInterval(aggiornaOrologio, 30);
aggiornaOrologio();