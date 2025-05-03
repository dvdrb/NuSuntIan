// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment } from 'react/jsx-runtime';

const languageValues = {
  'en-us': {
    components: {
      buttons: {
        checkout: 'CHECKOUT',
        sort: 'SORT',
        addCard: 'ADD TO CART',
        accessDatabase: 'ACCESS DATABASE',
        getOnTheList: 'GET ON THE LIST',
        noThk: 'NO, THANKS',
        goBack: 'GO BACK',
        goHome: 'GO HOME',
        goToShop: 'GO TO SHOP',
        skip: 'SKIP INTRO',
        all: 'ALL',
      },
      header: {
        cart: 'CART',
        empty: 'YOUR CART IS EMPTY',
        subtotal: (price: string) => {
          return (
            <h3>
              SUBTOTAL: <b>{price}</b>
            </h3>
          );
        },
        buttons: {
          home: 'HOME',
          shop: 'MERCH',
          about: 'ABOUT',
          cart: 'CART',
          music: 'MUSIC',
          cancel: 'CANCEL',
          tap: 'TAP HERE',
        },
      },
      footer: {
        only: 'ONLY FOR BUSINESS',
        link: {
          emphasys: 'help@',
          normal: 'IANHQ.COM',
        },
        politica: 'POLITICA RETUR',
        store: 'STORE',
        music: 'MUSIC',
        about: 'ABOUT',
        anpc: 'ANPC',
        refund: 'REFUND POLITICS',
        confidential: 'CONFIDENTIAL POLITICS',
        terms: 'TERMS & CONDS',
        anpcsal: 'ANPC SAL',
        contact: 'CONTACT',
      },
    },
    pages: {
      home: {},
      music: {
        stream: 'Stream',
        album: 'ALBUM',
        explore: 'EXPLORE',
        songs: 'SONGS',
        written: 'Written & Performed by Ian',
        swipeDown: 'Swipe down to listen',
      },
      shop: {
        ends: () => {
          return (
            <Fragment>
              Ends on <b>11 JULY</b>
            </Fragment>
          );
        },
        productView: {
          description: '100% COTTON & MANUFACTURED IN RO.',
          footer: {
            title: 'NEW ARRIVAL',
            description: 'YOU MAY ALSO LIKE',
          },
        },
        order: {
          title: 'THANK YOU FOR YOUR ORDER!',
          purchaseDate: 'PURCHASE DATE',
          trackingNumber: 'FAN COURIER AWB',
          status: 'STATUS',
          order: 'ORDER',
          receive: 'YOU’LL RECEIVE',
        },
      },
      politica: {
        retur: {
          title: 'POLITICA RETUR',
          text: () => {
            return (
              <p>
                1. Condiții Generale de Returnare
                <br />
                &nbsp;&nbsp; • Clientul are dreptul de a returna produsele în
                termen de 14 zile de la primirea acestora.
                <br />
                &nbsp;&nbsp; • Produsele returnate trebuie să fie în starea
                inițială, cu etichetele atașate și ambalajul original.
                <br />
                <br />
                2. Procedura de Returnare
                <br />
                &nbsp;&nbsp; • Pentru a returna un produs, Clientul trebuie să
                completeze formularul de returnare disponibil pe site și să îl
                trimită împreună cu produsele la adresa specificată.
                <br />
                &nbsp;&nbsp; • Costurile de returnare sunt suportate de Client,
                cu excepția cazului în care produsele sunt defecte sau au fost
                livrate greșit.
                <br />
                <br />
                3. Rambursări
                <br />
                &nbsp;&nbsp; • Magazinul va rambursa suma plătită de Client în
                termen de 14 zile lucrătoare de la primirea produselor
                returnate.
                <br />
                &nbsp;&nbsp; • Rambursarea se va efectua prin aceeași metodă de
                plată utilizată de Client pentru achiziționarea produselor.
              </p>
            );
          },
        },
        terms: {
          title: 'TERMS & CONDS',
          text: () => {
            return (
              <p>
                Termeni și Condiții
                <br />
                <br />
                1. Informații Generale
                <br />
                <br />
                Acest document stabilește termenii și condițiile de utilizare
                ale magazinului online de haine ianhq.com operat de Ian Records
                SRL, cu sediul social în București Sectorul 4, Aleea Mirea
                Mioara Luiza, Nr. 1A, Camera 1, Bloc N23, Scara 2, Etaj 3, Ap.
                27, înregistrată la Registrul Comerțului cu numărul
                J40/3202/23.02.2021 și având CUI 43783470. Utilizarea acestui
                site implică acceptarea acestor termeni și condiții.
                <br />
                <br />
                2. Definiții
                <br />
                &nbsp;&nbsp;• Client: orice persoană fizică sau juridică care
                plasează o comandă pe site-ul Magazinului.
                <br />
                &nbsp;&nbsp;• Produse: articolele de îmbrăcăminte și accesoriile
                disponibile pentru vânzare pe site-ul Magazinului.
                <br />
                &nbsp;&nbsp;• Comandă: un document electronic care intervine ca
                formă de comunicare între Magazin și Client, prin care Magazinul
                este de acord să livreze Produsele, iar Clientul este de acord
                să efectueze plata acestora.
                <br />
                <br />
                3. Politica de Comandă
                <br />
                &nbsp;&nbsp;• Toate comenzile sunt procesate în termen de 7 zile
                lucrătoare de la data confirmării comenzii.
                <br />
                &nbsp;&nbsp;• Magazinul își rezervă dreptul de a refuza orice
                comandă, în mod justificat, fără a fi necesară o notificare
                prealabilă.
                <br />
                <br />
                4. Prețuri și Plată
                <br />
                &nbsp;&nbsp;• Toate prețurile afișate pe site includ TVA.
                <br />
                &nbsp;&nbsp;• Plata se poate face prin card de credit/debit.
                <br />
                &nbsp;&nbsp;• Magazinul își rezervă dreptul de a modifica
                prețurile în orice moment, fără o notificare prealabilă. Cu
                toate acestea, prețul afișat la momentul plasării comenzii va fi
                prețul respectat pentru acea comandă.
                <br />
                <br />
                5. Livrare
                <br />
                &nbsp;&nbsp;• Livrarea se efectuează la adresa specificată de
                Client în comandă.
                <br />
                &nbsp;&nbsp;• Costurile de livrare sunt suportate de Client și
                sunt specificate în timpul procesului de plasare a comenzii.
                <br />
                &nbsp;&nbsp;• Termenul estimat de livrare este de 14-21 zile
                lucrătoare de la data procesării comenzii.
                <br />
                <br />
                6. Politica de Returnare
                <br />
                &nbsp;&nbsp;• Clientul are dreptul de a returna produsele în
                termen de 14 zile de la primirea acestora, fără a oferi un
                motiv.
                <br />
                &nbsp;&nbsp;• Produsele returnate trebuie să fie în starea
                inițială, cu etichetele atașate și ambalajul original.
                <br />
                &nbsp;&nbsp;• Costurile de returnare sunt suportate de Client,
                cu excepția cazului în care produsele sunt defecte sau au fost
                livrate greșit.
                <br />
                <br />
                7. Garanții și Reclamații
                <br />
                &nbsp;&nbsp;• Produsele beneficiază de garanția legală de
                conformitate.
                <br />
                &nbsp;&nbsp;• Orice reclamație privind neconformitatea
                produselor trebuie comunicată Magazinului în termen de 14 zile
                de la descoperirea defectului.
                <br />
                &nbsp;&nbsp;• Magazinul se angajează să rezolve reclamațiile în
                termen de 14 zile lucrătoare.
                <br />
                <br />
                8. Protecția Datelor
                <br />
                &nbsp;&nbsp;• Magazinul respectă legislația în vigoare privind
                protecția datelor cu caracter personal.
                <br />
                &nbsp;&nbsp;• Informațiile personale colectate de la Client vor
                fi utilizate exclusiv pentru procesarea comenzilor și
                îmbunătățirea experienței de cumpărare.
                <br />
                &nbsp;&nbsp;• Clientul are dreptul de a solicita accesul,
                rectificarea sau ștergerea datelor sale personale.
                <br />
                <br />
                9. Proprietatea Intelectuală
                <br />
                &nbsp;&nbsp;• Toate materialele de pe site-ul Magazinului,
                inclusiv texte, imagini, logo-uri și design-uri, sunt protejate
                de drepturile de autor și sunt proprietatea Magazinului.
                <br />
                &nbsp;&nbsp;• Este interzisă utilizarea fără permisiune a
                oricăror materiale de pe site.
                <br />
                <br />
                10. Forță Majoră
                <br />
                &nbsp;&nbsp;• Magazinul nu este responsabil pentru întârzieri
                sau neexecutarea obligațiilor în caz de forță majoră, conform
                legislației în vigoare.
                <br />
                <br />
                11. Modificări ale Termenilor și Condițiilor
                <br />
                &nbsp;&nbsp;• Magazinul își rezervă dreptul de a modifica
                termenii și condițiile în orice moment, fără o notificare
                prealabilă.
                <br />
                &nbsp;&nbsp;• Modificările vor fi afișate pe site și vor intra
                în vigoare la data publicării lor.
                <br />
                <br />
                12. Legea Aplicabilă
                <br />
                &nbsp;&nbsp;• Termenii și condițiile sunt guvernate de
                legislația din România.
                <br />
                &nbsp;&nbsp;• Orice litigiu apărut în legătură cu utilizarea
                site-ului și a produselor oferite va fi soluționat pe cale
                amiabilă sau, în cazul în care acest lucru nu este posibil, de
                către instanțele competente din România.
              </p>
            );
          },
        },
        privacy: {
          title: 'PRIVACY POLICY',
          text: () => {
            return (
              <p>
                1. Colectarea Datelor Personale
                <br />
                &nbsp;&nbsp; • Magazinul colectează date personale de la Client
                în momentul plasării comenzii, creării unui cont sau abonării la
                newsletter.
                <br />
                &nbsp;&nbsp; • Datele colectate pot include numele, adresa,
                adresa de e-mail, numărul de telefon și informațiile de plată.
                <br />
                <br />
                2. Utilizarea Datelor Personale
                <br />
                &nbsp;&nbsp; • Datele personale colectate sunt utilizate pentru
                procesarea comenzilor, livrarea produselor, comunicarea cu
                Clientul și îmbunătățirea experienței de cumpărare.
                <br />
                &nbsp;&nbsp; • Magazinul nu va dezvălui datele personale ale
                Clientului către terți, cu excepția cazurilor în care acest
                lucru este necesar pentru procesarea comenzilor (de exemplu,
                furnizorii de servicii de curierat) sau este cerut de lege.
                <br />
                <br />
                3. Securitatea Datelor
                <br />
                &nbsp;&nbsp; • Magazinul ia măsuri tehnice și organizatorice
                adecvate pentru a proteja datele personale ale Clientului
                împotriva accesului neautorizat, pierderii sau distrugerii.
                <br />
                <br />
                4. Drepturile Clientului
                <br />
                &nbsp;&nbsp; • Clientul are dreptul de a accesa, rectifica,
                șterge sau restricționa prelucrarea datelor sale personale.
                <br />
                &nbsp;&nbsp; • Clientul poate exercita aceste drepturi prin
                contactarea Magazinului la help@ianhq.com .
                <br />
                <br />
                5. Politica de Cookies
                <br />
                &nbsp;&nbsp; • Magazinul utilizează cookies pentru a îmbunătăți
                funcționalitatea site-ului și a oferi o experiență de navigare
                personalizată.
                <br />
                &nbsp;&nbsp; • Clientul poate seta browser-ul să respingă
                cookies, însă acest lucru poate afecta funcționalitatea
                site-ului.
              </p>
            );
          },
        },
      },
      database: {
        title: (
          <h1>
            <b>DATABASE</b>&nbsp;ACCESS
          </h1>
        ),
        form: {
          inputs: {
            login: 'ADMINISTRATOR',
            password: 'PASSWORD',
          },
          button: 'ACCESS DATABASE',
        },
      },
      presentation: {
        ian: {
          title: 'IAN',
          function: 'RAPPER',
          text: 'Ian este cel mai influent artist de muzica urbana din Romania, avand un catalog remarcabil de hituri. Cu o audienta de peste 350.000 de ascultatori lunari si peste 200 milioane de streamuri, Ian domina locul #1 in top-urile oficiale ale platformelor digitale.',
          footer: () => {
            return (
              <p>
                Printre cateva dintre realizarile sale se numara 3 albume
                lansate care au ocupat prima pozitie in topuri timp de numeroase
                luni consecutive, dar si si colaborari cu artisti internationali
                ca R3hab si Smokepurpp.{' '}
                <b>
                  Pe langa succesul din online, Ian este si un foarte bun
                  performer, fiind headliner al celor mai importante evenimente
                  si festivaluri si impartind scena cu artisti internationali de
                  renume, printre care si Wiz Khalifa, Rick Ross, Ice Spice,
                  Yeat, Trippie Red, Don Toliver si multi altii.
                </b>{' '}
                De asemenea, Ian a reusit sa patrunda in international si pe
                partea de live, fiind primul artist roman de muzica urbana cu un
                show sold-out in UK (Londra - The Electric Ballroom).
              </p>
            );
          },
        },
      },
      error: {
        notFound: {
          noAccess: 'NO ACCESS',
          description: 'We are sorry, we couldn’t find this page for you.',
          title: {
            back: 'PAGE MISSING',
            emphasys: 'Page could not be found',
          },
        },
      },
    },
  },
};

const lang: string =
  String(document.documentElement.lang ?? '').toLowerCase() || 'en-us';

export default languageValues[lang as keyof typeof languageValues] ??
  languageValues['en-us'];
