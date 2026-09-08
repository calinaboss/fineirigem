const dataInizioScuola = new Date('September 14, 2026 08:15:00').getTime();
const dataFineScuola = new Date('June 12, 2027 12:25:00').getTime();
const dataGta6 = new Date('November 19, 2026 19:00:00').getTime();

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
        document.getElementById(`timer-${prefix}`).innerHTML = "<div style='grid-column: span 4; font-size: 24px; font-weight: 900; text-align: center; color: #4c7af7;'>RAGGIUNTO!</div>";
    } else {
        document.getElementById(`giorni-${prefix}`).innerText = t.giorni;
        document.getElementById(`ore-${prefix}`).innerText = t.ore;
        document.getElementById(`minuti-${prefix}`).innerText = t.minuti;
        document.getElementById(`secondi-${prefix}`).innerText = t.secondi;
    }
}

function aggiorna() {
    aggiornaTimer('inizio', dataInizioScuola);
    aggiornaTimer('fine', dataFineScuola);
    aggiornaTimer('gta', dataGta6);
}

setInterval(aggiorna, 1000);
aggiorna();