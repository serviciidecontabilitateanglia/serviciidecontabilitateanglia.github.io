# Servicii De Contabilitate Anglia: website

> ### 👉 Cauți un contabil român în UK? Intră pe site: **[serviciidecontabilitateanglia.github.io](https://serviciidecontabilitateanglia.github.io/)**
>
> Self Assessment, rambursări CIS, firme Ltd, VAT și Making Tax Digital, explicate în română. Prima consultație e gratuită: [WhatsApp](https://wa.me/447909451914) · [+44 7909 451914](tel:+447909451914) · [ghiduri gratuite](https://serviciidecontabilitateanglia.github.io/#ghiduri)
>
> *Această pagină conține doar codul site-ului.*

Site de prezentare pentru o firmă de contabilitate din Marea Britanie, pentru clienți români. Are două limbi, română și engleză, cu un buton **RO / EN** în partea de sus. Funcționează pe calculator, tabletă și telefon.

## Ce conține

- **Prezentare**: mesaj principal, butoane „Cere o ofertă gratuită” și „Programează consultația gratuită” (Calendly)
- **Contact rapid**: pe telefon, bară fixă jos cu Sună · WhatsApp · Programează (bara de sus se ascunde la derulare în jos); pe calculator, buton WhatsApp plutitor
- **Iconițe desenate** (SVG, în culorile site-ului), la fel pe toate dispozitivele
- **Banner de sezon**: în decembrie și ianuarie arată automat câte zile mai sunt până la termenul din 31 ianuarie
- **Servicii**: Self Assessment, CIS și recuperare taxe, administrare firme Ltd, raportare VAT, raportare Making Tax Digital, reprezentare în investigații HMRC
- **Documente pentru ipotecă și refinanțare** (de la £200): banner sub servicii, cu nota că nu oferim consultanță de credit (activitate reglementată FCA)
- **Calculator CIS**: estimează pe loc rambursarea CIS din venitul brut, suma reținută și cheltuieli (unelte, echipament de protecție, mile, transport, telefon, altele). Butonul de sub rezultat completează formularul de contact cu estimarea; „Trimite rezultatul pe WhatsApp” deschide o conversație cu estimarea scrisă. Pe telefon, o bară jos arată rezultatul cât timp completezi.
- **Calculator Self-employed sau Ltd**: compară cât îți rămâne în mână ca self-employed și cu o firmă Ltd (salariu de £12.570 + dividende), pentru anul fiscal 2025/26 sau 2026/27
- **Prețuri**: Self Assessment / CIS de la £150, pachet MTD £300/an (4 raportări × £75, declarația anuală inclusă), administrare Ltd de la £100/lună, raportare VAT £75, documente pentru ipotecă de la £200, investigații HMRC de la £250, prima consultație gratuită
- **Cum lucrăm**: 3 pași
- **Termene fiscale** (pagina `termene.html` / `deadlines.html`): următorul termen evidențiat, link „+ Google Calendar” la fiecare termen și fișier de calendar cu toate termenele
- **Documente necesare** (pagina `documente.html` / `documents.html`): liste pentru CIS/self-employed, Ltd și firmă nouă, cu buton de printare sau salvare PDF
- **Ghiduri** (în română): Self Assessment pas cu pas, numărul UTR, cheltuieli deductibile pe CIS, rambursarea CIS, taxe plătite în plus din salariu, scrisori de la HMRC, amenzi HMRC, ipotecă și refinanțare, self-employed sau Ltd, înființarea unei firme Ltd, Making Tax Digital, taxe pe chirii. Fiecare are timp de citit, link „← Toate ghidurile” și 3 ghiduri similare la final (lista `RELATED` din generator).
- **Despre noi**
- **Întrebări frecvente**: UTR, termenul Self Assessment, CIS, Making Tax Digital, self-employed sau Ltd, scrisori HMRC, clienți din afara Londrei
- **Contact**: formular de ofertă (câmpul „angajați” apare doar pentru firme Ltd), telefon, WhatsApp, e-mail, oraș, program
- Pagina în engleză are și secțiunea **Guides**, cu linkuri spre ghidurile în română

## Fișiere

| Fișier | Ce este |
|---|---|
| `index.html` | Pagina în **română** (textele și structura) |
| `en.html` | Pagina în **engleză** |
| `styles.css` | Culorile și aspectul (comun pentru ambele limbi) |
| `script.js` | Meniul pe telefon, formularul de contact, calculatoarele, termenele și printarea |
| `ghid-*.html` | Cele 12 ghiduri în română |
| `fonts/` | Fontul Inter, găzduit pe site (licență SIL OFL în `fonts/LICENSE.txt`) |
| `404.html` | Pagina afișată când o adresă nu există |
| `confidentialitate.html`, `privacy.html` | Politica de confidențialitate (RO / EN) |
| `termene-fiscale.ics`, `tax-deadlines.ics` | Termenele fiscale ca fișiere de calendar (RO / EN) |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Iconița site-ului |
| `og-image.jpg`, `og-image-en.jpg` | Imaginea care apare când trimiți linkul pe WhatsApp sau Facebook |
| `sitemap.xml` | Lista paginilor, pentru Google Search Console |
| `google0ebb1c82567fd536.html` | Verificarea Google Search Console. **Nu-l șterge**, altfel se pierde verificarea. |

Date structurate pentru Google (JSON-LD): firma (AccountingService) și întrebările frecvente pe paginile principale, iar fiecare ghid are datele de articol (Article). Dacă schimbi telefonul, programul sau adresa, schimbă-le și în blocul `application/ld+json` din `index.html` și `en.html`.

## Formularul de contact (Web3Forms)

Cu cheia Web3Forms, formularul trimite mesajul direct pe e-mail. Fără cheie, deschide aplicația de e-mail a vizitatorului.
1. Intră pe https://web3forms.com, scrie adresa **serviciidecontabilitateanglia@gmail.com** și apasă **Create Access Key**.
2. Cheia vine pe e-mail. Pune-o în `script.js`, la `const WEB3FORMS_KEY`, între ghilimele. **Activă acum**: formularul „Contact - Servicii De Contabilitate Anglia” din contul Web3Forms.
3. Dacă serverul Web3Forms nu răspunde, formularul deschide automat aplicația de e-mail, deci nu se pierde niciun mesaj.

Statistici de vizitare: https://contabilitateanglia.goatcounter.com (fără cookie-uri; codul e la sfârșitul fiecărei pagini HTML). La **Events** vezi acțiunile: `click-whatsapp`, `click-telefon`, `click-email`, `click-programare` (acestea patru au la final pagina de pe care s-a apăsat, de ex. `click-whatsapp/ghid-rambursare-cis` sau `click-telefon/acasa`; scrie `click-` în „Filter paths” ca să le vezi pe toate), `formular-trimis`, `calculator-cis`, `calculator-ltd` (și `-cerere` când se apasă butonul de sub rezultat), `calendar-descarcat`, `calendar-google`, `documente-print`, `click-recenzie`.

Dacă modifici un text, modifică-l în **ambele** fișiere, `index.html` și `en.html`.

## Date de contact

Telefon/WhatsApp: +44 7909 451914 · E-mail: serviciidecontabilitateanglia@gmail.com · Oraș: London · Program: Luni–Sâmbătă, 08:00–18:00 · Programări online: https://calendly.com/serviciidecontabilitateanglia/30min

Dacă le schimbi, schimbă-le în `index.html` **și** în `en.html` (telefonul apare și în formatul `447909451914`, pentru link-urile de apel și WhatsApp). E-mailul apare și în `script.js`, la `EMAIL_FIRMA`.

## Actualizarea anuală (după 6 aprilie)

Calculatorul folosește ratele pentru anul fiscal **2025/26** (Anglia, Țara Galilor și Irlanda de Nord): alocația personală £12.570, impozit 20% / 40% / 45%, Class 4 NI 6% și 2%, mile 45p / 25p.

La fiecare an fiscal nou:
1. **Calculatoarele**: schimbă valorile din blocul `RATE` din `script.js` (iar pentru calculatorul Ltd adaugă noul an în `ANI_FISCALI`, cu cotele pentru dividende, și butonul lui în `index.html` și `en.html`), apoi anul fiscal din textele calculatoarelor în `index.html` și `en.html` (caută `2025/26`).
2. **Termenele**: adaugă noile date în `termene.html` și `deadlines.html`. Pe site, termenele trecute apar estompate automat. Regenerează și fișierele `.ics`.
3. **Ghidurile**: verifică sumele (mile, lucru de acasă, amenzi) și data „Actualizat”.

## De verificat

- „Răspuns în 24h” și programul „Luni–Sâmbătă, 08:00–18:00” (același ca în Calendly): păstrează-le doar dacă sunt adevărate.
- Recenzii: adaugă doar recenzii reale, primite de la clienți (de exemplu de pe Google). În Marea Britanie, recenziile false sunt interzise prin lege.
- Profilul Google Business e verificat. Linkul pentru recenzii (https://g.page/r/CcOHILthVoBxEBM/review) apare în „Despre noi” și în subsolul fiecărei pagini. Dacă Google îți dă alt link, schimbă-l în `index.html`, `en.html` și în generator (funcția `footer`).

Poți edita fișierele direct pe GitHub: deschizi fișierul, apeși pe creionul ✏️, modifici textul și apeși „Commit changes”.

## Cum vezi site-ul

**Site-ul este live:** https://serviciidecontabilitateanglia.github.io/

Se publică automat cu GitHub Pages din ramura `main` (Settings → Pages). Orice modificare aplicată în `main` apare pe site în 1–2 minute. Dacă nu vezi schimbarea, apasă **Ctrl + F5**. Depozitul trebuie să rămână **public**, pentru că GitHub Pages gratuit funcționează doar pentru depozite publice. Numele contului (`serviciidecontabilitateanglia`) și al depozitului (`serviciidecontabilitateanglia.github.io`) **nu trebuie schimbate**: din ele se formează adresa site-ului.

**Pe calculatorul tău:** descarcă proiectul (butonul verde **Code**, apoi **Download ZIP**), dezarhivează-l și deschide `index.html` în browser.

**Domeniu propriu** (de exemplu `serviciicontabilitateanglia.co.uk`): după ce îl cumperi, se leagă din **Settings → Pages → Custom domain**.
