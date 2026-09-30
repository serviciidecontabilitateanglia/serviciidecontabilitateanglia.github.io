// Scris fără `?.` și `??`, ca să meargă și pe iPhone-urile rămase pe iOS 12 (iPhone 6, 5s).

// Adresa de e-mail la care ajung cererile de ofertă. SCHIMB-O cu adresa ta.
const EMAIL_FIRMA = "serviciidecontabilitateanglia@gmail.com";

// Cheia Web3Forms (https://web3forms.com): cu ea, formularul trimite mesajul direct pe e-mail.
// Cât timp e goală, formularul deschide aplicația de e-mail a vizitatorului.
const WEB3FORMS_KEY = "0e91ada6-2f52-441a-ac1f-96f3b627da44";

// Programări online și WhatsApp (pentru mesajele de după trimitere și butoanele de share)
const CALENDLY = "https://calendly.com/serviciidecontabilitateanglia/30min";
const WHATSAPP = "447909451914";
const linkWhatsApp = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Textele e-mailului, în limba paginii (index.html = română, en.html = engleză)
const TEXTE = {
  ro: {
    subiect: "Cerere ofertă contabilitate",
    nume: "Nume", telefon: "Telefon", email: "E-mail",
    tip: "Situația", angajati: "Număr de angajați", mesaj: "Mesaj",
    seTrimite: "Se trimite…",
    trimis: `Mulțumim! Am primit mesajul și te contactăm în cel mult 24 de ore. Vrei mai repede? <a href="${CALENDLY}" target="_blank" rel="noopener">Programează o consultație</a> sau <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">scrie-ne pe WhatsApp</a>.`,
    waButon: "Trimite rezultatul pe WhatsApp",
    waCis: (stare, suma, brut) => `Bună ziua! Am folosit calculatorul CIS de pe site: ${stare} ${suma} (venit brut ${brut}). Mă puteți ajuta cu declarația?`,
    waLtd: (an, profit) => `Bună ziua! Am folosit calculatorul Self-employed sau Ltd (${an}) pentru un profit de ${profit} pe an. Aș vrea să discutăm ce variantă mi se potrivește.`,
    detalii: "Vezi detaliile ↓",
    ceInclude: "Ce include ▾",
    ascunde: "Ascunde ▴",
    eroare: "Mesajul nu a putut fi trimis. Se deschide aplicația de e-mail ca să-l trimiți de acolo.",
  },
  en: {
    subiect: "Accounting quote request",
    nume: "Name", telefon: "Phone", email: "E-mail",
    tip: "Situation", angajati: "Number of employees", mesaj: "Message",
    seTrimite: "Sending…",
    trimis: `Thank you! We've received your message and will get back to you within 24 hours. Need us sooner? <a href="${CALENDLY}" target="_blank" rel="noopener">Book a consultation</a> or <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">message us on WhatsApp</a>.`,
    waButon: "Send my result on WhatsApp",
    waCis: (stare, suma, brut) => `Hello! I used the CIS calculator on your website: ${stare} ${suma} (gross pay ${brut}). Can you help me with my tax return?`,
    waLtd: (an, profit) => `Hello! I used the self-employed or Ltd calculator (${an}) for a profit of ${profit} a year. I'd like to talk about which option suits me.`,
    detalii: "See details ↓",
    ceInclude: "What's included ▾",
    ascunde: "Hide ▴",
    eroare: "Your message couldn't be sent. Your e-mail app will open so you can send it from there.",
  },
};
const t = TEXTE[document.documentElement.lang] || TEXTE.ro;

// Numără o acțiune în GoatCounter (apare la „Events” în panoul de statistici)
const numara = (nume) => {
  if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nume, title: nume, event: true });
};

// Pagina curentă, fără „.html” (ex. „ghid-rambursare-cis”; „acasa” pentru prima pagină)
const pagina = location.pathname.replace(/^\/+|\.html$/g, "").replace(/^index$/, "") || "acasa";

// Click-uri pe WhatsApp, telefon, e-mail, Calendly și calendar, oriunde în pagină.
// La contact se adaugă și pagina („click-whatsapp/ghid-rambursare-cis”), ca să vezi ce pagină aduce clienți.
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const h = a.getAttribute("href");
  if (h.startsWith("https://wa.me")) numara(`click-whatsapp/${pagina}`);
  else if (h.startsWith("tel:")) numara(`click-telefon/${pagina}`);
  else if (h.startsWith("mailto:")) numara(`click-email/${pagina}`);
  else if (h.includes("calendly.com")) numara(`click-programare/${pagina}`);
  else if (h.includes("g.page/r/")) numara("click-recenzie");
  else if (h.endsWith(".ics")) numara("calendar-descarcat");
  else if (a.classList.contains("termen__add")) numara("calendar-google");
});

