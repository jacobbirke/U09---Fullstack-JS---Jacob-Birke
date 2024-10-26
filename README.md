<h1>Webshop Dokumentation</h1>
Detta är en JavaScript-webbapplikation utvecklad som en del av Chas Academys kurs.
<br><br>


<h2>Projektöversikt</h2>
Webshoppen skapades för att erbjuda en plattform för försäljning av olika produkter, från kläder till datorer. Målet var att skapa en användarvänlig webbplats där kunder enkelt kan köpa produkter, hantera sina beställningar och betala smidigt via PayPal. Plattformen stödjer både användar- och administratörsroller för en bättre hantering av ordrar och användarinformation.

<!-- Användarstudie
Dokumentation av Webshoppen
Bakgrund och Syfte
Webshoppen skapades för att fylla en brist på lättillgängliga och mångsidiga onlinebutiker. Målet var att ge användare en bekväm shoppingupplevelse med säker betalning och enkel navigering.

Metod
En användarstudie genomfördes med olika åldersgrupper och kön. Svaren samlades in via en enkät för att förstå deras preferenser och köpbeteende relaterat till online-shopping.

Resultat från Användarstudien

Köpfrekvens och Plats: Majoriteten av användarna handlar online flera gånger om året och föredrar att handla från kända webbplatser.
Viktigaste Faktorer: Produktutbud, pris och säkerhet vid betalning var de främsta faktorerna för köpbeslut.
Recensioner och Betyg: Användare värderade recensioner från andra kunder och varumärkets rykte högt.
Gränssnitt: Användare efterfrågade ett enkelt och intuitivt gränssnitt med möjlighet att kategorisera produkter och enkelt hantera sin varukorg.
Insikter och Användarpreferenser
Användarna uppskattar ett klart och lättnavigerat system med bra produktbeskrivningar och bilder. Många efterfrågade funktioner för att spara produkter i en önskelista och få rekommendationer baserade på tidigare köp.

Rekommendationer för Webshoppens Funktionalitet

Produktkategorisering: Implementera en filtreringsfunktion baserad på produktkategori och pris.
Recensioner och Omdömen: Tillåt användarna att lämna och läsa betyg samt recensioner för att skapa ett community kring produkterna.
Säkerhet och Betalning: Fokusera på att ha säkra betalningsmetoder och tydlig leveransinformation för att öka kundernas förtroende. -->

<h2>Funktioner</h2>
- Användare kan registrera sig, logga in och hantera sina annonser.
Användaren kan lägga till och ta bort produkter till och från sin varukorg.
Admin-rollen kan se alla ordrar, produkter och användare samt ta bort användare.
Möjlighet att ladda upp bilder och lägga till produktbeskrivningar.
Teknologier
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Databas: MongoDB
Autentisering: JWT för användarautentisering
Betalning: PayPal för smidig betalning
Design: Figma för lågupplöst design
Deployment: Plattform som stöder Node.js
Installation
Klona repositoriet:
bash
git clone https://github.com/your-username/your-repo.git
Gå till projektkatalogen:
bash
cd your-repo
Installera Tailwind CSS:
bash
npx tailwindcss init -p
Backend-uppsättning
Gå till Backend-mappen:
bash
cd Backend
Installera beroenden:
bash
npm install
Skapa en .env-fil:
bash
touch .env
Lägg till variabler som:
plaintext
PORT=3000
DB_URI=mongodb://din_mongodb_uri
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DBNAME=
JWT_SECRET=
PAYPAL_CLIENT_ID=
Starta backend-servern:
bash
npm start
Frontend-uppsättning
Gå till frontend-mappen:
bash
cd Frontend
Installera beroenden:
bash
npm install
Starta utvecklingsservern:
bash
npm run dev
API-dokumentation
Jag använde mig av Insomnia för API-testning och utveckling.

Användarregistrering
Metod: POST
URL: http://localhost:3000/api/users
Body (JSON):

json
{
	"name" : "user2",
	"email" : "user2@gmail.com",
	"password" : "123456"
}
Användarinloggning
Metod: POST
URL: http://localhost:3000/api/users/login
Body (JSON):

json
{
	"email" : "user@gmail.com",
	"password" : "12345678"
}
Genom att använda Insomnia för att testa registrerings- och inloggningsfunktionerna har jag kunnat säkerställa att dessa viktiga delar av webshoppen fungerar som de ska. Verktygets funktioner för snabb feedback, enkel felsökning och effektiv validering har varit avgörande för att skapa en användarvänlig applikation.