// Meniul pentru telefon
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});

const inchideMeniul = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", false);
};
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", inchideMeniul));
document.addEventListener("click", (e) => {
  if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) inchideMeniul();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) { inchideMeniul(); toggle.focus(); }
});

// Pe telefon, bara de sus se ascunde când derulezi în jos și reapare când derulezi în sus
const antet = document.querySelector(".header");
let ultimulY = window.scrollY;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const ascunde = window.innerWidth <= 760 && y > ultimulY && y > 120 && !nav.classList.contains("is-open");
  antet.classList.toggle("header--hidden", ascunde);
  ultimulY = y;
}, { passive: true });

// Formularul de contact (există doar pe paginile principale, nu și pe ghiduri).
// Cu cheie Web3Forms trimite mesajul direct; altfel deschide aplicația de e-mail.
const formular = document.getElementById("contact-form");
const hint = formular && formular.querySelector(".form__hint");
if (WEB3FORMS_KEY && hint && hint.dataset.hintDirect) hint.textContent = hint.dataset.hintDirect;

const campAngajati = formular && formular.querySelector(".form__angajati");
const actualizeazaAngajati = () => {
  if (!campAngajati) return;
  campAngajati.hidden = !/Ltd|Limited/.test(formular.elements.tip.value);
  campAngajati.parentElement.classList.toggle("form__row--singur", campAngajati.hidden);
};
if (formular) formular.elements.tip.addEventListener("change", actualizeazaAngajati);
actualizeazaAngajati();

if (formular) formular.addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = new FormData(e.target);
  if (date.get("botcheck")) return; // câmp ascuns: doar roboții îl bifează

  const subiect = `${t.subiect} - ${date.get("nume")}`;
  const corp = [
    `${t.nume}: ${date.get("nume")}`,
    `${t.telefon}: ${date.get("telefon")}`,
    `${t.email}: ${date.get("email")}`,
    `${t.tip}: ${date.get("tip")}`,
    ...(campAngajati && !campAngajati.hidden ? [`${t.angajati}: ${date.get("angajati")}`] : []),
    "",
    `${t.mesaj}: ${date.get("mesaj")}`,
  ].join("\n");

  const deschideEmail = () => {
    window.location.href =
      `mailto:${EMAIL_FIRMA}?subject=${encodeURIComponent(subiect)}&body=${encodeURIComponent(corp)}`;
  };
  if (!WEB3FORMS_KEY) { numara("formular-email"); return deschideEmail(); }

  const status = formular.querySelector(".form__status");
  const buton = formular.querySelector("[type=submit]");
  const arata = (text, tip, html = false) => {
    status[html ? "innerHTML" : "textContent"] = text; status.dataset.tip = tip; status.hidden = false;
  };
  buton.disabled = true;
  arata(t.seTrimite, "info");
  try {
    const raspuns = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: subiect,
        from_name: "Site Servicii De Contabilitate Anglia",
        email: date.get("email"),
        message: corp,
        botcheck: false,
      }),
    });
    const rezultat = await raspuns.json();
    if (!rezultat.success) throw new Error(rezultat.message);
    arata(t.trimis, "ok", true);
    numara("formular-trimis");
    formular.reset();
    actualizeazaAngajati();
  } catch {
    arata(t.eroare, "eroare");
    numara("formular-eroare");
    deschideEmail();
  } finally {
    buton.disabled = false;
  }
});

// Butoanele cu data-tip (de exemplu „Cere ofertă” la ipotecă) aleg situația în formular
document.querySelectorAll("[data-tip]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const tip = formular && formular.elements.tip;
    const optiune = tip && [...tip.options].find((o) => o.text === btn.dataset.tip);
    if (optiune) tip.value = optiune.value;
    actualizeazaAngajati();
  })
);

// Banner de sezon: în decembrie și ianuarie, zilele rămase până la termenul din 31 ianuarie
const sezon = document.querySelector("[data-sezon]");
if (sezon) {
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const luna = azi.getMonth();
  if (luna === 11 || luna === 0) {
    const termen = new Date(luna === 11 ? azi.getFullYear() + 1 : azi.getFullYear(), 0, 31);
    const zile = Math.round((termen - azi) / 86400000);
    sezon.querySelector("[data-sezon-text]").textContent =
      zile === 0 ? sezon.dataset.ultima : sezon.dataset.text.replace("{n}", zile);
    sezon.hidden = false;
  }
}

// Prețuri pe telefon: lista „Ce include” se deschide la cerere
document.querySelectorAll(".price-card ul").forEach((lista) => {
  const buton = document.createElement("button");
  buton.type = "button";
  buton.className = "price-card__more";
  buton.textContent = t.ceInclude;
  buton.setAttribute("aria-expanded", "false");
  buton.addEventListener("click", () => {
    const deschis = lista.classList.toggle("is-open");
    buton.textContent = deschis ? t.ascunde : t.ceInclude;
    buton.setAttribute("aria-expanded", deschis);
  });
  lista.before(buton);
});

// Anul curent în subsol
const an = document.getElementById("an");
if (an) an.textContent = new Date().getFullYear();

// ========== Calculator CIS ==========
// Ratele pentru anul fiscal 2025/26 (Anglia, Țara Galilor și Irlanda de Nord).
// Dacă ratele se schimbă, modifică doar valorile de aici.
const RATE = {
  alocatiePersonala: 12570,   // Personal Allowance
  pragReducereAlocatie: 100000, // peste acest venit, alocația scade cu £1 la fiecare £2
  bandaDeBaza: 37700,         // venitul impozabil taxat cu 20%
  pragAditional: 125140,      // peste acest venit impozabil se aplică 45%
  cotaDeBaza: 0.2,
  cotaSuperioara: 0.4,
  cotaAditionala: 0.45,
  niPragInferior: 12570,      // Class 4 NI: 6% între praguri, 2% peste
  niPragSuperior: 50270,
  niCotaPrincipala: 0.06,
  niCotaSuperioara: 0.02,
  cisCota: 0.2,               // reținerea CIS standard
  mileLimita: 10000,          // 45p/milă până aici, 25p după
  mileCotaMare: 0.45,
  mileCotaMica: 0.25,
  // Firmă Ltd
  salariuDirector: 12570,     // salariul presupus pentru director
  niAngajatorPrag: 5000,      // NI angajator: 15% peste acest prag
  niAngajatorCota: 0.15,
  ctCotaMica: 0.19,           // Corporation Tax: 19% până la £50.000 profit
  ctCotaMare: 0.25,           // 25% peste £250.000, cu reducere marginală între
  ctPragMic: 50000,
  ctPragMare: 250000,
  ctFractieMarginala: 3 / 200,
  alocatieDividende: 500,     // primii £500 din dividende nu se impozitează
};

// Ce diferă de la un an fiscal la altul în calculatorul Ltd.
// Din aprilie 2026 cotele pentru dividende au crescut cu 2 puncte (bază și superioară).
const ANI_FISCALI = {
  "2025/26": { divCote: [0.0875, 0.3375, 0.3935] }, // dividende: bază / superioară / adițională
  "2026/27": { divCote: [0.1075, 0.3575, 0.3935] },
};

// Alocația personală scade cu £1 la fiecare £2 de venit peste prag
function alocatiePentru(venit) {
  return Math.max(RATE.alocatiePersonala - Math.max(venit - RATE.pragReducereAlocatie, 0) / 2, 0);
}

// Impozitul pe partea de venit impozabil dintre „de la” și „până la”, pe benzile 20/40/45%
// (cote = [bază, superioară, adițională]; pentru dividende se folosesc alte cote)
function impozitPeBenzi(dela, panaLa, cote) {
  const felie = (min, max) => Math.max(Math.min(panaLa, max) - Math.max(dela, min), 0);
  return felie(0, RATE.bandaDeBaza) * cote[0] +
    felie(RATE.bandaDeBaza, RATE.pragAditional) * cote[1] +
    felie(RATE.pragAditional, Infinity) * cote[2];
}

// Impozit pe venit + Class 4 NI pentru un profit de self-employed
function taxeSelfEmployed(profit) {
  const impozabil = Math.max(profit - alocatiePentru(profit), 0);
  const impozit = impozitPeBenzi(0, impozabil, [RATE.cotaDeBaza, RATE.cotaSuperioara, RATE.cotaAditionala]);
  const ni =
    Math.max(Math.min(profit, RATE.niPragSuperior) - RATE.niPragInferior, 0) * RATE.niCotaPrincipala +
    Math.max(profit - RATE.niPragSuperior, 0) * RATE.niCotaSuperioara;
  return { impozit, ni };
}

function calculeazaCIS(d) {
  const mile = Math.min(d.mile, RATE.mileLimita) * RATE.mileCotaMare +
    Math.max(d.mile - RATE.mileLimita, 0) * RATE.mileCotaMica;
  const cheltuieli = d.unelte + d.protectie + d.transport + d.telefon + d.altele + mile;
  const profit = Math.max(d.brut - cheltuieli, 0);
  const { impozit, ni } = taxeSelfEmployed(profit);
  const datorat = impozit + ni;
  return { brut: d.brut, cheltuieli, profit, impozit, ni, datorat, retinut: d.retinut, rezultat: d.retinut - datorat };
}

const calc = document.getElementById("cis-calc");
if (calc) {
  const form = calc.querySelector("form");
  const retinutInput = form.elements.retinut;
  const lire = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
  const numar = (nume) => Math.max(parseFloat(form.elements[nume].value) || 0, 0);
  let ultimRezultat = null;
  const rezultatBox = calc.querySelector(".calc__result");

  // Buton „Trimite rezultatul pe WhatsApp”, sub butonul principal
  const waCis = document.createElement("a");
  waCis.className = "btn btn--wa btn--block calc__wa";
  waCis.target = "_blank";
  waCis.rel = "noopener";
  waCis.textContent = t.waButon;
  waCis.hidden = true;
  calc.querySelector(".calc__cta").after(waCis);

  // Pe telefon, rezultatul e sub formular: o bară mică jos îl arată cât timp completezi
  const bara = document.createElement("button");
  bara.type = "button";
  bara.className = "calc-sticky";
  bara.hidden = true;
  bara.innerHTML = '<span class="calc-sticky__label"></span><strong class="calc-sticky__amount"></strong><span class="calc-sticky__more"></span>';
  bara.querySelector(".calc-sticky__more").textContent = t.detalii;
  bara.addEventListener("click", () => rezultatBox.scrollIntoView({ behavior: "smooth", block: "center" }));
  document.body.appendChild(bara);
  const vizibil = { form: false, rezultat: false };
  const actualizeazaBara = () => { bara.hidden = !(ultimRezultat && vizibil.form && !vizibil.rezultat); };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { vizibil.form = e.isIntersecting; actualizeazaBara(); }).observe(form);
    new IntersectionObserver(([e]) => { vizibil.rezultat = e.isIntersecting; actualizeazaBara(); }, { threshold: 0.35 }).observe(rezultatBox);
  }

  // Cât timp utilizatorul nu scrie singur suma reținută, o estimăm ca 20% din brut
  retinutInput.addEventListener("input", () => { retinutInput.dataset.editat = retinutInput.value !== "" ? "da" : ""; });

  const actualizeaza = () => {
    const brut = numar("brut");
    if (retinutInput.dataset.editat !== "da") {
      retinutInput.value = brut ? Math.round(brut * RATE.cisCota) : "";
    }
    const r = calculeazaCIS({
      brut,
      retinut: numar("retinut"),
      unelte: numar("unelte"), protectie: numar("protectie"), mile: numar("mile"),
      transport: numar("transport"), telefon: numar("telefon"), altele: numar("altele"),
    });
    ultimRezultat = brut ? r : null;
    if (brut && !calc.dataset.numarat) { calc.dataset.numarat = "da"; numara("calculator-cis"); }

    const stare = !brut ? "gol" : r.rezultat >= 0 ? "rambursare" : "plata";
    calc.querySelectorAll("[data-show]").forEach((el) => { el.hidden = el.dataset.show !== stare; });
    calc.querySelector(".calc__result").dataset.stare = stare;
    calc.querySelectorAll("[data-out]").forEach((el) => {
      const v = r[el.dataset.out];
      el.textContent = lire.format(el.dataset.out === "rezultat" ? Math.abs(v) : v);
    });

    const eticheta = [...calc.querySelectorAll(".calc__label")].find((el) => !el.hidden).textContent;
    const suma = lire.format(Math.abs(r.rezultat));
    waCis.hidden = !brut;
    waCis.href = linkWhatsApp(t.waCis(eticheta.toLowerCase(), suma, lire.format(brut)));
    bara.dataset.stare = stare;
    bara.querySelector(".calc-sticky__label").textContent = eticheta;
    bara.querySelector(".calc-sticky__amount").textContent = suma;
    actualizeazaBara();
  };
  form.addEventListener("input", actualizeaza);
  actualizeaza();

  // Butonul de sub rezultat completează formularul de contact
  calc.querySelector(".calc__cta").addEventListener("click", () => {
    numara("calculator-cis-cerere");
    const contact = document.getElementById("contact-form");
    const optiune = [...contact.elements.tip.options].find((o) => o.text.includes("CIS"));
    if (optiune) contact.elements.tip.value = optiune.value;
    if (ultimRezultat && !contact.elements.mesaj.value) {
      const suma = lire.format(Math.abs(ultimRezultat.rezultat));
      contact.elements.mesaj.value = document.documentElement.lang === "en"
        ? `CIS calculator estimate: ${ultimRezultat.rezultat >= 0 ? "refund" : "to pay"} ${suma} (gross pay ${lire.format(ultimRezultat.brut)}).`
        : `Estimare din calculatorul CIS: ${ultimRezultat.rezultat >= 0 ? "rambursare" : "de plată"} ${suma} (venit brut ${lire.format(ultimRezultat.brut)}).`;
    }
  });
}

// ========== Calculator Self-employed sau Ltd ==========
function calculeazaLtd(profit, an) {
  // Salariul directorului: £12.570, sau cât permite profitul (inclusiv NI angajator)
  const costSalariu = (sal) => sal + Math.max(sal - RATE.niAngajatorPrag, 0) * RATE.niAngajatorCota;
  let salariu = RATE.salariuDirector;
  if (costSalariu(salariu) > profit) {
    salariu = profit <= RATE.niAngajatorPrag ? profit
      : (profit + RATE.niAngajatorPrag * RATE.niAngajatorCota) / (1 + RATE.niAngajatorCota);
  }
  const niAngajator = Math.max(salariu - RATE.niAngajatorPrag, 0) * RATE.niAngajatorCota;

  const profitFirma = Math.max(profit - salariu - niAngajator, 0);
  let ct;
  if (profitFirma <= RATE.ctPragMic) ct = profitFirma * RATE.ctCotaMica;
  else if (profitFirma >= RATE.ctPragMare) ct = profitFirma * RATE.ctCotaMare;
  else ct = profitFirma * RATE.ctCotaMare - (RATE.ctPragMare - profitFirma) * RATE.ctFractieMarginala;
  const dividende = profitFirma - ct;

  // Impozitul personal: salariul folosește primul alocația și benzile, dividendele vin peste
  const alocatie = alocatiePentru(salariu + dividende);
  const salariuImpozabil = Math.max(salariu - alocatie, 0);
  const divImpozabil = Math.max(dividende - Math.max(alocatie - salariu, 0), 0);
  const impozitSalariu = impozitPeBenzi(0, salariuImpozabil, [RATE.cotaDeBaza, RATE.cotaSuperioara, RATE.cotaAditionala]);
  const niAngajat =
    Math.max(Math.min(salariu, RATE.niPragSuperior) - RATE.niPragInferior, 0) * 0.08 +
    Math.max(salariu - RATE.niPragSuperior, 0) * 0.02;
  const inceputDiv = salariuImpozabil + Math.min(RATE.alocatieDividende, divImpozabil);
  const impozitDiv = impozitPeBenzi(inceputDiv, salariuImpozabil + divImpozabil, ANI_FISCALI[an].divCote);

  const taxe = ct + niAngajator + niAngajat + impozitSalariu + impozitDiv;
  return { salariu, dividende, ct, niAngajator, impozitDiv: impozitDiv + impozitSalariu + niAngajat, taxe, net: profit - taxe };
}

const ltd = document.getElementById("ltd-calc");
if (ltd) {
  const sectiune = ltd.closest("section");
  const input = ltd.querySelector("[name=profit]");
  const lire = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
  let ultim = null;
  const waLtd = document.createElement("a");
  waLtd.className = "btn btn--wa";
  waLtd.target = "_blank";
  waLtd.rel = "noopener";
  waLtd.textContent = t.waButon;
  sectiune.querySelector(".ltd__cta").after(waLtd);

  const actualizeaza = () => {
    const profit = Math.max(parseFloat(input.value) || 0, 0);
    const ales = ltd.querySelector("[name=an]:checked");
    const an = (ales && ales.value) || "2026/27";
    const se = taxeSelfEmployed(profit);
    const l = calculeazaLtd(profit, an);
    const r = {
      seImpozit: se.impozit, seNi: se.ni, seTaxe: se.impozit + se.ni, seNet: profit - se.impozit - se.ni,
      ltdSalariu: l.salariu, ltdDividende: l.dividende, ltdCt: l.ct, ltdNiAngajator: l.niAngajator,
      ltdImpozitDiv: l.impozitDiv, ltdTaxe: l.taxe, ltdNet: l.net,
    };
    r.diferenta = Math.abs(r.ltdNet - r.seNet);
    const castigator = r.ltdNet > r.seNet ? "ltd" : "se";
    ultim = profit ? { profit, an, castigator, diferenta: r.diferenta } : null;
    if (profit && !ltd.dataset.numarat) { ltd.dataset.numarat = "da"; numara("calculator-ltd"); }
    waLtd.href = linkWhatsApp(t.waLtd(an, lire.format(profit)));

    sectiune.querySelectorAll("[data-ltd-out]").forEach((el) => { el.textContent = lire.format(r[el.dataset.ltdOut]); });
    sectiune.querySelectorAll("[data-ltd-show]").forEach((el) => {
      const cheie = el.dataset.ltdShow;
      el.hidden = cheie === "gol" ? !!profit : cheie === "rezultat" ? !profit : cheie !== castigator;
    });
    sectiune.querySelectorAll(".compare__card").forEach((c) => {
      c.classList.toggle("is-best", !!profit && c.dataset.varianta === castigator);
    });
  };
  ltd.querySelector("form").addEventListener("input", actualizeaza);
  ltd.querySelector("form").addEventListener("change", actualizeaza);
  actualizeaza();

  // Butonul de sub comparație completează formularul de contact
  sectiune.querySelector(".ltd__cta").addEventListener("click", () => {
    numara("calculator-ltd-cerere");
    const contact = document.getElementById("contact-form");
    if (!contact || !ultim) return;
    const en = document.documentElement.lang === "en";
    const optiune = [...contact.elements.tip.options].find((o) => /deschid|set up/.test(o.text));
    if (optiune) contact.elements.tip.value = optiune.value;
    if (!contact.elements.mesaj.value) {
      const varianta = ultim.castigator === "ltd" ? (en ? "limited company" : "firmă Ltd") : "self-employed";
      contact.elements.mesaj.value = en
        ? `Self-employed or Ltd calculator (${ultim.an}): profit ${lire.format(ultim.profit)}, ${varianta} better by about ${lire.format(ultim.diferenta)} per year.`
        : `Calculator self-employed sau Ltd (${ultim.an}): profit ${lire.format(ultim.profit)}, ${varianta} mai avantajos cu aproximativ ${lire.format(ultim.diferenta)} pe an.`;
    }
  });
}

// ========== Termene fiscale ==========
const termene = document.querySelector(".termene");
if (termene) {
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const zi = 24 * 60 * 60 * 1000;
  const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  let urmator = null;

  termene.querySelectorAll("li[data-date]").forEach((li) => {
    const [a, l, z] = li.dataset.date.split("-").map(Number);
    const data = new Date(a, l - 1, z);
    if (data < azi) li.classList.add("is-past");
    else if (!urmator) { urmator = { li, data }; li.classList.add("is-next"); }

    // Link „Adaugă în Google Calendar” pentru fiecare termen
    const titlu = li.querySelector("h2, h3").textContent;
    const detalii = li.querySelector("p").textContent + "\n\n" + location.href.split("#")[0];
    const link = document.createElement("a");
    link.className = "termen__add";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = termene.dataset.calendarLabel;
    link.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(titlu)}&dates=${ymd(data)}/${ymd(new Date(data.getTime() + zi))}` +
      `&details=${encodeURIComponent(detalii)}`;
    li.querySelector("div").appendChild(link);
  });

  const box = document.querySelector("[data-termen-urmator]");
  if (box && urmator) {
    const n = Math.round((urmator.data - azi) / zi);
    box.querySelector("[data-termen-titlu]").textContent = urmator.li.querySelector("h2, h3").textContent;
    box.querySelector("[data-termen-zile]").textContent =
      n === 0 ? termene.dataset.azi : n === 1 ? termene.dataset.maine : termene.dataset.zile.replace("{n}", n);
    box.hidden = false;
  }
}

// ========== Lista de documente: printare doar a listei ==========
document.querySelectorAll("[data-print-docs]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.body.classList.add("print-docs");
    numara("documente-print");
    window.print();
  })
);
window.addEventListener("afterprint", () => document.body.classList.remove("print-docs"));
